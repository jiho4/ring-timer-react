export function formatTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${padZero(hours)}:${padZero(minutes)}:${padZero(secs)}`;
}

function padZero(number) {
    return number.toString().padStart(2, '0');
}
