import { Button } from "primereact/button";
import Student from "./models/Student";
import Teacher from "./models/Teacher";
import { InputText } from "primereact/inputtext";
import { Message } from "primereact/message";
import { useState } from "react";
import { InputSwitch } from "primereact/inputswitch";
import { Role } from "./models/person";

interface PersonDetailProps {
    selectedPerson: Student | Teacher; 
    rol: string// Aquí definimos el tipo de la prop que se va a recibir
    onBack: () => void
  }

export const PersonDetail: React.FC<PersonDetailProps> = ({rol, selectedPerson, onBack}) => {
    //Faltaria agregar la compañia, que puede pertenecer solo al alumno
    const [formValues, setFormValues] = useState({
        name: selectedPerson.name,
        surname: selectedPerson.surname,
        level: selectedPerson?.level,
        email: selectedPerson.mail,
        phone: selectedPerson.phone,
        city: selectedPerson.city,
        dob: selectedPerson.dob,
        isActive: selectedPerson.isActive,
        invalid: false
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        console.log('target')
        console.log(e.target)

        setFormValues({
            ...formValues,
            [id]: value,
        });

        setErrorMessage(id)
  };

  const setErrorMessage = (id:string) => { //ACA DEBERIA GENERAR EL HTML Y ENVIAR EL ERROR DESDE ACA
    return(
    <Message severity="error" text={`${id} is required`} />
    )
  }
      
  const updatePerson = () => { //guarda datos modificados datos
    console.log(rol)
  };


  return (
    <>
      <Button onClick={onBack} label="Back" icon="pi pi-chevron-left"/>
      <h1>Edit {rol.toUpperCase()} {formValues.name} {formValues.surname}</h1>


      <div className="flex flex-wrap align-items-center mb-3 gap-2">
          <label htmlFor="name" className="p-sr-only">Name</label>
          <InputText id="name" placeholder="Name" value={formValues.name} onChange={handleInputChange} className={`${formValues.invalid} mr-2`} />
          {!formValues.name &&
          <Message severity="error" text="Name is required" />
          }
          </div>
      <div className="flex flex-wrap align-items-center mb-3 gap-2">
          <label htmlFor="surname" className="p-sr-only">Surname</label>
          <InputText id="surname" placeholder="Surname" value={formValues.surname} onChange={handleInputChange} className={`${formValues.invalid} mr-2`} />
          {!formValues.surname &&
          <Message severity="error" text="Surname is required" />
          }
      </div>
      <div className="flex flex-wrap align-items-center mb-3 gap-2">
          <label htmlFor="level" className="p-sr-only">Level</label>
          <InputText id="level" placeholder="Level" value={formValues.level} onChange={handleInputChange} className={`${formValues.invalid} mr-2`} />
          {!formValues.level &&
          <Message severity="error" text="Level is required" />
          }
      </div>
      <div className="flex flex-wrap align-items-center mb-3 gap-2">
          <label htmlFor="email" className="p-sr-only">Email</label>
          <InputText id="email" type="email" placeholder="Email" value={formValues.email} onChange={handleInputChange} className={`${formValues.invalid} mr-2`} />
          {!formValues.email &&
            <Message severity="error" text="Email is required"/>
          }
      </div>     
      <div className="flex flex-wrap align-items-center mb-3 gap-2">
          <label htmlFor="phone" className="p-sr-only">Phone</label>
          <InputText id="phone" type="number" placeholder="Phone" value={formValues.phone.toString()} onChange={handleInputChange} className={`${formValues.invalid} mr-2`} />
          {!formValues.phone &&
            <Message severity="error" text="Phone is required"/>
          }
      </div>
      {selectedPerson.dob}
      <div className="flex flex-wrap align-items-center mb-3 gap-2">
          <label htmlFor="dob" className="p-sr-only">DoB</label>
          <InputText id="dob" type="dob" placeholder="Dob" value={formValues.dob} onChange={handleInputChange} className={`${formValues.invalid} mr-2`} />
          {!formValues.dob &&
            <Message severity="error" text="Email is required"/>
          }
      </div>
      {selectedPerson.rol === Role.STUDENT &&
        <div className="flex flex-wrap align-items-center mb-3 gap-2">
            <label htmlFor="Name" className="p-sr-only">Company</label>
            <InputText id="companyName" type="number" placeholder="companyName" value={formValues.companyName} onChange={handleInputChange} className={`${formValues.invalid} mr-2`} />
            {!formValues.companyName &&
              <Message severity="error" text="companyName is required"/>
            }
        </div>
      }
      <div className="flex flex-wrap align-items-center mb-3 gap-2">
          <label htmlFor="city" className="p-sr-only">City</label>
          <InputText id="city" placeholder="City" value={formValues.city} onChange={handleInputChange} className={`${formValues.invalid} mr-2`} />
          {!formValues.city &&
            <Message severity="error" text="city is required"/>
          }
      </div>
      
      <div className="flex flex-wrap align-items-center mb-3 gap-2">
          <label htmlFor="isActive" className="p-sr-only">Is Active</label>
          <InputSwitch id="isActive" placeholder="IsActive"  checked=
          {formValues.isActive} onChange={handleInputChange} className={`${formValues.invalid} mr-2`} />
            <Message severity={formValues.isActive ? 'success' : 'error'} text={formValues.isActive ? 'Active' : 'Inactive'}/>
      </div>

      <div className="card flex justify-content-center">
            <Button label="Submit" disabled />
            <Button onClick={updatePerson} label="Update" icon="pi pi-sync"/>
      </div>

      

    </>
  )
}
