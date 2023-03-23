interface IUser {
  id: number;
  avatar?: string;
  email: string;
  name: string;
  role: string[];
  rank: number;
  isVerefied: boolean;
  createdAt: Date;
  password: string;
  status: "AVIABLE" | "BANNED";
}

export default IUser;