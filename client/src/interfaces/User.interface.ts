export interface User {
  id:number;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  confirmPassword: string;
  created_at: Date;
  updated_at: Date;
  is_admin: boolean;
}