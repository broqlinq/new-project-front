export interface UserData {
    username: string;
    type: UserType;
    token: string;
}

export enum UserType {
    REGULAR,
    ADMIN
}
