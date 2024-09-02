import { Role } from "../models/person";

export const studentsList = [

{
  "id": "01",
  "name": 'Ramon',
  "surname": 'Diaz',	
  "mail": 'ramon@a.com',
  "rol": Role.STUDENT,
  "level": 'E1',
  "phone": 3415000000,
  "city": 'Rosario',
	"isActive": true,
},
{
  "id": "02",
  "name": 'Lucia',
  "surname": 'Nude',	
  "mail": 'nude@ab.com',
  "rol": Role.STUDENT,
  "level": 'I1',
  "phone": 3415000001,
  "city": 'Cordoba',
	"isActive": true,
},
{
  "id": "03",
  "name": 'Lucas',
  "surname": 'Ferrarini',	
  "mail": 'lucas@a.com',
  "rol": Role.STUDENT,
  "level": 'A2',
  "phone": 3415000002,
	"isActive": true,
},
{
  "id": "04",
  "name": 'Matias',
  "surname": 'Sauro',	
  "mail": 'matias@a.com',
  "rol": Role.STUDENT,
  "level": 'A1',
  "phone": 3415000003,
	"isActive": false,
},

]