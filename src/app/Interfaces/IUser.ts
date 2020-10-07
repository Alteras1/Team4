﻿export interface IUser  {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  newPassword?: string;
  email?: string;
  street?: string;
  city?: string;
  zipcode?: string;
  state?: string;
  phone?: string;
  token: string;
}
