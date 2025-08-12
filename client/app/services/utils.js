export function throttle(func, delay) {
    let timer

    return function (...arg) {
        if (!timer) {
            func(...arg)
            timer = setTimeout(() => {
                timer = null
            }, 100)
        }
    }
}