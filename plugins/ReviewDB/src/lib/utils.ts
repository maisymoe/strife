import { findByStoreName } from "@vendetta/metro";
import { Review } from "../def";
import { admins } from "..";

const { getCurrentUser } = findByStoreName("UserStore");

export const canDeleteReview = (review: Review) => review.senderdiscordid === getCurrentUser()?.id || admins.includes(getCurrentUser()?.id);