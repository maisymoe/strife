export interface Page {
    label: string;
    description?: string;
    icon?: string;
    render: React.ComponentType;
}

export interface Tab {
    id: string;
    title: string;
    render?: React.ComponentType;
    onPress?: (tab?: string) => void;
}