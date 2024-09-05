import Person from "./person";

export default interface Student extends Person {
     level:string,
     companyId?: string,
     companyName: string,
}
