import Loader from '@/components/Loader';
import { createCart, getServiceById } from '@/utils/api';
import { GET_UPLOADS_URL, type ServiceForm } from '@/utils/constants';
import { useUserStore, type UserStore } from '@/zustand';
import { Button, Card, Image, notification, Space, Typography } from 'antd';
import { useEffect, useState, type FC, type ReactNode } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const { Paragraph } = Typography;

const ServiceInfo: FC = () => {
  const navigate = useNavigate();
  const userStore = useUserStore((state: UserStore) => state.user);
  const { id } = useParams();
  const [serviceData, setServiceData] = useState<ServiceForm | null>(null);
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
      await createCart({ userID: userStore.id, serviceID: id as string }).catch(() =>
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

  useEffect(() => {
    (async () => {
      await getServiceById(id as string)
        .then((res) => setServiceData(res.data))
        .catch(() => navigate('/404'));
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <>
      {contextHolder}
      <Card className="service-detailed">
        {serviceData ? (
          <>
            <Paragraph className="service-detailed__title">{serviceData.title}</Paragraph>
            <Image
              className="service-detailed__image"
              preview={false}
              src={`${GET_UPLOADS_URL}/${serviceData.image}`}
              alt={serviceData.image}
            />
            <Paragraph className="service-detailed__description">
              {!serviceData.description ? '[Описание отсутствует]' : serviceData.description}
            </Paragraph>
            <Button
              className="service-detailed__button"
              size="large"
              onClick={() => handleAddToCart()}
            >
              В корзину
            </Button>
          </>
        ) : (
          <Loader />
        )}
      </Card>
    </>
  );
};

export default ServiceInfo;
