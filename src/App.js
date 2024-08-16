import React, { useState, useEffect, useRef } from 'react';
import './App.css';

function App() {
    // State variables
    const [interval, setInterval] = useState(0); // Interval in seconds
    const [inputValue, setInputValue] = useState(''); // Input value for interval
    const [loopCount, setLoopCount] = useState(0); // Current loop count
    const [remainingSeconds, setRemainingSeconds] = useState(0); // Remaining seconds in the current loop
    const [isRunning, setIsRunning] = useState(false); // Timer running status
    const [startedTime, setStartedTime] = useState(null); // Time when the timer started
    const intervalRef = useRef(null); // Reference to the interval timer

    // Play the bell sound
    const ringBell = () => {
        const audio = new Audio(`${process.env.PUBLIC_URL}/resources/Ping.mp3`);
        audio.play().catch(error => {
            console.error('Error playing audio:', error);
        });
    };

    // Start the timer and initialize the state variables
    const startTimer = () => {
        const seconds = parseInt(inputValue, 10);
        if (!isNaN(seconds) && seconds > 0) {
            setInterval(seconds);
            setRemainingSeconds(seconds);
            setLoopCount(0);
            setIsRunning(true);
            setStartedTime(Date.now());
        }
    };

    // Format time in HH:MM:SS format
    function formatTime(seconds) {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const remainingSeconds = seconds % 60;

        return `${padZero(hours)}:${padZero(minutes)}:${padZero(remainingSeconds)}`;
    }

    // Pad a number with leading zeros
    function padZero(number) {
        return number.toString().padStart(2, '0');
    }

    // Calculate elapsed time since the timer started
    function calculateElapsedTime() {
        if (startedTime) {
            const currentTime = Date.now();
            const elapsedMilliseconds = currentTime - startedTime;
            const elapsedSeconds = Math.floor(elapsedMilliseconds / 1000);
            return elapsedSeconds;
        }
        return 0;
    }

    // Event listener to handle key presses
    useEffect(() => {
        const handleKeyPress = (event) => {
            if (event.key === ' ') {
                if (isRunning) {
                    setLoopCount((prevCount) => prevCount + 1);
                    setRemainingSeconds(interval);
                }
            } else if (event.key === 'Escape') {
                setIsRunning(false);
                setInputValue('');
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, [isRunning, interval, loopCount]);

    // Timer to update the remaining seconds
    useEffect(() => {
        if (isRunning && remainingSeconds > 0) {
            intervalRef.current = setTimeout(() => {
                setRemainingSeconds((prevSeconds) => prevSeconds - 1);
            }, 1000);
        } else if (isRunning && remainingSeconds === 0) {
            ringBell();
        }
        return () => clearTimeout(intervalRef.current);
    }, [isRunning, remainingSeconds]);

    // Render the component
    return (
        <div className="App">
            <header className="App-header">
                <h3>Ring Timer</h3>
                {!isRunning ? (
                    // Render input and start button when the timer is not running
                    <div>
                        <input
                            type="number"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            placeholder="Enter interval in seconds"
                        />
                        <button onClick={startTimer}>Start</button>
                    </div>
                ) : (
                    // Render timer information when the timer is running
                    <div style={{ fontFamily: 'monospace', fontSize: 'smaller' }}>
                        <div style={{ color: 'gray', fontSize: 'small' }}>
                            <p>Interval Setting: {interval} sec</p>
                            <p>Current Loop Count: {loopCount}</p>
                            <p>Elapsed Time: {formatTime(calculateElapsedTime())}</p>
                        </div>
                        {remainingSeconds > 0 ? (
                            // Render remaining time when there are remaining seconds
                            <div>
                                <p>Time Left</p>
                                <p>{formatTime(remainingSeconds)}</p>
                            </div>
                        ) : (
                            // Render bell and empty line when the timer is completed
                            <div>
                                <p><span role="img" aria-label="bell">🔔</span>RING!</p>
                                <p>&nbsp;</p>
                            </div>
                        )}
                        <p style={{ color: 'gray', fontSize: 'small' }}>Press 'Space' to continue or 'Esc' to reset</p>
                    </div>
                )}
            </header>
        </div>
    );
}

export default App;
