import Loader from '@/components/Loader';
import { getAllCarts } from '@/utils/api';
import { GET_UPLOADS_URL } from '@/utils/constants';
import { useUserStore, type UserStore } from '@/zustand';
import { type Cart } from '@prisma-app/client';
import { Button, Card, Flex, Image, List, Typography } from 'antd';
import { useEffect, useState, type FC } from 'react';
import { useNavigate } from 'react-router-dom';

const { Paragraph } = Typography;

const ClientAccount: FC = () => {
  const navigate = useNavigate();
  const userStore = useUserStore((state: UserStore) => state);
  const [cart, setCart] = useState<Cart[] | null>(null);

  const handleExit = () => {
    userStore.setToken(null);
    userStore.setUser(null);
    navigate('/');
    window.location.reload();
  };

  useEffect(() => {
    (async () => {
      await getAllCarts()
        .then((res) => setCart(res.data.filter((cart: Cart) => cart.userID === userStore.user?.id)))
        .catch(() => navigate('/404'));
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userStore.user]);

  return (
    <Flex gap={5} vertical style={{ height: '100%', width: '100%' }}>
      {userStore.user ? (
        <Card className="account" title="Информация">
          <Image preview={false} width={100} src={`${GET_UPLOADS_URL}/${userStore.user.avatar}`} />
          <Paragraph className="account__info">
            Имя: {userStore.user.firstName} {userStore.user.lastName}
          </Paragraph>
          <Paragraph className="account__info">Пол: {userStore.user.gender}</Paragraph>
          <Paragraph className="account__info">E-Mail: {userStore.user.email}</Paragraph>
          <Paragraph className="account__info">Адрес: {userStore.user.address}</Paragraph>
          <Paragraph className="account__info">Роль: {userStore.user.role}</Paragraph>
          <Button onClick={() => handleExit()}>Выйти</Button>
        </Card>
      ) : (
        <Loader />
      )}

      {cart ? (
        <Card className="shopping-cart">
          <Typography.Paragraph className="shopping-cart__title">
            Shopping Cart
          </Typography.Paragraph>
          <List className="shopping-cart__list">
            {cart.map((item) => (
              <Typography.Link
                key={item.id}
                className="shopping-cart__listitem"
                onClick={() => navigate(`/services/${item.serviceID}`)}
              >
                {item.userID} {item.serviceID}
              </Typography.Link>
            ))}
          </List>
        </Card>
      ) : (
        <Loader />
      )}
    </Flex>
  );
};

export default ClientAccount;
