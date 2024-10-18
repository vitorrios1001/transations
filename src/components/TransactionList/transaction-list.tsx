import { ITransaction } from '../../types/transactions';
import { TransactionItem } from '../TransactionItem';

import s from './transaction-list.module.scss';

type TransactionListProps = {
  list: ITransaction[];
};

export const TransactionList = ({ list }: TransactionListProps) => {
  return (
    <ul id='transactions' className={s.transactionsList}>
      {list.map((transaction) => (
        <TransactionItem transaction={transaction} key={transaction.id} />
      ))}
    </ul>
  );
};
