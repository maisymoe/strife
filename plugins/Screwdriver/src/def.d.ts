export interface Switch {
    label: string;
    subLabel?: string;
    icon?: string;
    setting: string;
    action?: (v: boolean) => void;
}