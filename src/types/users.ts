export interface User {
  id: number;
  name: string;
  email: string;
  address?: string;
  avatarUrl?: string;
  role: 'user' | 'admin';
}