import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { schema, ITransactionFilter } from './schema';

import s from './transaction-form.module.scss';

type TransactionFilterProps = {
  onSubmit: (data: ITransactionFilter) => void;
};

export const TransactionFilter = ({ onSubmit }: TransactionFilterProps) => {
  const {
    handleSubmit,
    register,
    formState: { errors: formErrors },
  } = useForm<ITransactionFilter>({
    resolver: zodResolver(schema),
  });

  const initialDateError = formErrors.initialDate?.message;
  const endDateError = formErrors.endDate?.message;

  return (
    <form className={s.container} onSubmit={handleSubmit(onSubmit)}>
      <div className={s.formGroup}>
        <label>Initial Date</label>
        <input {...register('initialDate')} type='date' />
        {initialDateError && (
          <span className={s.errorText}>{initialDateError}</span>
        )}
      </div>

      <div className={s.formGroup}>
        <label>End Date</label>
        <input {...register('endDate')} type='date' />
        {endDateError && <span className={s.errorText}>{endDateError}</span>}
      </div>

      <button type='submit'>Submit</button>
    </form>
  );
};
