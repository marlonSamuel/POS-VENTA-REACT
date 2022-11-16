export interface ILoginData {
    username: string;
    password: string;
}

export interface IUser {
    id: number;
    username: string;
    name: string;
    lastname: string;
}

export interface IAuthData {
    token_type: string;
    expires_in: string;
    access_token: string;
    refresh_token: string;
    code: number;
    user: IUser;
}


