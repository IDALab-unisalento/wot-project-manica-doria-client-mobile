import {User} from './user';
import {Maintenance} from './maintenance';

export interface UserMaintenance {

    id: number;
    date?: Date;
    status?: string;
    user: User;
    maintenance: Maintenance;
}
