export function getDaysInMonth(currYear, currMonth) {
    return new Date(currYear, currMonth +1, 0).getDate();
}