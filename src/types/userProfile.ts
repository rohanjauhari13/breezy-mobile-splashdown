
export interface UserProfile {
  id?: string;
  name: string;
  email: string;
  phone: string;
  program: string;
  location: string;
  preferences: string[];
  amenities: string[];
  created_at?: string;
}
