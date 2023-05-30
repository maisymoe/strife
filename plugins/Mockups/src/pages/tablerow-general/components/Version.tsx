import { clipboard } from "@vendetta/metro/common";
import { findByProps } from "@vendetta/metro";
import { getAssetIDByName } from "@vendetta/ui/assets";
import { showToast } from "@vendetta/ui/toasts";
import { Forms } from "@vendetta/ui/components";

interface VersionProps {
    label: string;
    version: string;
    icon: string;
}

const { TableRow } = findByProps("TableRow");
const { FormText } = Forms;

export default function Version({ label, version, icon }: VersionProps) {
    return ( 
        <TableRow
            label={label}
            icon={<TableRow.Icon source={getAssetIDByName(icon)} />}
            trailing={<FormText>{version}</FormText>}
            onPress={() => {
                clipboard.setString(`${label} - ${version}`);
                showToast("Copied version to clipboard.", getAssetIDByName("toast_copy_link"));
            }}
        />
    )
}