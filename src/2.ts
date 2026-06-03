import * as fs from 'fs';

// Enum для типа операции
enum TransactionType {
    INCOME = 'income',
    EXPENSE = 'expense',
    TRANSFER = 'transfer'
}

// Интерфейс транзакции
interface Transaction {
    id: number;
    date: string;
    type: TransactionType;
    amount: number;
    description: string;
    account: string;
}

// Функция для преобразования строки CSV в объект Transaction
function parseRow(row: string): Transaction | null {
    const columns = row.split(',');
    if (columns.length !== 6) {
        return null;
    }
    
    const id = parseInt(columns[0]);
    const date = columns[1];
    const type = columns[2] as TransactionType;
    const amount = parseFloat(columns[3]);
    const description = columns[4];
    const account = columns[5];
    
    // Проверяем, что тип операции допустимый
    if (!Object.values(TransactionType).includes(type)) {
        return null;
    }
    
    return {
        id,
        date,
        type,
        amount,
        description,
        account
    };
}

// Функция для фильтрации транзакций по номеру счёта
function filterByAccount(transactions: Transaction[], accountNumber: string): Transaction[] {
    return transactions.filter(transaction => transaction.account === accountNumber);
}

// Функция для расчёта изменения суммы на счету с учётом переводов между своими счетами
function accountTransfers(transactions: Transaction[], accountNumber: string): number {
    let balanceChange = 0;
    
    for (const transaction of transactions) {
        if (transaction.account !== accountNumber) {
            continue;
        }
        
        switch (transaction.type) {
            case TransactionType.INCOME:
                balanceChange += transaction.amount;
                break;
            case TransactionType.EXPENSE:
                balanceChange -= transaction.amount;
                break;
            case TransactionType.TRANSFER:
                // Переводы между своими счетами не меняют общую сумму
                // Ничего не делаем
                break;
        }
    }
    
    return balanceChange;
}

// Функция для сортировки транзакций по изменению денежных средств
function sortByDifference(transactions: Transaction[]): Transaction[] {
    // Вспомогательный объект для быстрой конвертации типа в математический знак
    const getEffect = (t: Transaction): number => {
        if (t.type === TransactionType.EXPENSE) return -t.amount;
        if (t.type === TransactionType.INCOME) return t.amount;
        return 0; // Для TRANSFER
    };

    // Клонируем массив и сортируем по возрастанию «эффекта»
    return [...transactions].sort((a, b) => getEffect(a) - getEffect(b));
}

// Чтение и обработка CSV файла
function loadTransactionsFromFile(filePath: string): Transaction[] {
    const content = fs.readFileSync(filePath, 'utf-8').replace(/\r/g, '');
    const lines = content.split('\n');
    
    // Пропускаем заголовок
    const dataLines = lines.slice(1);
    
    const transactions: Transaction[] = [];
    for (const line of dataLines) {
        if (line.trim()) {
            const transaction = parseRow(line);
            if (transaction) {
                transactions.push(transaction);
            }
        }
    }
    
    return transactions;
}



const transactions = loadTransactionsFromFile('2.csv');

console.log('Все транзакции:');
transactions.forEach(t => {
    console.log(`${t.id}: ${t.date} ${t.type} ${t.amount} руб. - ${t.description} (счет ${t.account})`);
});

console.log('\nТранзакции по счету 123456:');
const account123456 = filterByAccount(transactions, '123456');
account123456.forEach(t => {
    console.log(`${t.id}: ${t.date} ${t.type} ${t.amount} руб. - ${t.description}`);
});

console.log('\nИзменение баланса счета 123456 (без учёта переводов):');
const balanceChange = accountTransfers(transactions, '123456');
console.log(`Баланс изменился на: ${balanceChange} руб.`);

console.log('\nИзменение баланса счета 654321 (без учёта переводов):');
const balanceChange2 = accountTransfers(transactions, '654321');
console.log(`Баланс изменился на: ${balanceChange2} руб.`);

console.log('\nСортировка всех транзакций по влиянию на баланс:');
const sorted = sortByDifference(transactions);
sorted.forEach(t => {
    let effect = 0;
    switch (t.type) {
        case TransactionType.INCOME: effect = t.amount; break;
        case TransactionType.EXPENSE: effect = -t.amount; break;
        case TransactionType.TRANSFER: effect = 0; break;
    }
    console.log(`${t.id}: ${t.type} ${t.amount} руб. (влияние: ${effect})`);
});