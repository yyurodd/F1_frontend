function containsWord(text, word) {
    
    const pattern = "\\b" + word + "\\b"; 
    const regex = new RegExp(pattern, 'i');
    
    return regex.test(text);
}

console.log(containsWord("JavaScript is fun", "JavaScript"));
console.log(containsWord("JavaScript is fun", "Script"));
