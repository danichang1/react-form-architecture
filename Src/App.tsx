import { useForm } from '@tanstack/react-form';
import { Button, FormControl } from '@mui/material';
import Box from '@mui/material/Box';
import * as z from 'zod';
import { useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import Typography from '@mui/material/Typography';
import NumberField from './NumberField';

// logic to validate that user input is a positive number using zod, coercing the input to a number type
const positiveNumber = (label: string) =>
  z.coerce
    .number({
      invalid_type_error: `${label} must be a number`,
    })
    .positive(`${label} must be a positive number`);

// define schema for form inputs with validation
const formSchema = z.object({
  sampleWeight: positiveNumber('Sample weight'),
  bulkWeight: positiveNumber('Bulk weight'),
  prepWeight: positiveNumber('Prep weight'),
});

export default function App() {
  // states for managing toast notification
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // initialize form with validation schema and submit handler
  const form = useForm({
    validators: {
      onChange: formSchema,
      onMount: formSchema,
    },
    onSubmit: async ({ value }) => {
      setToastMessage(JSON.stringify(value));
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
            id="mix-prep-form"
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
                Mixing & Prep Form{' '}
              </Typography>
              <NumberField form={form} name="sampleWeight" label="Sample Weight" />
              <NumberField form={form} name="bulkWeight" label="Bulk Weight" />
              <NumberField form={form} name="prepWeight" label="Prep Weight" />
              <form.Subscribe
                selector={(state) => [state.canSubmit]}
                children={([canSubmit]) => (
                  <Button
                    type="submit"
                    disabled={!canSubmit}
                    variant="outlined"
                    sx={{ width: '100px', marginTop: 2 }}
                  >
                    Submit
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
