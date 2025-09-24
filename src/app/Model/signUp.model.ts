export interface SignUp {
    fullName: string;
    email: string;
    password: string;
    confirmPassword?: string;
    OTP?: string;
    phone?: string;
    terms: boolean;
}  