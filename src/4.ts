function getRandomElement<T>(array: T[]): T {
    if (array.length === 0) {
        throw new Error("Массив не должен быть пустым!");
    }

    const randomIndex = Math.floor(Math.random() * array.length);

    return array[randomIndex];
}

// числа
const numbers = [10, 20, 30, 40, 50];
const randomNum = getRandomElement(numbers); 
console.log(`Случайное число: ${randomNum}`); 

// строки
const strings = ["яблоко", "банан", "апельсин", "груша"];
const randomStr = getRandomElement(strings);
console.log(`Случайная строка: ${randomStr}`); 

// объекты
const users = [
    { id: 1, name: "Ivan" },
    { id: 2, name: "Petr" },
    { id: 3, name: "Elena" }
];
const randomUser = getRandomElement(users);
console.log(`Случайный пользователь:`, randomUser);