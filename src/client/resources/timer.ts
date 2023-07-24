//Timer para auto guardado
export const startAutoActionTimer = (lapse: number, onLapseForAction: () => void) => {
    let intervalId: any;
    const startTimer = () => {
      let seconds = 0;  
      intervalId = setInterval(() => {
        seconds++;
        if (seconds > lapse) {
            onLapseForAction();
            reset();
        }
      }, 1000);
    };
    
    const reset = () => {
        clearInterval(intervalId);
        startTimer();
    }

    const stop = () => {
        clearInterval(intervalId);
    }

    return {
      startTimer,
      stop,
      reset
    };
}