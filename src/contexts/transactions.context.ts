import constate from 'constate';
import { useMemo, useState } from 'react';
import { api } from '../services/api';
import { ITransaction, ITransactionSummary } from '../types/transactions';
import { toast } from 'react-toastify';
import { ITransactionForm } from '../components/TransactionForm/schema';
import { ITransactionFilter } from '../components/TransactionFilter/schema';
import dayjs from 'dayjs';

const TOTAL_PER_PAGE = 5;

const useTransactionsHook = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [transactions, setTransactions] = useState<ITransaction[]>([]);

  const [transactionSummary, setTransactionSummary] =
    useState<ITransactionSummary>({
      amount: 0,
      count: 0,
    });

  const totalPages = useMemo(
    () => Math.ceil(transactionSummary.count / TOTAL_PER_PAGE),
    [transactionSummary.count]
  );

  const generateId = () =>
    (Math.random() * 100).toLocaleString().replace('.', '');

  const createNewTransaction = async (
    data: ITransactionForm,
    onSuccess: () => void,
    onError: () => void
  ) => {
    try {
      const transaction = {
        ...data,
        id: generateId(),
      };

      await api.post('/transactions', transaction);

      setTransactions((prev) => [...prev, transaction]);

      loadTransactionsSummary();

      onSuccess();
      toast('Transactions created with success', {
        type: 'success',
      });
    } catch (error) {
      onError();
      if (error instanceof Error && error.message) {
        toast(error.message, {
          type: 'error',
        });
      }
    }
  };

  const makeTransactionWithError = async () => {
    try {
      await api.get<ITransaction[]>('/transactions');

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
      const { data } = await api.get<ITransaction[]>(
        `/transactions?offset=${currentPage - 1}&limit=${TOTAL_PER_PAGE}`
      );

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

  const filterByRangeDate = async (period: ITransactionFilter) => {
    try {
      const DATE_FORMAT = 'YYYY-MM-DD';

      const initialDate = dayjs(period.initialDate).format(DATE_FORMAT);
      const endDate = dayjs(period.endDate).format(DATE_FORMAT);

      const { data } = await api.get<ITransaction[]>(
        `/transactions?date[gt]=${initialDate}&date[lt]=${endDate}`
      );

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

  const loadTransactionsSummary = async () => {
    try {
      const { data } = await api.get<ITransactionSummary>(
        '/transactions-summary'
      );

      setTransactionSummary(data);
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
    filterByRangeDate,
    loadTransactionsSummary,
    transactionSummary,
    onChangeCurrentPage: setCurrentPage,
    currentPage,
    totalPages,
  };
};

export const [TransactionsProvider, useTransactions] = constate(
  useTransactionsHook,
  (value) => value
);
