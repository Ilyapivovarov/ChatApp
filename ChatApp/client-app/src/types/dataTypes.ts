export interface Account {
    id: number | null,
    username: string | null,
}

export interface Message {
    author: Account | null
    body: string | null,
}

export interface Room {
    admin: Account | null,
    members: Account[] | null,
    messages: Message[] | null
}

export interface JwtToken {
    access_token: string | null
}