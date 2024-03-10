import { IsNotEmpty } from "class-validator";

export class User {
  userId: string;
  name: string;
  email: string;
  lastname: string;
  password: string;
  avatar: string;
}
