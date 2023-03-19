import { findByStoreName } from "@vendetta/metro";
import { APIResponse, Review } from "../def";
import { admins } from "..";

const { getCurrentUser } = findByStoreName("UserStore");

export const canDeleteReview = (review: Review) => review.sender.discordID === getCurrentUser()?.id || admins.includes(getCurrentUser()?.id);

export async function jsonFetch<T = APIResponse>(input: RequestInfo | URL, options?: RequestInit): Promise<T> {
    const req = await fetch(input, options);
    if (!req.ok) throw new Error("Request returned non-ok");

    const json = await req.json();
    if (json.success === false) throw new Error(json.message);
    
    return json;
}