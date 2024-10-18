import { z } from 'zod';

export const schema = z.object({
  description: z
    .string()
    .min(4, { message: 'Description should have more then 4 chars' }),
  amount: z.coerce.number().min(0.01, {
    message: 'You can not create a transaction with less then 0.01 USD',
  }),
  date: z.coerce
    .date()
    .max(new Date(), { message: 'You can not add a date of the future' }),
});

export type ITransactionForm = z.infer<typeof schema>;
