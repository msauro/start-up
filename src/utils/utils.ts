import { companiesList } from "../data/company";
import { coursesList } from "../data/course";
import { levelList } from "../data/level";
import { personList } from "../data/person";
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
  return levelList;
};
export const getCompanies = () => {
  return companiesList;
};

export const getLevelCourses = (levelPerson: number) => {
  //solo devuelvo coursos con el nivel del alumno
  return coursesList.filter((element) => element.levelId === levelPerson);
};

//find devuleve el primero que encuentra, filter SIEMPRE devuelve un array
export const getIdStudentsByCourse = (courseId: number) => {
  const course = getCourse(courseId);
  return course ? course.students : [];
};

export const countActivePersonByRole = (role: string) => {
  return personList.filter((element) => element.rol === role).length;
};

export const countActiveCourses = () => {
  return coursesList.filter((course) => course.isActive === true).length;
};
