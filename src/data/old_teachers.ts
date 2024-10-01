import { Role } from "../models/Person";

export const teachersList = [
  {
    id: "01",
    name: "Emilia",
    surname: "Basso",
    email: "emi@a.com",
    phone: 3413000000,
    isActive: true,
    rol: Role.TEACHER,
    level: "L1",
    alias: "Milu",
  },
  {
    id: "02",
    name: "Marta",
    surname: "Lopez",
    email: "marta@ab.com",
    phone: 3413000001,
    isActive: false,
    rol: Role.TEACHER,
  },
  {
    id: "03",
    name: "Andrea",
    surname: "Rapalini",
    email: "andrea@a.com",
    phone: 3413000002,
    isActive: true,
    rol: Role.TEACHER,
  },
  {
    id: "04",
    name: "Marisa",
    surname: "Tell",
    email: "mari@a.com",
    phone: 3413000003,
    isActive: false,
    rol: Role.TEACHER,
  },
];
