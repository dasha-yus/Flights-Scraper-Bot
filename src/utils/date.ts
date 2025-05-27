export const parseDate = (date: Date) => {
    const year = date.getFullYear();
    const month = padTo2Digits(date.getMonth() + 1); // Months are zero-based
    const day = padTo2Digits(date.getDate());
    return { year, month, day }
}

export const formatDate = (date: Date): string => {
  const day = String(date.getDate()).padStart(2, '0'); // Get day and pad with zero if needed
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Get month (0-indexed) and pad
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

const padTo2Digits = (num: number) => {
    return num.toString().padStart(2, '0');
}
