# TODO
1. DONE: Organize folder structure for large app.
    - DONE: For folders owned by this project use Pascal case.
    - DONE: Create top level feat folder add a dummy feature with a component subfolder.
    - DONE: Create top level components folder.
    - DONE: example folder structure
        - /feat
            - home
                - components
    - DONE: Create top level types folder
2. Create launch files.
3. DONE Clean up dependency tree.
    - Remove Tailwind.
    - Remove lucide-react.
    - etc.
4. Create UI test project.
    - Playwright
5. Configure final linting.
    - Pick linting package. Vite vs. Vite+.
6. Add sample tanstack query.
7. Remove use of implicit any and any use any that can be replaced with a specific type.
8. Research specifying a type specific form using tanstack form.
9. Replace refs to seedlab language with something generic.



# Seed Lab Architecture Demo Project

This is a demonstration of a frontend architecture using TanStack Form, Zod, and MUI to construct a strongly-typed form with validation. A Zod schema is used to validate user inputs, and TanStack Form is used to manage form state and handle changes and submissions. MUI components are used for text fields and buttons, providing a consistent user interface. On form submit, a toast displays the submitted values.

<img height="400" alt="image" src="https://github.com/user-attachments/assets/f14e0a5b-b833-4490-9d9c-10b8943c29d1" /> <img height="400" alt="image" src="https://github.com/user-attachments/assets/ae9e1ca0-d36f-45fb-8aee-3730302abe8b" />
<img width="1600" alt="image" src="https://github.com/user-attachments/assets/ed93135e-0593-46ef-9607-5f29bf8c7991" />



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
