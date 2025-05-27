export const delay = (ms: number) => {
    return new Promise(function (resolve) {
        setTimeout(resolve, ms)
    });
}