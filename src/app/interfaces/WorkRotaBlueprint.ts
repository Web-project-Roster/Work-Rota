import { User } from './User';

export interface WorkRotaBlueprint {
    id?: string;
    name: string;
    users: User[];
    manager: User;
}
