import { useState, useEffect, type FC } from 'react';
import {
  Form,
  Input,
  Button,
  Select,
  Upload,
  type FormProps,
  notification,
  Space,
  Card,
} from 'antd';
import { type User, Gender as GenderEnum, Role as RoleEnum } from '@prisma-app/client';
import { userFormSchema, phonePrefix, UPLOAD_URL, type UserForm } from '@/utils/constants';
import { getUserById, updateUser } from '@/utils/api';
import { useNavigate, useParams } from 'react-router-dom';
import { createSchemaFieldRule } from 'antd-zod';
import Loader from '@/components/Loader';

const userRule = createSchemaFieldRule(userFormSchema);

const phonePrefixSelector = (
  <Form.Item noStyle>
    <label>{phonePrefix}</label>
  </Form.Item>
);

const EditUser: FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [api, contextHolder] = notification.useNotification();
  const [userData, setUserData] = useState<User | null>(null);

  const openNotification = (message: string, description: string) => {
    const actions = (
      <Space>
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

  const onFinish: FormProps<UserForm>['onFinish'] = async (values) => {
    if (id) {
      try {
        await updateUser(id, {
          ...values,
          phone: phonePrefix + values.phone,
          avatar: values.avatar.file.response.name,
        });
        navigate('/auth/login');
        // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
      } catch (_) {
        openNotification('Ошибка', 'Не получилось создать пользователя');
      }
    }
  };

  useEffect(() => {
    (async () => {
      await getUserById(id as string)
        .then((res) => setUserData(res.data))
        .catch(() => navigate('/404'));
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return userData ? (
    <>
      <>{contextHolder}</>
      <Card title="Редактирование пользователя">
        <Form onFinish={onFinish}>
          <Form.Item
            name="firstName"
            label="First Name"
            rules={[userRule]}
            initialValue={userData.firstName}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="lastName"
            label="Last Name"
            rules={[userRule]}
            initialValue={userData.lastName}
          >
            <Input />
          </Form.Item>
          <Form.Item name="gender" label="Gender" rules={[userRule]} initialValue={userData.gender}>
            <Select
              options={[
                ...Object.values(GenderEnum).map((gender) => ({
                  value: gender,
                  label: gender,
                })),
              ]}
            />
          </Form.Item>
          <Form.Item name="email" label="Email" rules={[userRule]} initialValue={userData.email}>
            <Input />
          </Form.Item>
          <Form.Item name="phone" label="Phone" rules={[userRule]} initialValue={userData.phone}>
            <Input addonBefore={phonePrefixSelector} />
          </Form.Item>
          <Form.Item name="address" label="Address" initialValue={userData.address}>
            <Input />
          </Form.Item>
          <Form.Item name="role" label="Role" rules={[userRule]} initialValue={userData.role}>
            <Select
              options={[
                ...Object.values(RoleEnum).map((role) => ({
                  value: role,
                  label: role,
                })),
              ]}
            />
          </Form.Item>
          <Form.Item name="avatar" label="Avatar" rules={[userRule]}>
            <Upload action={UPLOAD_URL}>
              <Button>Click to Upload</Button>
            </Upload>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Update User
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </>
  ) : (
    <Loader />
  );
};

export default EditUser;
