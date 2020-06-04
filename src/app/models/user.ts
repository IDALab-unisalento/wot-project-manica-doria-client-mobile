export interface User {
    id?: number;
    name: string;
    surname: string;
    role?: string;
    email?: string;
    password?: string;
    serial_number?: string;
}

export interface UserLogin {
    email: string;
    password: string;
}
