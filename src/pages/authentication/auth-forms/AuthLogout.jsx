import { useLogout } from 'hooks/useLogout';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';

export default function AuthLogout() {
  const navigate = useNavigate();
  const { handleLogout } = useLogout();
  useEffect(() => {
    handleLogout().then(() => {
      navigate('/login');
    });
  }, [handleLogout, navigate]);

  return <></>;
}
