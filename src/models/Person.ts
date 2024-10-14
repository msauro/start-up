export default interface Person {
  id: number;
  name: string;
  surname: string;
  alias?: string;
  dob?: Date;
  email: string;
  phone: number;
  rol: Role;
  isActive: boolean;
  city?: string;
  levelId?: number;
  companyId?: number;
  courseId?: number;
  cbu?: string;
}

export enum Role {
  STUDENT = "student",
  TEACHER = "teacher",
}
