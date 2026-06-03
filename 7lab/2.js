function extractDigits(str) {
    const regex = /\d/g;

    const result = str.match(regex);

    return result || [];
}

console.log(extractDigits("abc123def45"));
console.log(extractDigits("no digits"));