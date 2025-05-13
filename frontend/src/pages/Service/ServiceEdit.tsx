import Loader from '@/components/Loader';
import { getServiceById, updateService } from '@/utils/api';
import {
    abbreviations,
    Categories,
    serviceFormSchema,
    UPLOAD_URL,
    type ServiceForm,
} from '@/utils/constants';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Card, Form, Input, Select, Upload, type FormProps, type SelectProps } from 'antd';
import { createSchemaFieldRule } from 'antd-zod';
import { useEffect, useState, type FC } from 'react';
import { useParams } from 'react-router-dom';

const serviceRule = createSchemaFieldRule(serviceFormSchema);

const ServiceEdit: FC = () => {
  const { id } = useParams();
  const [serviceData, setServiceData] = useState<ServiceForm | null>(null);

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

  const onFinish: FormProps<ServiceForm & { image: any }>['onFinish'] = async (values) => {
    await updateService(id as string, {
      ...values,
      description: values.description ?? '',
      image: values?.image?.file?.response?.name,
    }).catch((error) => console.error(error));
  };

  useEffect(() => {
    (async () => {
      await getServiceById(id as string)
        .then((res) => setServiceData(res.data))
        .catch((error) => {
          console.error('Cannot fetch service by ID: ', error);
        });
    })();
  }, [id]);

  return serviceData ? (
    <Card title="Редактирование услуги" className="service-form-card">
      <Form onFinish={onFinish} initialValues={serviceData}>
        <Form.Item name="title" label="Название" rules={[serviceRule]}>
          <Input />
        </Form.Item>
        <Form.Item name="description" label="Описание" rules={[serviceRule]}>
          <Input />
        </Form.Item>
        <Form.Item name="image" label="Изображение" rules={[serviceRule]}>
          <Upload
            action={UPLOAD_URL}
            listType="picture"
            accept="image/png, image/jpeg"
            maxCount={1}
          >
            <Button style={{ border: 0, background: 'none' }}>
              <PlusOutlined />
              Загрузить
            </Button>
          </Upload>
        </Form.Item>
        <Form.Item label="Категории">
          <Select mode="tags" allowClear placeholder="Выберите категории" options={options} />
        </Form.Item>
        <Button type="primary" htmlType="submit">
          Обновить
        </Button>
      </Form>
    </Card>
  ) : (
    <Loader />
  );
};

export default ServiceEdit;
