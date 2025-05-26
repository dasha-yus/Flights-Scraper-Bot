export const parseDate = (date: Date) => {
    const year = date.getFullYear();
    const month = padTo2Digits(date.getMonth() + 1); // Months are zero-based
    const day = padTo2Digits(date.getDate());
    return { year, month, day }
}

const padTo2Digits = (num: number) => {
    return num.toString().padStart(2, '0');
}