import { UserType } from "./user-data";

export interface UserForm {
    username: string;
    password: string;
    type: UserType;
}
