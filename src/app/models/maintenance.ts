import {Machine} from './machine';
import {User} from './user';
import {Step} from './step';

export interface Maintenance {

    id?: number;
    date?: Date;
    status?: string;
    type?: string;
    machine: Machine;
    stepList: Array<Step>;
    // per il save
    user: User;

}
