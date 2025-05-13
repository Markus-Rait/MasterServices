import { getUsers } from '@/utils/api';
import { GET_UPLOADS_URL } from '@/utils/constants';
import { Role as RoleEnum, type Role, type User } from '@prisma-app/client';
import { Button, Flex, Image, Select, Table, type SelectProps } from 'antd';
import type { FC } from 'react';
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const Users: FC = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<any[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedRole, setSelectedRole] = useState<Role>(searchParams.get('role') as Role);

  const columns = [
    {
      dataIndex: 'avatar',
      render: (
        _: any,
        record: { id: string; avatar: string; firstName: string; lastName: string },
      ) => <Image preview={false} height={50} src={`${GET_UPLOADS_URL}/${record.avatar}`} />,
    },
    {
      dataIndex: 'name',
      render: (_: any, record: { firstName: string; lastName: string }) => (
        <>
          {record.firstName} {record.lastName}
        </>
      ),
    },
    { dataIndex: 'email' },
    { dataIndex: 'phone' },
    { dataIndex: 'role' },
    {
      dataIndex: 'actions',
      render: (_: any, record: { id: string }) => (
        <Flex>
          <Button onClick={() => navigate(`/users/${record.id}`)}>Подробнее</Button>
        </Flex>
      ),
    },
  ];

  const options: SelectProps['options'] = Object.keys(RoleEnum).map((role) => ({
    label: role,
    value: role,
  }));

  const fetchUsers = async (role?: Role) => {
    await getUsers()
      .then((res) => setUsers(res.data.filter((user: User) => (role ? user.role == role : true))))
      .catch((error) => console.error('Error fetching users:', error));
  };

  const handleRoleChange = (value: Role) => {
    setSelectedRole(value);
    setSearchParams({ role: value });
  };

  useEffect(() => {
    fetchUsers(selectedRole);
  }, [selectedRole]);

  return (
    <Flex className="users" vertical>
      <Select
        className="users__select"
        defaultValue={searchParams.get('role') as Role}
        onChange={handleRoleChange}
        options={options}
        value={selectedRole}
      />
      <Table showHeader={true} dataSource={users} pagination={false} columns={columns} />
    </Flex>
  );
};

export default Users;
