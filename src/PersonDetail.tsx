import { Button } from "primereact/button"
import { InputSwitch, InputSwitchChangeEvent } from "primereact/inputswitch"
import { InputText } from "primereact/inputtext"
import { Tag } from "primereact/tag"
import { useState } from "react"
import Person from "./models/Person"
import { Message } from "primereact/message"
import { Calendar, CalendarProps } from "primereact/calendar"
import { InputNumber, InputNumberValueChangeEvent } from "primereact/inputnumber"
import { getCompanies, getCompany, getCourse, getLevel, getLevelCourses, getLevelName, getLevels } from "./utils/utils"
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown"
import Level from "./models/Level"

interface Props {
  selectedPerson: Person;
  handleUpdateStudent: (studentRow: Person) => void;
  handleBackClick: () => void;
}

export const PersonDetail: React.FC<Props> = ({ selectedPerson, handleUpdateStudent, handleBackClick }) => {

  const [personForm, setPersonForm] = useState<Person>(selectedPerson);
  console.log('personForm')
  console.log(personForm)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setPersonForm({
      ...personForm,
      [id]: value,
    });
  }

  const handleSwitchChange = (e: InputSwitchChangeEvent) => {
    setPersonForm(({
      ...personForm,
      [e.target.id]: e.value // Actualiza el valor basado en el id del input
    }));
  };

  const handleCalendarChange = (e: CalendarProps) => {
    console.log(e.value)
  }

  const handleNumberChange = (e: InputNumberValueChangeEvent) => {
    console.log(e.value)
  }

  const handleUpdate = () => {
    handleUpdateStudent(personForm)
  }

  const [selectedLevel, setSelectedLevel] = useState<Level | null>(getLevel(personForm.levelId) ?? null);
  const [selectedCourse, setSelectedCourse] = useState<Level | null>(getCourse(personForm.courseId) ?? null);
  const [selectedCompany, setSelectedCompany] = useState<Level | null>(getCompany(personForm.companyId) ?? null);



  return (
    <>
      <div className="card flex flex-wrap justify-content-start gap-3">
        <Button label="Back" icon="pi pi-arrow-left" onClick={handleBackClick} />
      </div>
      <div className="flex align-items-center justify-content-center">
        <div className="surface-card p-4 shadow-2 border-round w-full lg:w-6">
          <div className="text-center mb-5">
            <img src="/images/blocks/logos/hyper.svg" alt="hyper" height={50} className="mb-3" />
            <div className="text-900 text-3xl font-medium mb-3">Edit Person</div>
            <span className="text-600 font-medium line-height-3">Don't have an account?</span>
            <p>Dependiendo si debe, no debe o no tiene curso asignado muestro:</p>
            <Tag severity="success" value="Sin deuda"></Tag>
            <Tag severity="info" value="Sin curso"></Tag>
            <Tag severity="danger" value="Debe"></Tag>
            <a className="font-medium no-underline ml-2 text-blue-500 cursor-pointer">Debe
            </a>
          </div>

          <div>
            <label htmlFor="name" className="block text-900 font-medium mb-2">Name</label>
            <InputText id="name" type="text" placeholder="Name" value={personForm.name} onChange={handleInputChange} className="w-full mb-3" />

            <label htmlFor="surname" className="block text-900 font-medium mb-2">Surname</label>
            <InputText id="surname" type="text" placeholder="Surname" value={personForm.surname} onChange={handleInputChange} className="w-full mb-3" />

            <label htmlFor="alias" className="block text-900 font-medium mb-2">Alias</label>
            <InputText id="alias" type="text" placeholder="Alias" value={personForm.alias} onChange={handleInputChange} className="w-full mb-3" />

            <label htmlFor="dob" className="block text-900 font-medium mb-2">Birthday</label>
            <Calendar dateFormat="dd/mm/yy" id="dob" placeholder="Birthday" value={personForm.dob} onChange={handleCalendarChange} className="w-full mb-3" />

            <label htmlFor="phone" className="block text-900 font-medium mb-2">Phone</label>
            <InputNumber id="phone" type="number" placeholder="Phone" value={personForm.phone} onValueChange={handleNumberChange} className="w-full mb-3" />

            <label htmlFor="city" className="block text-900 font-medium mb-2">City</label>
            <InputText id="city" type="text" placeholder="City" value={personForm.city} onChange={handleInputChange} className="w-full mb-3" />

            <label htmlFor="level" className="block text-900 font-medium mb-2">Level</label>
            <Dropdown id="level" value={selectedLevel} onChange={(e: DropdownChangeEvent) => setSelectedLevel(e.value)} options={getLevels()} optionLabel="name"
              placeholder="Select a Level" className="w-full md:w-14rem" checkmark={true} highlightOnSelect={false} />

            <label htmlFor="courseId" className="block text-900 font-medium mb-2">Course</label>
            {/* <InputText id="courseId" type="text" placeholder="Course" value={getCourse(personForm.courseId as number)?.name} onValueChange={handleNumberChange} className="w-full mb-3" /> */}
           //DEBERIA HACER QUE EL Dropdown de curso DEPENDA DEL NIVEL "selectedLevel" SELECCIONADO, O dEL "selectedPerson.levelId" // le puedo mandar "selectedLevel"
            <Dropdown id="courseId" value={selectedCourse} onChange={(e: DropdownChangeEvent) => setSelectedCourse(e.value)} options={getLevelCourses(personForm.levelId as number)} optionLabel="name"
              placeholder="Select a Course" className="w-full md:w-14rem" checkmark={true} highlightOnSelect={false} />

            <label htmlFor="company" className="block text-900 font-medium mb-2">Company</label>
            {/* <InputText id="company" type="text" placeholder="Company" value={getCompany(personForm.companyId as number)?.name} onValueChange={handleNumberChange} className="w-full mb-3" />
             */}<Dropdown id="company" value={selectedCompany} onChange={(e: DropdownChangeEvent) => setSelectedCompany(e.value)} options={getCompanies()} optionLabel="name"
              placeholder="Select a Company" className="w-full md:w-14rem" checkmark={true} highlightOnSelect={false} />

            <label htmlFor="email" className="block text-900 font-medium mb-2">Email</label>
            <InputText id="email" type="text" placeholder="Email address" value={personForm.email} onChange={handleInputChange} className="w-full mb-3" />

            <label htmlFor="isActive" className="block text-900 font-medium mb-2">Active</label>
            <InputSwitch id="isActive" checked={personForm.isActive} onChange={handleSwitchChange} />
            <Message
              severity={personForm.isActive ? "success" : "error"}
              text={personForm.isActive ? "Active" : "Inactive"}
            />
            <Button label="Update" icon="pi pi-update" onClick={handleUpdate} className="w-full mt-3" />
          </div>
        </div>
      </div>

    </>
  )
}
