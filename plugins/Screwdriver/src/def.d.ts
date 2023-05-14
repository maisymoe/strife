export interface Switch {
    label: string;
    subLabel?: string;
    icon?: string;
    setting: string;
    disabled?: boolean;
    action?: (v: boolean) => void;
}

export interface Category {
    title: string;
    disclaimer?: string;
    items: Array<Switch>;
}