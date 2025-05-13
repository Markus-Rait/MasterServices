import Layout from '@/layout/Layout';
import PageNotFound from '@/pages/404';
import HomePage from '@/pages/HomePage';
import Login from '@/pages/Login';
import PersonalAccount from '@/pages/PersonalAccount/PersonalAccount';
import Register from '@/pages/Register';
import ServiceCreate from '@/pages/Service/ServiceCreate';
import ServiceEdit from '@/pages/Service/ServiceEdit';
import UserCreate from '@/pages/User/UserCreate';
import EditUser from '@/pages/User/UserEdit';
import UserInfo from '@/pages/User/UserInfo';
import Users from '@/pages/User/Users';
import { Route, Routes } from 'react-router-dom';
import ServiceInfo from './pages/Service/ServiceInfo';

const App = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/">
          <Route path="/" element={<HomePage />} index />
          <Route path="/404" element={<PageNotFound />} />
          <Route path="/account" element={<PersonalAccount />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/create" element={<UserCreate />} />
          <Route path="/users/:id" element={<UserInfo />} />
          <Route path="/users/:id/edit" element={<EditUser />} />
          {/* <Route path="/services" element={<></>} /> */}
          <Route path="/services/create" element={<ServiceCreate />} />
          <Route path="/services/:id" element={<ServiceInfo />} />
          <Route path="/services/:id/edit" element={<ServiceEdit />} />
        </Route>
      </Routes>
    </Layout>
  );
};

export default App;
