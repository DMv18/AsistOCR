import { AppLayout } from '@/components/AppLayout';
import { LoginForm } from '@/components/LoginForm';

export default function LoginScreen() {
  return (
    <AppLayout description="Inicia sesión para acceder a tus asistencias.">
      <LoginForm />
    </AppLayout>
  );
}
  