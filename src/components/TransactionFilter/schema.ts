import { z } from 'zod';

export const schema = z.object({
  initialDate: z.coerce.date(),
  endDate: z.coerce.date(),
});

export type ITransactionFilter = z.infer<typeof schema>;
