import {Machine} from './machine';

export interface Maintenance {

    id?: number;
    name: string;
    description: string;
    type?: string;
    machine: Machine;
}
