export interface Account {
    id: number,
    userName: string,
}

export interface Message {
    author: Account
    body: string,
}

export interface Room {
    admin: Account,
    members: Account[],
    messages: Message[]
}

export interface JwtToken {
    access_token: string
}