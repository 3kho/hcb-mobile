export type StackParamList = {
  Organizations: undefined;
  Event: { id: string; image?: string; title: string };
  Transaction: { orgId: string; transactionId: string };
};

export type CardsStackParamList = {
  CardList: undefined;
  Card: { cardId: string; last4: string };
};

export type ReceiptsStackParamList = {
  MissingReceiptList: undefined;
};

export type TabParamList = {
  Home: undefined;
  Cards: undefined;
  Receipts: undefined;
  Settings: undefined;
};
