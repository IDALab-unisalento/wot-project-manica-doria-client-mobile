export interface User {
    id?: number;
    name: string;
    surname: string;
    role?: string;
    email?: string;
    password?: string;
    serialNumber?: string;
}

export interface UserLogin {
    email: string;
    password: string;
}
