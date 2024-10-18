import { memo } from 'react';
import { ITransaction } from '../../types/transactions';
import dayjs from 'dayjs';
import { formatCurrency } from '../../utils/formatters';

import s from './transaction-item.module.scss';

type TransactionItemProps = {
  transaction: ITransaction;
};

const _TransactionItem = ({ transaction }: TransactionItemProps) => {
  return (
    <li className={s.transactionsItem}>
      <div>
        <label>Id</label>
        <span>{transaction.id}</span>
      </div>
      <div>
        <label>Date</label>
        <span>{dayjs(transaction.date).format('DD/MM/YYYY')}</span>
      </div>
      <div>
        <label>Description</label>
        <span>{transaction.description}</span>
      </div>
      <div>
        <label>Amount</label>
        <span>{formatCurrency(transaction.amount)}</span>
      </div>
    </li>
  );
};

export const TransactionItem = memo(_TransactionItem);
