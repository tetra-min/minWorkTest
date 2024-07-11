export const uniqueArr = (arr: Array<string | number>) => {
    return arr.filter((element, index) => {
        return arr.indexOf(element) === index;
    });
};
