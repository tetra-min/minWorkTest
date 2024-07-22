export const uniqueArr = (arr: Array<string | number>) => {
    return arr.filter((element, index) => {
        return arr.indexOf(element) === index;
    });
};

export const rangeArray = (start: number, end: number): Array<number> => {
    return Array.from(Array(end - start + 1)).map((_, k) => start + k);
};

export const convertToHalfWidth = (str: string): string => {
    return str.replace(/[Ａ-Ｚａ-ｚ０-９：]/g, (s) => {
        return String.fromCharCode(s.charCodeAt(0) - 0xFEE0);
    });
}