import Person from "./Person";

export default interface Student extends Person {
     level:string,
     companyId?: number,
}
