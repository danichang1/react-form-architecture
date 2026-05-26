import { useForm } from '@tanstack/react-form';
import { Button, FormControl } from '@mui/material';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import * as z from "zod";
import { useState } from 'react';
import Snackbar from '@mui/material/Snackbar';

// define schema for form inputs with validation
const formSchema = z.object({
  sampleWeight: z.string().refine(
    (val) => val !== "" && !isNaN(Number(val)) && Number(val) > 0,
    "Sample weight must be a positive number"
  ),
  bulkWeight: z.string().refine(
    (val) => val !== "" && !isNaN(Number(val)) && Number(val) > 0,
    "Bulk weight must be a positive number"
  ),
  prepWeight: z.string().refine(
    (val) => val !== "" && !isNaN(Number(val)) && Number(val) > 0,
    "Prep weight must be a positive number"
  ),
})

export default function App() {
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const form = useForm({
    validators: {
      onChange: formSchema
    },
    onSubmit: async ({ value }) => {
      setToastMessage(JSON.stringify(value));
      setToastOpen(true);
    },
  })

  const handleToastClose = () => {
    setToastOpen(false);
  };

  return (
    <Box>
      <form
        id="mix-prep-form"
        onSubmit={(e) => {
          e.preventDefault()
          form.handleSubmit()
        }}
      >
        <FormControl>
          <form.Field
            name="sampleWeight"
            children={(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid
              return (
                <TextField
                  id={field.name}
                  name={field.name}
                  value={field.state.value ?? ''}
                  label="Sample Weight"
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  error={isInvalid}
                  helperText={isInvalid
                    ? (field.state.meta.errors[0] as { message: string }).message
                    : '' }
                />
              )
            }}
          />
          <form.Field
            name="bulkWeight"
            children={(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid
              return (
                <TextField
                  id={field.name}
                  name={field.name}
                  value={field.state.value ?? ''}
                  label="Bulk Weight"
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  error={isInvalid}
                  helperText={isInvalid
                    ? (field.state.meta.errors[0] as { message: string }).message
                    : ''}
                />
              )
            }}
          />
          <form.Field
            name="prepWeight"
            children={(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid
              return (
                <TextField
                  id={field.name}
                  name={field.name}
                  value={field.state.value ?? ''}
                  label="Prep Weight"
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  error={isInvalid}
                  helperText={isInvalid
                    ? (field.state.meta.errors[0] as { message: string }).message
                    : ''}
                />
              )
            }}
          />
        </FormControl>
      </form>
      <Button type="submit" form="mix-prep-form">Submit</Button>
      <Snackbar
        open={toastOpen}
        autoHideDuration={2000}
        onClose={handleToastClose}
        message={toastMessage}
      />
    </Box>
  )
}