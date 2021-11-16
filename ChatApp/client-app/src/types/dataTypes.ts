export interface Account {
    id: number,
    userName: string,
}

export interface Message {
    id: number
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

export interface DecodeJwtToken {
    id: number
    userName: string,
    exp: number
}

export interface SignUp {
    userName: string,
    password: string,
    confirmPassword: string
}