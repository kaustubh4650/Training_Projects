export class Address {
  label: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  isDefault: boolean;
}

export class User {
  _id?: string;
  name: string;
  email: string;
  password?: string;
  passwordHash?: string;
  role: 'customer';
  phone?: string;
  addresses?: Address[];
  createdAt?: Date;
  updatedAt?: Date;
}
