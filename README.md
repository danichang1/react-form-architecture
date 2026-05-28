# Seed Lab Architecture Demo Project

This is a demonstration of a frontend architecture using TanStack Form, Zod, and MUI to construct a strongly-typed form with validation. A Zod schema is used to validate user inputs, and TanStack Form is used to manage form state and handle changes and submissions. MUI components are used for text fields and buttons, providing a consistent user interface. On form submit, a toast displays the submitted values.

## Note on Default Values

If you would like to declare default values for the form, you must make sure to use .parse() to prevent type mismatch errors between the default values and the expectations of the schema.
For example:
```typescript
const form = useForm({
    defaultValues: formSchema.parse({
        sampleWeight: "2",
        bulkWeight: "2",
        prepWeight: "2",
    }),
    validators: {
        onChange: formSchema,
        onMount: formSchema,
    },
    onSubmit: async ({ value }) => {
        setToastMessage(JSON.stringify(value));
        setToastOpen(true);
    },
})
```
Without .parse(), you may encounter errors on your validator functions.