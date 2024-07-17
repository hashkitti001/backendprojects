export interface UserRequest {
    userId: number
    username: string;
    password: string;
    email: string;
    phoneNumber: string | null;
    firstName: string | null;
    lastName: string | null;
}
