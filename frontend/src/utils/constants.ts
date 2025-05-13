import { z } from 'zod';
import { Gender as GenderEnum, Role as RoleEnum } from '@prisma-app/client';

export const abbreviations = ['HVAC'];

export const Categories = [
    'WINDOW_AND_DOOR_REPAIR0REPLACEMENT',
    'PLUMBING_SERVICES',
    'ELECTRICAL_WORK',
    'HVAC_MAINTENANCE0REPAIR',
    'ROOF_REPAIR0REPLACEMENT',
    'FOUNDATION_REPAIR',
    'LANDSCAPING_SERVICES',
    'PEST_CONTROL',
    'CLEANING_SERVICES',
    'PAINTING_AND_DECORATING',
    'FLOORING_INSTALLATION0REPAIR',
    'CARPENTRY_SERVICES',
    'HOME_AUTOMATION',
    'APPLIANCE_REPAIR0INSTALLATION',
    'DRAIN_CLEANING',
    'MOLD_REMEDIATION',
    'SECURITY_SYSTEMS_INSTALLATION',
    'ENERGY_AUDITS',
    'SIDING_REPAIR0REPLACEMENT',
    'TREE_TRIMMING0REMOVAL',
    'SWIMMING_POOL_MAINTENANCE',
    'DECK_BUILDING0REPAIR',
    'INSULATION_SERVICES',
    'SOLAR_PANEL_INSTALLATION',
    'FENCING_INSTALLATION0REPAIR',
];

export const loginFormSchema = z.object({
  email: z.string(),
  phone: z.string().optional().or(z.literal('')),
  password: z.string(),
});

export const userFormSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(3),
  gender: z.nativeEnum(GenderEnum),
  email: z.string().email(),
  phone: z.string(),
  address: z.string(),
  role: z.nativeEnum(RoleEnum),
  avatar: z.object<any>({}),
  password: z.string(),
});

export type UserForm = typeof userFormSchema._type

export const initialUserFormData: UserForm = {
  firstName: '',
  lastName: '',
  gender: 'MALE',
  email: '',
  phone: '',
  address: '',
  role: 'CLIENT',
  avatar: {},
  password: ''
};

export const serviceFormSchema = z.object({
  title: z.string().min(1),
  image: z.any().optional(),
  description: z.string().max(200).optional(),
  change: z.string().array(),
  categories: z.string().array(),
});

export type ServiceForm = typeof serviceFormSchema._type;

export const initialServiceFormData: ServiceForm = {
  title: '',
  image: '',
  description: '',
  change: [],
  categories: [],
};

export const phonePrefix = '+7';

export const API_URL = 'http://localhost:3000';

export const AUTH_URL = `${API_URL}/auth`;

export const UPLOAD_URL = `${API_URL}/upload`;
export const GET_UPLOADS_URL = `${API_URL}/uploads`;

export const USERS_URL = `${API_URL}/users`;
export const SERVICES_URL = `${API_URL}/services`;
export const CARTS_URL = `${API_URL}/carts`;
export const ORDERS_URL = `${API_URL}/orders`;
