import * as z from 'zod';

export const formSchema = z.object({
  string: z.string(),
  integer: z.coerce
    .number({
      invalid_type_error: 'Integer must be a number',
    })
    .int('Integer must be a whole number'),
  positiveFloat: z.coerce
    .number({
      invalid_type_error: 'Positive float must be a number',
    })
    .positive('Positive float must be positive'),
});

export type FormValues = z.infer<typeof formSchema>;
