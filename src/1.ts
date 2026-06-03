class User {
    id: number;
    name: string;
    role: 'admin' | 'editor' | 'viewer';
    isActive?: boolean;

    constructor(id: number, name: string, role: 'admin' | 'editor' | 'viewer', isActive?: boolean) {
        this.id = id;
        this.name = name;
        this.role = role;
        // если isActive не передали, считаем что пользователь активен
        this.isActive = isActive !== undefined ? isActive : true;
    }

    getUserInfo(): string {
        const status = this.isActive ? 'активен' : 'неактивен';
        return `${this.name} ${this.role} [${status}]`;
    }

    canEdit(): boolean {
        return this.role === 'admin' || this.role === 'editor';
    }
}

function getActiveUsers(users: User[]): User[] {
    return users.filter(user => user.isActive === true);
}

function countByRole(users: User[], role: 'admin' | 'editor' | 'viewer'): number {
    return users.filter(user => user.role === role).length;
}

// создаём пользователей
const user1 = new User(1, 'Анна', 'admin');
const user2 = new User(2, 'Павел', 'editor', false);
const user3 = new User(3, 'Мария', 'viewer');
const user4 = new User(4, 'Иван', 'editor');
const user5 = new User(5, 'Ольга', 'viewer', false);

const users = [user1, user2, user3, user4, user5];

// выводим информацию
console.log('Информация о пользователях:');
users.forEach(user => console.log(user.getUserInfo()));

console.log('\nПрава на редактирование:');
users.forEach(user => console.log(`${user.name}: ${user.canEdit() ? 'да' : 'нет'}`));

console.log('\nАктивные пользователи:');
const activeUsers = getActiveUsers(users);
activeUsers.forEach(user => console.log(`${user.name} (${user.role})`));

console.log('\nКоличество пользователей по ролям:');
console.log(`Admin: ${countByRole(users, 'admin')}`);
console.log(`Editor: ${countByRole(users, 'editor')}`);
console.log(`Viewer: ${countByRole(users, 'viewer')}`);