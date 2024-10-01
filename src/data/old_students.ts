import { Role } from "../models/Person";

export const studentsList = [

{
  "id": "01",
  "name": 'Ramon',
  "surname": 'Diaz',	
  "email": 'ramon@a.com',
  "rol": Role.STUDENT,
  "level": 'E1',
  "phone": 3415000000,
  "city": 'Rosario',
	"isActive": true,
  "companyId": 1,
},
{
  "id": "02",
  "name": 'Lucia',
  "surname": 'Nude',	
  "email": 'nude@ab.com',
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
  "email": 'lucas@a.com',
  "rol": Role.STUDENT,
  "level": 'A2',
  "phone": 3415000002,
	"isActive": true,
  "companyId": 2,

},
{
  "id": "04",
  "name": 'Matias',
  "surname": 'Sauro',	
  "email": 'matias@a.com',
  "rol": Role.STUDENT,
  "level": 'A1',
  "phone": 3415000003,
	"isActive": false,
},

]