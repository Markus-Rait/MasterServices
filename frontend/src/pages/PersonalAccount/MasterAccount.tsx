import { deleteService, getAllOrders, getServices } from '@/utils/api';
import { GET_UPLOADS_URL } from '@/utils/constants';
import { useUserStore, type UserStore } from '@/zustand';
import { type Service } from '@prisma-app/client';
import { Avatar, Button, Card, Col, Flex, Row, Table, Typography } from 'antd';
import { useEffect, useState, type FC } from 'react';
import { useNavigate } from 'react-router-dom';

const { Paragraph } = Typography;

const MasterAccount: FC = () => {
  const navigate = useNavigate();
  const user = useUserStore((state: UserStore) => state.user);
  const [services, setServices] = useState([]);
  const [orders, setOrders] = useState([]);

  const handleEdit = (id: string) => {
    navigate(`/services/${id}/edit`);
  };

  const handleDelete = (id: string) => {
    deleteService(id).then(() =>
      setServices(services.filter((service: Service) => service.id !== id)),
    );
  };

  useEffect(() => {
    getServices()
      .then((response) => setServices(response.data))
      .catch(() => navigate('/404'));
    getAllOrders().then((response) => setOrders(response.data));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Flex style={{ width: '100%', alignSelf: 'flex-start' }} gap={10} vertical>
      <Card title="Информация">
        <Row>
          <Col span={2}>
            <Avatar
              src={GET_UPLOADS_URL + '/' + user?.avatar || ''}
              size={64}
              style={{ padding: '5px', border: '1px solid black' }}
            />
          </Col>
          <Col span={16}>
            <Paragraph>
              Имя: {user?.firstName} {user?.lastName}
            </Paragraph>
            <Paragraph>E-Mail: {user?.email}</Paragraph>
            <Paragraph>Телефон: {user?.phone}</Paragraph>
            <Paragraph>Адрес: {user?.address}</Paragraph>
            <Paragraph>Роль: {user?.role}</Paragraph>
          </Col>
        </Row>
      </Card>
      <Card title="Список услуг">
        <Table dataSource={services} showHeader={false} pagination={false} rowKey="id">
          <Table.Column title="Title" dataIndex="title" key="title" />
          <Table.Column
            title="Actions"
            key="actions"
            render={(_, record) => (
              <Flex gap={5}>
                <Button onClick={() => handleEdit(record.id)}>Редактировать</Button>
                <Button danger onClick={() => handleDelete(record.id)}>
                  Удалить
                </Button>
              </Flex>
            )}
          />
        </Table>
      </Card>
      <Card title="Заказы">
        <Table dataSource={orders} showHeader={false} pagination={false} rowKey="id">
          <Table.Column title="Order ID" dataIndex="id" key="id" />
          <Table.Column
            title="User"
            dataIndex="user.firstName"
            key="user"
            render={(_, record) => `${record.user.firstName} ${record.user.lastName}`}
          />
          <Table.Column title="Service" dataIndex="service.title" key="service" />
        </Table>
      </Card>
    </Flex>
  );
};

export default MasterAccount;
