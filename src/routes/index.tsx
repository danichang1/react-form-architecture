import { createFileRoute } from '@tanstack/react-router';
import Form from '../features/form/Form';

export const Route = createFileRoute('/')({
  component: Index,
});

function Index() {
  return <Form />;
}
