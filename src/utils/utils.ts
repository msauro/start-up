import { companiesList } from "../data/company";
import { coursesList } from "../data/course";
import { levelList } from "../data/level";
import Company from "../models/Company";
import Course from "../models/Course";
import Level from "../models/Level";

export const getCompany = (companyId?: number): Company | undefined => {
  if (companyId === undefined) {
    return undefined;
  }
  return companiesList.find((element) => element.id === companyId);
};

export const getCourse = (courseId?: number): Course | undefined => {
  if (courseId === undefined) {
    return undefined;
  }
  return coursesList.find((element) => element.id === courseId);
};

export const getLevel = (levelId?: number): Level | undefined => {
  if (levelId === undefined) {
    return undefined;
  }
  if (levelId) {
    return levelList.find((element) => element.id === levelId);
  }
};

export const getLevels = () => {
  //TIENE SENTIDO???????????????????????????????????????
  return levelList;
};
export const getCompanies = () => {
  //TIENE SENTIDO???????????????????????????????????????
  return companiesList;
};

export const getLevelCourses = (levelPerson: number) => {
  //solo devuelvo coursos con el nivel del alumno
  return coursesList.filter((element) => element.levelId === levelPerson);
};

//hacer funcion para recuperar los alumnos de un curso

export const getStudentsByCourse = (courseId: number) => {
  const course = coursesList.filter((element) => element.id === courseId);
  getStudentsByCourse(course.students);
};
