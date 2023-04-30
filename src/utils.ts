export function throttle<T extends (...args: any[]) => any>(func: T, limit: number): (...args: Parameters<T>) => void {
  let lastCall: number = 0

  return (...args: Parameters<T>) => {
    const now = Date.now()

    if (now - lastCall >= limit) {
      lastCall = now
      func(...args)
    }
  }
}
