import { useAuthStore } from '../store/authStore';
import RoutesPage from './RoutesPage/RoutesPage';

export default function Layout() {
  const { auth } = useAuthStore();

  return (
    <>
      <RoutesPage />
    </>
  );
}
