import { companiesList } from "../data/company";
import { coursesList } from "../data/course";
import { levelList } from "../data/level";

export const getCompany = (comapnyId: number) => {
  return companiesList.find((element) => element.id === comapnyId);
};

export const getCourse = (courseId: number) => {
  return coursesList.find((element) => element.id === courseId);
};

export const getLevel = (levelId: number) => {
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
