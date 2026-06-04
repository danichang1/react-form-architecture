import { useForm } from '@tanstack/react-form';
import { Button, FormControl } from '@mui/material';
import Box from '@mui/material/Box';
import * as z from 'zod';
import { useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import Typography from '@mui/material/Typography';
import FormField from './components/FormField';
import { useMutation } from '@tanstack/react-query';

// define schema for form inputs with validation
const formSchema = z.object({
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

export default function Form() {
  // states for managing toast notification
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // initialize mutation to use on form submit, currently uses placeholder API
  const submitMutation = useMutation({
    mutationFn: async (data: { string: string; integer: number; positiveFloat: number }) => {
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
  const form = useForm({
    validators: {
      onChange: formSchema,
      onMount: formSchema,
    },
    onSubmit: async ({ value }) => {
      const parsed = formSchema.parse(value);
      const result = await submitMutation.mutateAsync(parsed);
      console.log(`Created post with id ${result.id}`);
      setToastMessage(JSON.stringify(formSchema.parse(value)));
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
                {' '}
                Test Form{' '}
              </Typography>
              <FormField form={form} name="string" label="String" />
              <FormField form={form} name="integer" label="Integer" />
              <FormField form={form} name="positiveFloat" label="Positive Float" />
              <form.Subscribe
                selector={(state) => [state.canSubmit]}
                children={([canSubmit]) => (
                  <Button
                    type="submit"
                    disabled={!canSubmit}
                    variant="outlined"
                    sx={{ width: '100px', marginTop: 2 }}
                  >
                    {submitMutation.isPending ? 'Submitting...' : 'Submit'}
                  </Button>
                )}
              />
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
