import { storage } from "@vendetta/plugin";
import { safeFetch } from "@vendetta/utils";
import { Review } from "../def";
import { BASE_URL, API_URL } from "./constants";
import { jsonFetch } from "./utils";

export const getReviews = async (userId: string): Promise<Review[]> => (await jsonFetch(API_URL + `/users/${userId}/reviews`)).reviews;

export const getAdmins = async () => await jsonFetch<string[]>(BASE_URL + "/admins");

export const addReview = async (userId: string, comment: string) => await jsonFetch(API_URL + `/users/${userId}/reviews`, {
    method: "PUT",
    body: JSON.stringify({
        comment: comment,
        token: storage.authToken,
    }),
    headers: {
        "content-type": "application/json",
        accept: "application/json",
    },
});

export const deleteReview = async (userId: string, id: number) => await jsonFetch(API_URL + `/users/${userId}/reviews`, {
    method: "DELETE",
    headers: {
        "content-type": "application/json",
        accept: "application/json",
    },
    body: JSON.stringify({
        reviewid: id,
        token: storage.authToken,
    }),
});

export const reportReview = async (id: number) => await jsonFetch(API_URL + "/reports", {
    method: "PUT",
    headers: {
        "content-type": "application/json",
        accept: "application/json",
    },
    body: JSON.stringify({
        reviewid: id,
        token: storage.authToken,
    }),
});

export async function getLastReviewID(id: string): Promise<number> {
    const res = await safeFetch(API_URL + "/getLastReviewID?discordid=" + id, {});
    return Number(await res.text());
}