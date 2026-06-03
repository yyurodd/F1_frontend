// а. Валидатор длины имени
function MinMaxLen(min: number, max: number) {
    return function (target: any, propertyKey: string) {
        // Создаем уникальное имя для скрытого поля (например, _name)
        const privateKey = `_${propertyKey}`;

        Object.defineProperty(target, propertyKey, {
            get: function () { return this[privateKey]; },
            set: function (newValue: string) {
                if (newValue.length < min || newValue.length > max) {
                    throw new Error(`Ошибка: Длина поля должна быть от ${min} до ${max}!`);
                }
                this[privateKey] = newValue; // Сохраняем внутрь конкретного объекта
            },
            enumerable: true,
            configurable: true
        });
    };
}

// б. Валидатор возраста
function MinAge(minAge: number) {
    return function (target: any, propertyKey: string) {
        const privateKey = `_${propertyKey}`;

        Object.defineProperty(target, propertyKey, {
            get: function () { return this[privateKey]; },
            set: function (newValue: number) {
                if (newValue < minAge) {
                    throw new Error(`Ошибка: Возраст должен быть от ${minAge} лет!`);
                }
                this[privateKey] = newValue;
            },
            enumerable: true,
            configurable: true
        });
    };
}

// в. Валидатор почты
function IsEmail(target: any, propertyKey: string) {
    const privateKey = `_${propertyKey}`;
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

    Object.defineProperty(target, propertyKey, {
        get: function () { return this[privateKey]; },
        set: function (newValue: string) {
            if (!emailRegex.test(newValue)) {
                throw new Error(`Ошибка: Неверный формат e-mail: ${newValue}`);
            }
            this[privateKey] = newValue;
        },
        enumerable: true,
        configurable: true
    });
}


class User {
    public id: number;

    @MinMaxLen(3, 15)
    public name!: string;

    @MinAge(16)
    public age!: number;

    @IsEmail
    public email!: string;

    constructor(id: number, name: string, age: number, email: string) {
        this.id = id;
        this.name = name;
        this.age = age;
        this.email = email;
    }
}

console.log("---Создание валидного пользователя---");
try {
    const user1 = new User(1, "Ivan", 20, "ivan@example.com");
    console.log("Пользователь успешно создан:", user1);
} catch (error: any) {
    console.error(error.message);
}

console.log("\n---Нарушение длины имени---");
try {
    const user2 = new User(2, "Jo", 25, "jo@example.com");
} catch (error: any) {
    console.log(error.message);
}

console.log("\n---Нарушение возрастного ограничения---");
try {
    const user3 = new User(3, "Alex", 14, "alex@example.com");
} catch (error: any) {
    console.log(error.message);
}

console.log("\n---Нарушение формата e-mail---");
try {
    const user4 = new User(4, "Petr", 30, "petr_wrong_email.com");
} catch (error: any) {
    console.log(error.message);
}