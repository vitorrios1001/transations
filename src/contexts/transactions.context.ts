import constate from 'constate';
import { useState } from 'react';
import { api } from '../services/api';
import { Transaction } from '../types/transactions';
import { toast } from 'react-toastify';

const DUMMY_TRANSACTION: Transaction = {
  id: '3',
  amount: 19999,
  date: new Date(),
  description: 'Dummy description transaction',
};

const useTransactionsHook = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const generateId = () => Math.random().toLocaleString()

  const createNewTransaction = async () => {
    try {
      const transaction = {
        ...DUMMY_TRANSACTION,
        id: generateId(),
      };

      await api.post('/transactions', transaction);

      setTransactions((prev) => [...prev, transaction]);
      toast('Transactions created with success', {
        type: 'success',
      });
    } catch (error) {
      if (error instanceof Error && error.message) {
        toast(error.message, {
          type: 'error',
        });
      }
    }
  };

  const makeTransactionWithError = async () => {
    try {
      await api.get<Transaction[]>('/transactions');

      throw new Error('You had an error on creating your transaction');
    } catch (error) {
      if (error instanceof Error && error.message) {
        toast(error.message, {
          type: 'error',
        });
      }
    }
  };

  const loadTransactions = async () => {
    try {
      const { data } = await api.get<Transaction[]>('/transactions');

      setTransactions(data);
      toast('Transactions loaded with success', {
        type: 'success',
      });
    } catch (error) {
      if (error instanceof Error && error.message) {
        toast(error.message, {
          type: 'error',
        });
      }
    }
  };

  return {
    transactions,
    loadTransactions,
    createNewTransaction,
    makeTransactionWithError,
  };
};

export const [TransactionsProvider, useTransactions] = constate(
  useTransactionsHook,
  (value) => value
);
