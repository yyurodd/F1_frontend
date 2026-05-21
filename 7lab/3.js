function isSimpleEmail(email) {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    
    return regex.test(email);
}

console.log(isSimpleEmail("cat@edu.narfu.ru"))
console.log(isSimpleEmail("cat@edu.narfu."))