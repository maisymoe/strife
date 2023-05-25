import { findByStoreName, findByProps } from "@vendetta/metro";
import { semanticColors } from "@vendetta/ui";
import { APIResponse, Review } from "../def";
import { admins } from "..";

const { getCurrentUser } = findByStoreName("UserStore");
const { meta } = findByProps("colors", "meta");
const { useThemeContext } = findByProps("useThemeContext");

export const canDeleteReview = (review: Review) => review.sender.discordID === getCurrentUser()?.id || admins.includes(getCurrentUser()?.id);

export async function jsonFetch<T = APIResponse>(input: RequestInfo | URL, options?: RequestInit): Promise<T> {
    const req = await fetch(input, {
        headers: {
            "content-type": "application/json",
            accept: "application/json",
        },
        ...options,
    });

    const json = await req.json();
    if (json.success === false) throw new Error(json.message);
    
    return json;
}

// I think Discord have a hook like this but it confused me to no end, so I made my own!
export const useThemedColor = (key: string) => meta.resolveSemanticColor(useThemeContext()?.theme ?? "dark", semanticColors[key]);