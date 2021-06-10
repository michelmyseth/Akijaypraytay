import { ObjectId } from "bson";
import { Users, Exchange } from "./users";

export type Props = {
  userData: Users;
  exchangeId: number;
  senderId: number;
  isToken: boolean;
};

export type ExchangeProps = {
  exchangeData: Exchange[];
  isReceiverIsLoaner: boolean;
  exchangeIndex: number;
  userId: ObjectId;
  isToken: boolean;
};
