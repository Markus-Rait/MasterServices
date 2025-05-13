import {
    AUTH_URL,
    CARTS_URL,
    ORDERS_URL,
    SERVICES_URL,
    UPLOAD_URL,
    USERS_URL,
} from '@/utils/constants';
import type { Cart, Order, Service, User } from '@prisma-app/client';
import axios from 'axios';

export const register = (data: any) => axios.post(`${AUTH_URL}/register`, data);
export const loginByEmail = (data: { email: string; password: string }) =>
  axios.post(`${AUTH_URL}/login`, data);

export const upload = (file: { name: string }) => axios.post(UPLOAD_URL, file);

// Users API calls
export const getUsers = () => axios.get(USERS_URL);
export const getUserById = (id: string) =>
  axios.get(`${USERS_URL}/${id}`);
export const createUser = (userData: Omit<User, 'id'>) =>
  axios.post(USERS_URL, userData);
export const updateUser = (id: string, updateData: Omit<User, 'id'>) =>
  axios.put(`${USERS_URL}/${id}`, updateData);
export const deleteUser = (id: string) => axios.delete(`${USERS_URL}/${id}`);

// Services API calls
export const getServices = () => axios.get(SERVICES_URL);
export const getServiceById = (id: string) =>
  axios.get(`${SERVICES_URL}/${id}`);
export const createService = (serviceData: Omit<Service, 'id'>) =>
  axios.post(SERVICES_URL, serviceData);
export const updateService = (id: string, updateData: Omit<Service, 'id'>) =>
  axios.put(`${SERVICES_URL}/${id}`, updateData);
export const deleteService = (id: string) =>
  axios.delete(`${SERVICES_URL}/${id}`);

// Cart API calls
export const getAllCarts = () => axios.get(CARTS_URL);
export const getAllCartsByUserID = (userID: string | undefined) =>
  axios.get(CARTS_URL, { params: { userID } });
export const getCartById = (id: string) => axios.get(`${CARTS_URL}/${id}`);
export const createCart = (cartData: Omit<Cart, 'id'>) =>
  axios.post(CARTS_URL, cartData);
export const updateCart = (id: string, updateData: Omit<Cart, 'id'>) =>
  axios.put(`${CARTS_URL}/${id}`, updateData);
export const deleteCart = (id: string) => axios.delete(`${CARTS_URL}/${id}`);

// Order API calls
export const getAllOrders = () => axios.get(ORDERS_URL);
export const getOrderById = (id: string) => axios.get(`${ORDERS_URL}/${id}`);
export const createOrder = (orderData: Omit<Order, 'id'>) =>
  axios.post(ORDERS_URL, orderData);
export const updateOrder = (id: string, updateData: Omit<Order, 'id'>) =>
  axios.put(`${ORDERS_URL}/${id}`, updateData);
export const deleteOrder = (id: string) => axios.delete(`${ORDERS_URL}/${id}`);
