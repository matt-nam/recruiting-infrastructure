
export const unique = (arr) => {
    return arr.filter((item, i, ar) => ar.indexOf(item) === i);
}
