import { User } from "./user.model";

export interface RegisterResponse {
    user: User;
    errorMessages: { [s: string]: string };
}