import { Button } from "primereact/button"
import { InputSwitch, InputSwitchChangeEvent } from "primereact/inputswitch"
import { InputText } from "primereact/inputtext"
import { Tag } from "primereact/tag"
import { useState } from "react"
import Person from "./models/Person"
import { Message } from "primereact/message"
import { Calendar, CalendarProps } from "primereact/calendar"
import { InputNumber, InputNumberValueChangeEvent } from "primereact/inputnumber"
import { getCompanies, getCompany, getCourse, getLevel, getLevelCourses, getLevels } from "./utils/utils"
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
    console.log('e')
    console.log(e)
    setPersonForm(({
      ...personForm,
      [e.target.id]: e.value
    }));
  }

  const handleUpdate = () => {
    console.log('e.personForm')
    console.log(personForm)

    handleUpdateStudent(personForm)
  }

  const [selectedLevel, setSelectedLevel] = useState<Level | undefined>(getLevel(personForm.levelId as number));
  const [selectedCourse, setSelectedCourse] = useState<Level | undefined>(getCourse(personForm.courseId as number));
  const [selectedCompany, setSelectedCompany] = useState<Level | undefined>(getCompany(personForm.companyId as number));



  function handleLevelDropdownChange(event: DropdownChangeEvent): void {
    setPersonForm({
      ...personForm,
      [event.target.id]: event.target.value.id
    })

    setSelectedLevel(event.value)
    setSelectedCourse(undefined)
  }

  function handleCourseDropdownChange(event: DropdownChangeEvent): void {
    setPersonForm({
      ...personForm,
      [event.target.id]: event.target.value.id
    })
    setSelectedCourse(event.value)
  }


  return (
    <>
      <div className="card flex flex-wrap justify-content-start gap-3">
        <Button label="Back" icon="pi pi-arrow-left" onClick={handleBackClick} />
      </div>
      <div className="flex align-items-center justify-content-center">
        <div className="surface-card p-4 shadow-2 border-round w-full lg:w-6">
          <div className="text-center mb-5">
            {!personForm.courseId && <Tag severity="info" value="Sin curso"></Tag>}

            <div className="text-900 text-3xl font-medium mb-3">Edit Person</div>
            <span className="text-600 font-medium line-height-3">Don't have an account?</span>
            <p>Dependiendo si debe, no debe muestro:</p>
            <Tag severity="success" value="Sin deuda"></Tag>
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
            <InputNumber id="phone" placeholder="Phone" value={personForm.phone} onValueChange={handleNumberChange} className="w-full mb-3" />

            <label htmlFor="city" className="block text-900 font-medium mb-2">City</label>
            <InputText id="city" type="text" placeholder="City" value={personForm.city} onChange={handleInputChange} className="w-full mb-3" />

            <label htmlFor="levelId" className="block text-900 font-medium mb-2">Level</label>
            <Dropdown id="levelId" value={selectedLevel} onChange={handleLevelDropdownChange} options={getLevels()} optionLabel="name"
              placeholder="Select a Level" className="w-full md:w-14rem" checkmark={true} highlightOnSelect={false} />

            <label htmlFor="courseId" className="block text-900 font-medium mb-2">Course</label>
            <Dropdown id="courseId" value={selectedCourse} onChange={handleCourseDropdownChange} options={getLevelCourses(selectedLevel?.id as number)} optionLabel="name"
              placeholder="Select a Course" className="w-full md:w-14rem" checkmark={true} highlightOnSelect={false} />

            <label htmlFor="companyId" className="block text-900 font-medium mb-2">Company</label>
            <Dropdown id="companyId" value={selectedCompany} onChange={(e: DropdownChangeEvent) => setSelectedCompany(e.value)} options={getCompanies()} optionLabel="name"
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
