import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { schema, ITransactionForm } from './schema';

import s from './transaction-form.module.scss';

type TransactionFormProps = {
  onSubmit: (data: ITransactionForm) => void;
};

export const TransactionForm = ({ onSubmit }: TransactionFormProps) => {
  const {
    handleSubmit,
    register,
    formState: { errors: formErrors },
  } = useForm<ITransactionForm>({
    resolver: zodResolver(schema),
  });

  const descriptionError = formErrors.description?.message;
  const amountError = formErrors.amount?.message;
  const dateError = formErrors.date?.message;

  return (
    <form className={s.container} onSubmit={handleSubmit(onSubmit)}>
      <div className={s.formGroup}>
        <label>Description</label>
        <input {...register('description')} />
        {descriptionError && (
          <span className={s.errorText}>{descriptionError}</span>
        )}
      </div>

      <div className={s.formGroup}>
        <label>Date</label>
        <input {...register('date')} type='date' />
        {dateError && <span className={s.errorText}>{dateError}</span>}
      </div>

      <div className={s.formGroup}>
        <label>Amount:</label>
        <input {...register('amount')} type='number' />
        {amountError && <span className={s.errorText}>{amountError}</span>}
      </div>

      <button type='submit'>Submit</button>
    </form>
  );
};
