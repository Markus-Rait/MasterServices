import { loginByEmail } from '@/utils/api';
import { loginFormSchema } from '@/utils/constants';
import { useUserStore, type UserStore } from '@/zustand';
import { Button, Card, Form, Input, notification, Space, Typography, type FormProps } from 'antd';
import { createSchemaFieldRule } from 'antd-zod';
import { Link, useNavigate } from 'react-router-dom';

type LoginForm = typeof loginFormSchema._type;

const userRule = createSchemaFieldRule(loginFormSchema);

const Login = () => {
  const navigate = useNavigate();
  const userStore = useUserStore((state: UserStore) => state);
  const [api, contextHolder] = notification.useNotification();

  const openNotification = () => {
    const actions = (
      <Space>
        <Button type="primary" size="small" onClick={() => api.destroy()}>
          OK
        </Button>
      </Space>
    );

    api.open({
      message: 'Ошибка',
      description: 'Не удалось войти в систему',
      actions,
    });
  };

  const onFinish: FormProps<LoginForm>['onFinish'] = async (values) => {
    try {
      const response = await loginByEmail({
        email: values.email,
        password: values.password,
      });
      if (response.status === 200) {
        userStore.setUser({
          ...response.data,
          password: undefined,
          access_token: undefined,
        });
        userStore.setToken(response.data.access_token);
        navigate('/');
        window.location.reload();
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
    } catch (_) {
      openNotification();
    }
  };

  return (
    <>
      {contextHolder}
      <Card className="login-card" title="Вход">
        <Form onFinish={onFinish}>
          <Form.Item label="E-Mail" name="email" rules={[userRule]}>
            <Input />
          </Form.Item>
          <Form.Item label="Пароль" name="password" rules={[userRule]}>
            <Input />
          </Form.Item>
          <Button type="primary" htmlType="submit">
            Войти
          </Button>
        </Form>
        <Space>
          <Link to={'/auth/register'}>
            <Typography.Text>Зарегистрироваться</Typography.Text>
          </Link>
        </Space>
      </Card>
    </>
  );
};

export default Login;
