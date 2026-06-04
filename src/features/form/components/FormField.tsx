import TextField from '@mui/material/TextField';

import { useFieldContext } from '../context/formContext';

export default function FormField({ label }: { label: string }) {
  const field = useFieldContext<string>();
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

  return (
    <TextField
      id={field.name}
      label={label}
      value={field.state.value ?? ''}
      onBlur={field.handleBlur}
      onChange={(e) => field.handleChange(e.target.value)}
      error={isInvalid}
      helperText={isInvalid ? (field.state.meta.errors[0] as { message: string }).message : ' '}
      sx={{ marginTop: 2, width: '300px' }}
    />
  );
}
