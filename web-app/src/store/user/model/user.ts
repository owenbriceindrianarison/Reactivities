export interface User {
  username: string;
  displayName: string;
  token: string;
  image?: string;
}

export interface UserFormValues {
  email: string;
  password: string;
  displaName?: string;
  username?: string;
}
