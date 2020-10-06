export interface IUser  {
  id: number;
  firstname: string;
  lastname: string;
  username: string;
  password: string;
  email: string;
  address: {
    street: string;
    city: string;
    zipcode: string;
    state: string;
  };
  phone: string;
}
