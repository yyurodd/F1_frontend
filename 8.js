function parseLog(logText) {
    // Регулярное выражение с именованными группами
    // \[ - экранируем открывающую скобку
    // \] - экранируем закрывающую скобку
    // .*? - ленивый квантификатор для уровня (минимальное совпадение)
    // .+ - жадный квантификатор для сообщения (максимальное совпадение)
    const regex = /\[(?<date>\d{4}-\d{2}-\d{2}) (?<time>\d{2}:\d{2}:\d{2})\] (?<level>ERROR|INFO|WARNING): (?<message>.+)/g;
    
    const result = [];
    let match;
    
    while ((match = regex.exec(logText)) !== null) {
        result.push({
            date: match.groups.date,
            time: match.groups.time,
            level: match.groups.level,
            message: match.groups.message
        });
    }
    
    return result;
}

// Тест
const logText = `[2024-03-15 10:15:30] ERROR: Failed to connect to DB
[2024-03-15 10:17:02] INFO: User logged in
[2024-03-15 10:20:45] WARNING: Disk space low`;

console.log(parseLog(logText));