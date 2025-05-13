import { Flex, Typography } from 'antd';

const { Title, Paragraph } = Typography;

const PageNotFound = () => {
  return (
    <Flex className="page-404" vertical gap={10}>
      <Title className="page-404__title">404 - Страница не найдена</Title>
      <Paragraph className="page-404__text">
        Такой страницы не существует.
      </Paragraph>
    </Flex>
  );
};

export default PageNotFound;
