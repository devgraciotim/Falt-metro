import { Course } from "../../entities/Course";

interface SocialLinks {
    facebook?: string;
    twitter?: string;
    linkedin?: string;
    instagram?: string;
}

export interface IUser {
    user_id?: number;
    name: string;
    password: string;
    email: string;
    institution?: string;
    photo?: Buffer;
    account_created?: Date;
    email_verified?: boolean;
    bio?: string;
    country?: string;
    state?: string;
    city?: string;
    date_of_birth?: Date;
    social_links?: SocialLinks;
    courses?: Course[];
}
