import { User } from "./user.model";

export interface LoginResponse {
    jsonWebToken: string;
    user: User;
    errorMessages: { [s: string]: string };
}