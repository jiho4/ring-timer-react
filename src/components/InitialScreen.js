import React, { useEffect, useRef } from 'react';

export function InitialScreen({
    inputValue,
    onInputChange,
    onStart,
    errorMessage,
    onValidate
}) {
    const startButtonRef = useRef(null);

    useEffect(() => {
        if (startButtonRef.current) {
            startButtonRef.current.focus();
        }
    }, []);

    return (
        <div>
            <input
                type="number"
                value={inputValue}
                onChange={(e) => {
                    onInputChange(e.target.value);
                }}
                onBlur={onValidate}
                placeholder="Enter interval in seconds"
            />
            <button ref={startButtonRef} onClick={onStart}>Start</button>
            {errorMessage && (
                <div style={{ color: 'red', marginTop: '10px', fontSize: 'small' }}>
                    {errorMessage}
                </div>
            )}
        </div>
    );
}
