interface IUser {
  id: number;
  name: string;
  email: string;
  avatar: string;
  rank: number;
  role: string[];
  createdAt: string | Date;
  status: "BANNED" | "AVIABLE";
};

export default IUser;