import { User } from './User';

export interface NewRotaWeek {
    pk: string;
    weekNo: number;
}

export interface WorkRotaWeek {
    pk?: string;
    days: Day[];
    manager?: User;
    sk: string;
}

export interface Day {
    users?: UserWorkingInfo[];
}

export interface UserWorkingInfo {
    fname: string;
    hours: string;
    lname: string;
    userId: string;
}
