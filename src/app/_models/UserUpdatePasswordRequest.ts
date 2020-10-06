import { UserUpdatePassword } from "./UserUpdatePassword";

export class UserUpdatePasswordRequest implements UserUpdatePassword{
    UserId: number;
    Password: string;
}
