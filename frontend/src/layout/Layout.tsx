import { type FC, type ReactNode } from 'react';
import { Layout as AntLayout, Flex, Image, Typography } from 'antd';
import { Link } from 'react-router-dom';
import Logo from '@/images/logo.png';
import Rutube from '@/images/rutube.png';
import TG from '@/images/tg.webp';
import VK from '@/images/vk.webp';
import { useUserStore, type UserStore } from '@/zustand';
import { GET_UPLOADS_URL } from '@/utils/constants';

const { Header, Footer, Content } = AntLayout;

type LayoutProps = {
  children: ReactNode;
};

const Layout: FC<LayoutProps> = ({ children }) => {
  const userStore = useUserStore((state: UserStore) => state);

  return (
    <AntLayout className="layout">
      <Header className="header">
        <Flex justify="space-between" align="center">
          <Link to="/">
            <Flex align="center" gap={10}>
              <Image className="header__logo" preview={false} src={Logo} />
              <Typography.Text className="header__title">
                Услуги мастера
              </Typography.Text>
            </Flex>
          </Link>
          <Flex gap={10}>
            {!userStore.user ? (
              <Link to="/login">Войти</Link>
            ) : (
              <>
                {userStore.user.avatar && (
                  <Image
                    className="header__avatar"
                    src={`${GET_UPLOADS_URL}/${userStore.user.avatar}`}
                  />
                )}
                <Link to="/account" className="header__account">
                  Личный кабинет
                </Link>
              </>
            )}
          </Flex>
        </Flex>
      </Header>
      <Content className="content content-center">{children}</Content>
      <Footer className="footer">
        <Flex>
          <Flex>
            <Flex>
              <Link to="/">Контакты мастеров</Link>
              <Link to="/">Соглашение</Link>
            </Flex>
            <Flex>
              <Typography.Paragraph>Подписаться на нас</Typography.Paragraph>
              <Typography.Link href="mailto:pro@fipro@ru">
                pro@fipro@ru
              </Typography.Link>
              <Typography.Link href="tel:+74990090551">
                +7 (499) 009-05-51
              </Typography.Link>
              <Flex>
                <Typography.Link href="https://rutube.ru/">
                  <Image preview={false} src={Rutube} />
                </Typography.Link>
                <Typography.Link href="https://web.telegram.org/">
                  <Image preview={false} src={TG} />
                </Typography.Link>
                <Typography.Link href="https://vk.com/">
                  <Image preview={false} src={VK} />
                </Typography.Link>
              </Flex>
            </Flex>
          </Flex>
          <Typography.Text>"Услуги мастера", Copyright, 2025</Typography.Text>
        </Flex>
      </Footer>
    </AntLayout>
  );
};

export default Layout;
