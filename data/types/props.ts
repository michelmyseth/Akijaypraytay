import { Users, Exchange } from "./users";

export type Props = {
  userData: Users;
  exchangeId: number;
  senderId: number;
};

export type ExchangeProps = {
  exchangeData: Exchange[];
  isReceiverIsLoaner: boolean;
};
