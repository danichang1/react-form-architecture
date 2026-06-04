import { FormControl } from '@mui/material';
import Box from '@mui/material/Box';
import Snackbar from '@mui/material/Snackbar';
import Typography from '@mui/material/Typography';
import { createFormHook } from '@tanstack/react-form';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';

import { formSchema } from '../../types/form';
import type { FormValues } from '../../types/form';
import FormField from './components/FormField';
import { SubmitButton } from './components/SubmitButton';
import { fieldContext, formContext } from './context/formContext';

const { useAppForm } = createFormHook({
  fieldComponents: {
    FormField,
  },
  formComponents: {
    SubmitButton,
  },
  fieldContext,
  formContext,
});

export default function Form() {
  // states for managing toast notification
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // initialize mutation to use on form submit, currently uses placeholder API
  const submitMutation = useMutation({
    mutationFn: async (data: FormValues) => {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to submit');
      }

      return response.json();
    },
  });

  // initialize form with validation schema and submit handler
  const form = useAppForm({
    validators: {
      onChange: formSchema,
      onMount: formSchema,
    },
    onSubmit: async ({ value }: { value: FormValues }) => {
      const parsed = formSchema.parse(value);
      const result = await submitMutation.mutateAsync(parsed);
      console.log(`Created post with id ${result.id}`);

      setToastMessage(JSON.stringify(parsed));
      setToastOpen(true);
    },
  });

  // handler to close the toast notification
  const handleToastClose = () => {
    setToastOpen(false);
  };

  return (
    <>
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 2,
        }}
      >
        <Box
          sx={{
            width: 350,
            padding: 4,
            border: '1px solid #ccc',
            borderRadius: 2,
          }}
        >
          <form
            id="test-form"
            onSubmit={async (e) => {
              e.preventDefault();
              await form.handleSubmit();
            }}
          >
            <FormControl
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Typography variant="h5" sx={{ marginBottom: 2 }}>
                Test Form
              </Typography>

              <form.AppField name="string">
                {(field) => <field.FormField label="String" />}
              </form.AppField>
              <form.AppField name="integer">
                {(field) => <field.FormField label="Integer" />}
              </form.AppField>
              <form.AppField name="positiveFloat">
                {(field) => <field.FormField label="Positive Float" />}
              </form.AppField>

              <form.Subscribe selector={(state) => state.canSubmit}>
                {(canSubmit) => (
                  <SubmitButton isPending={submitMutation.isPending} canSubmit={canSubmit} />
                )}
              </form.Subscribe>
            </FormControl>
          </form>
        </Box>
      </Box>
      <Snackbar
        open={toastOpen}
        autoHideDuration={2000}
        onClose={handleToastClose}
        message={toastMessage}
      />
    </>
  );
}
