
export default interface Person {
  id: string,
  name: string,
  surname: string,
  dob?: Date,
  mail: string,
  phone: number,
  rol: Role,
  isActive: boolean,
  city?: string,
  

}

export enum Role {
    STUDENT='student',
    TEACHER='teacher'
}