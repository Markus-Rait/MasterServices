import { createCart } from '@/utils/api';
import { GET_UPLOADS_URL } from '@/utils/constants';
import { useUserStore, type UserStore } from '@/zustand';
import {
  Button,
  Card,
  Flex,
  Image,
  Space,
  Typography,
  notification,
} from 'antd';
import type { FC, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

type ServiceCardProps = {
  id: string;
  image?: string | null;
  title: string;
};

const { Paragraph } = Typography;

const ServiceCard: FC<ServiceCardProps> = ({
  id,
  image,
  title,
}) => {
  const navigate = useNavigate();
  const userStore = useUserStore((state: UserStore) => state.user);
  const [api, contextHolder] = notification.useNotification();

  const openNotification = (message: string, description: string, btn?: ReactNode) => {
    const actions = (
      <Space>
        {btn}
        <Button type="primary" size="small" onClick={() => api.destroy()}>
          OK
        </Button>
      </Space>
    );
    api.open({
      message,
      description,
      actions,
    });
  };

  const handleAddToCart = async () => {
    if (userStore) {
      await createCart({ userID: userStore.id, serviceID: id }).catch(() =>
        openNotification('Ошибка', 'Не удалось добавить услугу в корзину'),
      );
    } else {
      openNotification(
        'Вы не вошли в систему',
        'Чтобы добавить услугу в корзину, войдите в систему',
        <Button size="small" onClick={() => navigate('/login')}>
          Войти
        </Button>,
      );
    }
  };

  return (
    <>
      {contextHolder}
      <Card className="service-card">
        <Flex className="service-card__container">
          <Image
            className="service-card__image"
            onClick={() => navigate(`/services/${id}`)}
            preview={false}
            src={`${GET_UPLOADS_URL}/${image}`}
          />
          <Paragraph className="service-card__title">{title}</Paragraph>
          <Flex className="service-card__buttons">
            <Button type="link" onClick={() => navigate(`/services/${id}`)}>
              Подробнее
            </Button>
            <Button onClick={() => handleAddToCart()}>В корзину</Button>
          </Flex>
        </Flex>
      </Card>
    </>
  );
};

export default ServiceCard;
