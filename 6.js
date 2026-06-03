function advancedSplit(text) {
    const words = text.match(/[a-zA-Zа-яА-Я]+/g);
    return words || [];
}

console.log(advancedSplit("Hello, world! How are you?"));