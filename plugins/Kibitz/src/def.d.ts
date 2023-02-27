export interface Dispatch {
    time: string;
    data: {
        [index: string]: any;
        type: string;
    }
}