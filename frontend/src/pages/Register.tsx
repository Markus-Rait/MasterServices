import { createSchemaFieldRule } from 'antd-zod';
import { register } from '@/utils/api';
import {
  Form,
  Button,
  Input,
  type FormProps,
  Select,
  Card,
  notification,
  Space,
  Upload,
} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { Gender as GenderEnum, Role as RoleEnum } from '@prisma-app/client';
import { userFormSchema, phonePrefix, UPLOAD_URL, type UserForm } from '@/utils/constants';
import { userInitialStore } from '@/zustand';
import { type FC } from 'react';
import { useNavigate } from 'react-router-dom';

const userRule = createSchemaFieldRule(userFormSchema);

const phonePrefixSelector = (
  <Form.Item noStyle>
    <label>{phonePrefix}</label>
  </Form.Item>
);

const Register: FC = () => {
  const navigate = useNavigate();
  const [api, contextHolder] = notification.useNotification();

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
    try {
      await register({
        ...values,
        phone: phonePrefix + values.phone,
        avatar: values.avatar.file.response.name,
      });
      navigate('/auth/login');
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (_) {
      openNotification('Ошибка', 'Не получилось создать пользователя');
    }
  };

  return (
    <>
      {contextHolder}
      <Card title="Создание нового пользователя">
        <Form onFinish={onFinish}>
          <Form.Item label="Имя" name="firstName" rules={[userRule]}>
            <Input />
          </Form.Item>
          <Form.Item label="Фамилия" name="lastName" rules={[userRule]}>
            <Input />
          </Form.Item>
          <Form.Item label="Аватар" name="avatar" rules={[userRule]}>
            <Upload action={UPLOAD_URL} listType="picture-circle">
              <button style={{ border: 0, background: 'none' }} type="button">
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </button>
            </Upload>
          </Form.Item>
          <Form.Item
            label="Пол"
            name="gender"
            rules={[userRule]}
            initialValue={userInitialStore.gender}
          >
            <Select
              options={[
                ...Object.values(GenderEnum).map((gender) => ({
                  value: gender,
                  label: gender,
                })),
              ]}
            />
          </Form.Item>
          <Form.Item label="E-Mail" name="email" rules={[userRule]}>
            <Input />
          </Form.Item>
          <Form.Item label="Телефон" name="phone" rules={[userRule]}>
            <Input addonBefore={phonePrefixSelector} />
          </Form.Item>
          <Form.Item label="Адрес" name="address" rules={[userRule]}>
            <Input />
          </Form.Item>
          <Form.Item
            label="Роль"
            name="role"
            rules={[userRule]}
            initialValue={userInitialStore.role}
          >
            <Select
              options={[
                ...Object.values(RoleEnum).map((role) => ({
                  value: role,
                  label: role,
                })),
              ]}
            />
          </Form.Item>
          <Form.Item label="Пароль" name="password" rules={[userRule]}>
            <Input />
          </Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form>
      </Card>
    </>
  );
};

export default Register;
