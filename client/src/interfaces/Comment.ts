import { UserData } from './UserData';

export interface Comment {
    id: string; 
    commentText: string;
    createdAt: string;
    user: UserData; 
}