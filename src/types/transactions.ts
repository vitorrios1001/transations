export type ITransaction = {
  id: string;
  date: Date;
  description: string;
  amount: number;
};

export type ITransactionSummary = {
  count: number;
  amount: number;
};
