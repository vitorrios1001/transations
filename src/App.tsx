import { useEffect, useState } from 'react';
import './App.css';
import { useTransactions } from './contexts/transactions.context';
import {
  TransactionList,
  Modal,
  TransactionForm,
  TransactionFilter,
  TransactionSummary,
} from './components';
import { toast } from 'react-toastify';
import { AlertCircle, Calendar, ListRestart, PlusCircle } from 'lucide-react';
import Pagination from './components/Pagination/pagination';

function App() {
  const [modalFormIsOpen, setModalFormIsOpen] = useState(false);
  const [modalFilterIsOpen, setModalFilterIsOpen] = useState(false);

  const {
    loadTransactions,
    transactions,
    createNewTransaction,
    makeTransactionWithError,
    filterByRangeDate,
    loadTransactionsSummary,
    transactionSummary,
    currentPage,
    onChangeCurrentPage,
    totalPages,
  } = useTransactions();

  useEffect(() => {
    loadTransactionsSummary();
  }, []);

  useEffect(() => {
    loadTransactions();
  }, [currentPage]);

  const onCloseModal = () => setModalFormIsOpen(false);
  const onOpenModal = () => setModalFormIsOpen(true);

  const onCloseFilterModal = () => setModalFilterIsOpen(false);
  const onOpenFilterModal = () => setModalFilterIsOpen(true);

  return (
    <>
      <h1>Transactions</h1>

      <TransactionSummary data={transactionSummary} />

      <div className='button-actions'>
        <button onClick={onOpenModal}>
          <PlusCircle color='green' /> New Transaction
        </button>
        <button onClick={makeTransactionWithError}>
          <AlertCircle color='red' />
          Simulate error Transaction
        </button>

        <button onClick={onOpenFilterModal}>
          <Calendar color='purple' />
          Filter
        </button>
        <button onClick={loadTransactions}>
          <ListRestart color='yellow' />
          Clear filters
        </button>
      </div>

      <TransactionList list={transactions} />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onChangeCurrentPage}
      />

      <Modal
        title='Transaction Form'
        isOpen={modalFormIsOpen}
        onClose={onCloseModal}
      >
        <TransactionForm
          onSubmit={(formData) =>
            createNewTransaction(formData, onCloseModal, () =>
              toast('Error on submit the form')
            )
          }
        />
      </Modal>

      <Modal
        title='Transaction Filter'
        isOpen={modalFilterIsOpen}
        onClose={onCloseFilterModal}
      >
        <TransactionFilter
          onSubmit={(filterData) => {
            filterByRangeDate(filterData);
            onCloseFilterModal();
          }}
        />
      </Modal>
    </>
  );
}

export default App;
