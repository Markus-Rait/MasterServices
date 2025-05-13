import Loader from '@/components/Loader';
import { getUserById } from '@/utils/api';
import { GET_UPLOADS_URL } from '@/utils/constants';
import { type User } from '@prisma-app/client';
import { Card, Flex, Image, Typography } from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const { Paragraph } = Typography;

const UserInfo = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [userData, setUserData] = useState<Omit<User, 'password'> | null>(null);

  useEffect(() => {
    (async () => {
      await getUserById(id as string)
        .then((res) => setUserData(res.data))
        .catch(() => navigate('/404'));
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <Flex style={{ width: '50%' }} vertical>
      {userData ? (
        <Card className="account" title="Информация">
          <Image preview={false} width={100} src={`${GET_UPLOADS_URL}/${userData.avatar}`} />
          <Paragraph className="account__info">
            Имя: {userData.firstName} {userData.lastName}
          </Paragraph>
          <Paragraph className="account__info">Пол: {userData.gender}</Paragraph>
          <Paragraph className="account__info">E-Mail: {userData.email}</Paragraph>
          <Paragraph className="account__info">Адрес: {userData.address}</Paragraph>
          <Paragraph className="account__info">Роль: {userData.role}</Paragraph>
        </Card>
      ) : (
        <Loader />
      )}
    </Flex>
  );
};

export default UserInfo;
