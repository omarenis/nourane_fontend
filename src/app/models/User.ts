interface Localisation
{
  city: string;
  zipCode: string;
}
export interface User
{
  firstname: string;
  lastname: string;
  email: string;
  avatarUrl: string;
  telephone: string;
  role ?: string;
  isActive ?: boolean;
  id ?: number;
  speciality ?: string;
  localisation ?: Localisation;
}
