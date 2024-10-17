import { useEffect, useRef } from 'react';
import './App.css';
import { useTransactions } from './contexts/transactions.context';
import dayjs from 'dayjs';

function App() {
  const initialTransactionsLoaded = useRef(false);
  const {
    loadTransactions,
    transactions,
    createNewTransaction,
    makeTransactionWithError,
  } = useTransactions();

  useEffect(() => {
    if (!initialTransactionsLoaded.current) {
      loadTransactions();
      initialTransactionsLoaded.current = true;
    }
  }, []);

  return (
    <>
      <h1>Transactions</h1>

      <button onClick={createNewTransaction}>Create new Transaction</button>
      <button onClick={makeTransactionWithError}>Error Transaction</button>

      <ul className='transactions_list'>
        {transactions.map((transaction) => (
          <li className='transactions_item' key={transaction.id}>
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
              <span>{transaction.amount}</span>
            </div>

            {/* <pre>{JSON.stringify(transaction, null, 2)}</pre> */}
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
