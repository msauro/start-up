import { Button } from "primereact/button";
import Student from "./models/Student";
import Teacher from "./models/Teacher";
import { InputText } from "primereact/inputtext";
import { Message } from "primereact/message";

interface PersonDetailProps {
    selectedPerson: Student | Teacher; 
    rol: string// Aquí definimos el tipo de la prop que se va a recibir
    onBack: () => void
  }

export const PersonDetail: React.FC<PersonDetailProps> = ({rol, selectedPerson, onBack}) => {
    
  const upDatePerson = () => { //actualiza datos
    console.log(rol)
  };

  return (
    <>
      <Button onClick={onBack} label="Back" icon="pi pi-chevron-left"/>
      <h1>PersonDetail {rol} *** {selectedPerson.level}</h1>


      <div className="flex flex-wrap align-items-center mb-3 gap-2">
          <label htmlFor="name" className="p-sr-only">Name</label>
          <InputText id="name" placeholder="Name" value={selectedPerson.name} className="p-invalid mr-2" />
          <Message severity="error" text="Name is required" />
      </div>
      <div className="flex flex-wrap align-items-center mb-3 gap-2">
          <label htmlFor="surname" className="p-sr-only">Surname</label>
          <InputText id="surname" placeholder="Surname" value={selectedPerson.surname} className="p-invalid mr-2" />
          <Message severity="error" text="Surname is required" />
      </div>
      {selectedPerson.level &&
      <div className="flex flex-wrap align-items-center mb-3 gap-2">
          <label htmlFor="level" className="p-sr-only">Level</label>
          <InputText id="level" placeholder="Level" value={selectedPerson.level} className="p-invalid mr-2" />
          <Message severity="error" text="Level is required" />
      </div>
      }
      <div className="flex flex-wrap align-items-center mb-3 gap-2">
          <label htmlFor="email" className="p-sr-only">Email</label>
          <InputText id="email" placeholder="Email" value={selectedPerson.mail} className="p-invalid mr-2" />
          <Message severity="error" />
      </div>     
      <div className="flex flex-wrap align-items-center mb-3 gap-2">
          <label htmlFor="phone" className="p-sr-only">Phone</label>
          <InputText id="phone" placeholder="Phone" value={selectedPerson.phone.toString()} className="p-invalid mr-2" />
          <Message severity="error" text="Phone is required" />
      </div>
      {selectedPerson.city &&
      <div className="flex flex-wrap align-items-center mb-3 gap-2">
          <label htmlFor="city" className="p-sr-only">City</label>
          <InputText id="city" placeholder="City" value={selectedPerson.city} className="p-invalid mr-2" />
          <Message severity="error" text="City is required" />
      </div>
      }
      <div className="flex flex-wrap align-items-center mb-3 gap-2">
          <label htmlFor="isActive" className="p-sr-only">Is Active</label>
          <InputText id="isActive" placeholder="IsActive" value={selectedPerson.isActive? 'true' : 'false'} className="p-invalid mr-2" />
          <Message severity="error" text="IsActive is required" />
      </div>

      <Button onClick={upDatePerson} label="Update" icon="pi pi-sync"/>

    </>
  )
}
