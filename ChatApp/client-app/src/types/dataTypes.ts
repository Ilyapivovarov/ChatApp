export interface Account {
    id: number,
    username: string,
}

export interface Message {
    author: Account
    body: string,
}

export interface Room {
    admin: Account
    members: Account[],
    messages: Message[]
}
