import React, { useState } from 'react';
import './App.css';
import { useTimer } from './hooks/useTimer';
import { useKeyboardControls } from './hooks/useKeyboardControls';
import { validateInput } from './utils/validation';
import { getBackgroundColor } from './utils/colors';
import { InitialScreen } from './components/InitialScreen';
import { TimerScreen } from './components/TimerScreen';
import { CONFIG } from './config';

function App() {
    const [inputValue, setInputValue] = useState(CONFIG.DEFAULT_INTERVAL_SECONDS.toString());
    const [errorMessage, setErrorMessage] = useState('');

    const {
        intervalSeconds,
        loopCount,
        remainingSeconds,
        isRunning,
        isPaused,
        startTimer,
        stopTimer,
        togglePause,
        resetInterval,
        calculateElapsedTime
    } = useTimer();

    const handleValidate = () => {
        const validation = validateInput(inputValue);
        setErrorMessage(validation.message);
        return validation.isValid;
    };

    const handleStart = () => {
        if (!handleValidate()) {
            return;
        }
        const seconds = parseInt(inputValue, 10);
        startTimer(seconds);
        setErrorMessage('');
    };

    const handleStop = () => {
        stopTimer();
        setInputValue(intervalSeconds.toString());
        setErrorMessage('');
    };

    const handleInputChange = (value) => {
        setInputValue(value);
        setErrorMessage('');
    };

    useKeyboardControls({
        isRunning,
        isPaused,
        intervalSeconds,
        onStart: handleStart,
        onStop: handleStop,
        onTogglePause: togglePause,
        onReset: resetInterval
    });

    const backgroundColor = getBackgroundColor(isRunning, remainingSeconds);

    return (
        <div className="App">
            <header className="App-header" style={{ backgroundColor }}>
                <h3>Ring Timer</h3>
                {!isRunning ? (
                    <InitialScreen
                        inputValue={inputValue}
                        onInputChange={handleInputChange}
                        onStart={handleStart}
                        errorMessage={errorMessage}
                        onValidate={handleValidate}
                    />
                ) : (
                    <TimerScreen
                        intervalSeconds={intervalSeconds}
                        loopCount={loopCount}
                        remainingSeconds={remainingSeconds}
                        isPaused={isPaused}
                        calculateElapsedTime={calculateElapsedTime}
                        onReset={resetInterval}
                        onTogglePause={togglePause}
                        onStop={handleStop}
                    />
                )}
            </header>
        </div>
    );
}

export default App;
