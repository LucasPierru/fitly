import { Types } from "mongoose";
import { DefaultProperties } from "./common.types";
import { IUser } from "./users.types";

export type ISubscription = DefaultProperties & {
  user: Types.ObjectId | IUser;
  stripeSubscriptionId: string;
  status: "active" | "trialing" | "past_due" | "unpaid" | "canceled";
  currentPeriodStart: Date;
  currentPeriodEnd: Date;
};
