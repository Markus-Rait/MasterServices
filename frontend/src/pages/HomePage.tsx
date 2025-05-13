import { useEffect, useState, type FC } from 'react';
import { getServices } from '../utils/api';
import type { Service } from '@prisma-app/client';
import { useNavigate } from 'react-router-dom';
import { Button, Flex, Select, Typography, type SelectProps } from 'antd';
import { useUserStore, type UserStore } from '@/zustand';
import ServiceCard from '@/components/ServiceCard';
import { abbreviations, Categories } from '@/utils/constants';
import Loader from '@/components/Loader';

const { Paragraph } = Typography;

const HomePage: FC = () => {
  const navigate = useNavigate();
  const userStore = useUserStore((state: UserStore) => state.user);
  const [services, setServices] = useState<Service[] | null>(null);

  const options: SelectProps['options'] = Categories.map((category) => {
    const value = category;
    const words = category.split('_');
    words.forEach((word, i) => {
      if (!abbreviations.includes(word)) {
        if (i == 0) {
          words[i] = word.charAt(0) + word.toLocaleLowerCase().slice(1).replace('0', '/');
        } else {
          words[i] = word.toLocaleLowerCase().replace('0', '/');
        }
      }
    });
    return { value, label: words.join(' ') };
  });

  // TODO:
  //   const handleChangeTags = async (e: string[]) => {
  //     setServices(null);
  //     await getServices()
  //       .then((res) => {
  //         setServices(
  //           res.data.filter(({ categories }: Service) => {
  //             if (!categories) return true;
  //             else
  //               return categories.some((category) => {
  //                 console.log(e.includes(category));
  //                 return e.includes(category);
  //               });
  //           }),
  //         );
  //       })
  //       .catch((error) => {
  //         console.error('Error fetching services: ', error);
  //       });
  //   };

  useEffect(() => {
    (async () => {
      await getServices()
        .then((res) => setServices(res.data.slice(0, 15)))
        .catch((error) => {
          console.error('Error fetching services: ', error);
        });
    })();
  }, []);

  return (
    <Flex className="homepage">
      <Flex className="sider">
        <Flex className="sider__buttons">
          {userStore && <Button onClick={() => navigate('/account#cart')}>Корзина</Button>}
          {/* <Button onClick={() => navigate('/services')}>Услуги</Button> */}
          <Button onClick={() => navigate('/users?role=MASTER')}>Мастера</Button>
          <Button onClick={() => navigate('/contacts')}>Напишите нам</Button>
        </Flex>
        <Select allowClear mode="tags" options={options} placeholder="Выберите категории" />
        {/* TODO: Map */}
      </Flex>
      <Flex className="main">
        {/* TODO: Slider */}
        <Paragraph className="main__title">Услуги мастера</Paragraph>
        <Flex className="main__list">
          {services ? (
            services.map(({ id, title, image }) => (
              <ServiceCard key={id} id={id} title={title} image={image} />
            ))
          ) : (
            <Loader />
          )}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default HomePage;
