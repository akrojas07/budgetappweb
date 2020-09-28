import { UserUpdatePassword } from "./UserUpdatePassword";

export class UserUpdatePasswordResponse implements UserUpdatePassword{
    UserId: number;
    Password: string;
    ConfirmPassword: string;
}
