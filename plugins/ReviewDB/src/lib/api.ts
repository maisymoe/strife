import { safeFetch } from "@vendetta/utils";
import { Review } from "../def";
import { API_URL } from "./constants";

export async function getReviews(id: string): Promise<Review[]> {
    // TODO: What was I doing when I wrote safeFetch? Options should be, well, optional...
    const res = (await safeFetch(API_URL + "/getUserReviews?snowflakeFormat=string&discordid=" + id, {}));
    return await res.json();
}

// TODO: Finish the remaining API endpoints, then hook up to UI.