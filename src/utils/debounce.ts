export function debounce(callback: (...args: any[]) => void, delay: number) {
  let timerId: number | null;

  return (...args: any[]) => {
    if (!timerId) {
      callback(...args);
    }

    if (timerId) {
      clearTimeout(timerId);
    }

    timerId = setTimeout(() => callback(...args), delay);
  };
}
