import { AprsEntry } from './aprs-entry';

export class AprsData {
    command: string;
    result: string;
    what: string;
    found: number;
    entries: AprsEntry[];
}
