import { safeFetch } from "@vendetta/utils";
import { storage } from "@vendetta/plugin";
import { Review } from "../def";
import { API_URL } from "./constants";

export async function getReviews(id: string): Promise<Review[]> {
    // TODO: What was I doing when I wrote safeFetch? Options should be, well, optional...
    const res = await safeFetch(API_URL + "/getUserReviews?discordid=" + id, {});
    return await res.json();
}

export async function addReview(review: Review) {
    const res = await safeFetch(API_URL + "/addUserReview", {
        method: "POST",
        body: JSON.stringify(review),
        headers: {
            "content-type": "application/json",
            accept: "text/plain",
        },
    });
    return await res.text();
}

export async function deleteReview(id: number) {
    const res = await safeFetch(API_URL + "/deleteReview", {
        method: "POST",
        headers: {
            "content-type": "application/json",
            accept: "application/json",
        },
        body: JSON.stringify({
            reviewid: id,
            token: storage.authToken,
        }),
    });
    return await res.json();
}

export async function reportReview(id: number) {
    const res = await safeFetch(API_URL + "/reportReview", {
        method: "POST",
        headers: {
            "content-type": "application/json",
            accept: "text/plain",
        },
        body: JSON.stringify({
            reviewid: id,
            token: storage.authToken,
        }),
    });
    return await res.text();
}

export async function getLastReviewID(id: string): Promise<number> {
    const res = await safeFetch(API_URL + "/getLastReviewID?discordid=" + id, {});
    return Number(await res.text());
}