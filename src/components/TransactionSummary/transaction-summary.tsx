import { DollarSign, FileDigit } from 'lucide-react';
import { ITransactionSummary } from '../../types/transactions';
import { formatCurrency } from '../../utils/formatters';

import s from './transaction-summary.module.scss';

type TransactionSummaryProps = {
  data: ITransactionSummary;
};

export const TransactionSummary = ({ data }: TransactionSummaryProps) => {
  return (
    <div className={s.container}>
      <div className={s.summaryCard}>
        <div className={s.iconWrapper}>
          <FileDigit />
        </div>

        <div>
          <label>Transactions</label>
          <p>{data.count}</p>
        </div>
      </div>

      <div className={s.summaryCard}>
        <div className={s.iconWrapper}>
          <DollarSign />
        </div>
        <div>
          <label>Amount USD</label>
          <p>{formatCurrency(data.amount)}</p>
        </div>
      </div>
    </div>
  );
};
