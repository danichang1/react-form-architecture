import Button from '@mui/material/Button';

export function SubmitButton({ isPending, canSubmit }: { isPending: boolean; canSubmit: boolean }) {
  return (
    <Button
      type="submit"
      disabled={!canSubmit || isPending}
      variant="outlined"
      sx={{ width: 'fit-content', mt: 2 }}
    >
      {isPending ? 'Submitting...' : 'Submit'}
    </Button>
  );
}
