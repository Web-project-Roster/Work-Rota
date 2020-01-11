import { User, Manager } from './User';

export interface WorkRotaSettings {
    pk?: string;
    sk?: string;
    name: string;
    users: User[];
    manager?: Manager;
    workingHours: string;
}
