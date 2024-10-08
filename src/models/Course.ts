export default interface Course {
  id: number;
  name: string;
  levelId: number;
  unit: number;
  students: Array<number>;
  teacherId: number;
  isActive: boolean;
  day: string;
  hour: string;
  companyId?: number;
}
