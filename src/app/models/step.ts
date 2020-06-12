import { Attachment } from './attachment';
import { Zone } from './zone';

export interface Step {

    id?: number;
    name: string;
    description: string;
    description_visible?: boolean;
    duration: number;
    estimateDuration: number;
    attachmentList: Attachment[];
    zone: Zone;
}
