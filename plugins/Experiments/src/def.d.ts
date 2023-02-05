export interface Handler {
    name: string;
    actionHandler: (payload: object) => any;
}