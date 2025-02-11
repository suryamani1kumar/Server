export interface Usertype {
  name: string;
  email: string;
  password: string;
  role: "superadmin" | "admin" | "user"; 
  username: string;
  id: string; 
  isActive: boolean;
  createdAt: string; 
  updatedAt: string; 
  Lastlogin: string; 
}
