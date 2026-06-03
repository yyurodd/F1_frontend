function slugify(title) {
    return title.toLowerCase()
        // заменяем всё, кроме букв, цифр, подчеркивания и дефиса.
        .replace(/[^\w-]/g, '-')
        // убираем дефисы, если они оказались в начале или в конце строки
        .replace(/^-+|-+$/g, '')
        // заменяем несколько дефисов подряд в один
        .replace(/-+/g, '-');
}

console.log(slugify("Hello World!!! 2024!!!"));
console.log(slugify("Привет, мир!"));