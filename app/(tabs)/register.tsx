import { AppLayout } from '@/components/AppLayout';
import { RegisterForm } from '@/components/RegisterForm';

export default function RegisterScreen() {
  return (
    <AppLayout
      description="Crea tu cuenta para comenzar a usar AsistOCR."
    >
      <RegisterForm />
    </AppLayout>
  );
}

