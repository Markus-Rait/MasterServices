import { useUserStore, type UserStore } from '@/zustand';
import { useEffect, type FC } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminAccount from './AdminAccount';
import ClientAccount from './ClientAccount';
import MasterAccount from './MasterAccount';

const PersonalAccount: FC = () => {
  const navigate = useNavigate();
  const userStore = useUserStore((state: UserStore) => state.user);

  useEffect(() => {
    if (!userStore) {
      navigate('/login');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    userStore &&
    (userStore.role === 'CLIENT' ? (
      <ClientAccount />
    ) : userStore.role === 'MASTER' ? (
      <MasterAccount />
    ) : (
      <AdminAccount />
    ))
  );
};

export default PersonalAccount;
