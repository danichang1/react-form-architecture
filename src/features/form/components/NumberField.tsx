import TextField from '@mui/material/TextField';

export default function NumberField({
  form,
  name,
  label,
}: {
  form: any;
  name: string;
  label: string;
}) {
  return (
    <form.Field
      name={name}
      children={(field: any) => {
        const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

        return (
          <TextField
            id={name}
            label={label}
            value={field.state.value ?? ''}
            onBlur={field.handleBlur}
            onChange={(e) => field.handleChange(e.target.value)}
            error={isInvalid}
            helperText={
              isInvalid ? (field.state.meta.errors[0] as { message: string }).message : ' '
            }
            sx={{ marginTop: 2, width: '300px' }}
          />
        );
      }}
    />
  );
}
