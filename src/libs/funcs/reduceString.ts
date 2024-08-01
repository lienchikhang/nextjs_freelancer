export const reduceString = (value: string, chars: number = 40) => {
    if (value.length <= chars) return value;
    return value.slice(0, chars) + '...';
}