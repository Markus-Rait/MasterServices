import { deleteUser, getUsers } from '@/utils/api';
import { GET_UPLOADS_URL } from '@/utils/constants';
import { useUserStore, type UserStore } from '@/zustand';
import { type User } from '@prisma-app/client';
import { Button, Card, Flex, Image, Table, Typography } from 'antd';
import { useEffect, useState, type FC } from 'react';
import { useNavigate } from 'react-router-dom';

const { Paragraph } = Typography;

const AdminAccount: FC = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);
  const userStore = useUserStore((state: UserStore) => state);

  const fetchUsers = async () => {
    await getUsers()
      .then((res) => setUsers(res.data))
      .catch(() => navigate('/404'));
  };

  const handleExit = () => {
    userStore.setToken(null);
    userStore.setUser(null);
    navigate('/');
    window.location.reload();
  };

  const handleDeleteUser = async (userId: string) => {
    await deleteUser(userId).catch((error) => console.error('Error deleting user:', error));
    await fetchUsers();
  };

  const handleUpdateUser = (userId: string) => {
    navigate(`/users/${userId}/edit`);
  };

  const columns: any = [
    {
      title: 'Имя',
      dataIndex: 'firstName',
      key: 'firstName',
    },
    {
      title: 'Фамилия',
      dataIndex: 'lastName',
      key: 'lastName',
    },
    {
      title: 'Пол',
      dataIndex: 'gender',
      key: 'gender',
    },
    {
      title: 'E-Mail',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Телефон',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Адрес',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Роль',
      dataIndex: 'role',
      key: 'role',
    },
    {
      title: 'Действия',
      dataIndex: 'actions',
      key: 'actions',
      render: (_: never, record: { id: string }) => (
        <Flex gap={5}>
          <Button danger type="primary" onClick={() => handleDeleteUser(record.id)}>
            Удалить
          </Button>
          <Button onClick={() => handleUpdateUser(record.id)}>Редактировать</Button>
        </Flex>
      ),
    },
  ];

  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Flex vertical gap={10} style={{ height: '100%', width: '100%' }}>
      {userStore.user && (
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
      )}
      <Card className="admin-users-container" title="Таблица пользователей">
        {users ? <Table columns={columns} dataSource={users} pagination={false} /> : <></>}
      </Card>
    </Flex>
  );
};

export default AdminAccount;
