import { User } from './User';

export interface WorkRotaSettings {
    rotaId?: string;
    name: string;
    users: User[];
    manager: User;
    workingHours: string;
}
