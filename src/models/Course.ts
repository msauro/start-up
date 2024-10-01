import Person from "./Person";

export default interface Course {
  id: number;
  name: string;
  level: string;
  unit: number;
  students: Array<Person>;
  teacherId: number;
  isActive: boolean;
  day: string;
  hour: string;
  companyId?: number;
}
