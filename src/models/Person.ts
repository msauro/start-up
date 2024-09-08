export default interface Person {
  id: string;
  name: string;
  surname: string;
  alias?: string;
  dob?: Date;
  email: string;
  phone: number;
  rol: Role;
  isActive: boolean;
  city?: string;
}

export enum Role {
  STUDENT = "student",
  TEACHER = "teacher",
}
