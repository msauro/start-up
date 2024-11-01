import { Button } from "primereact/button"
import { InputSwitch, InputSwitchChangeEvent } from "primereact/inputswitch"
import { InputText } from "primereact/inputtext"
import { Tag } from "primereact/tag"
import { useState } from "react"
import Person, { Role } from "./models/Person"
import { Message } from "primereact/message"
import { Calendar, CalendarViewChangeEvent } from "primereact/calendar"
import { InputNumber, InputNumberValueChangeEvent } from "primereact/inputnumber"
import { getCompanies, getCompany, getCourse, getLevel, getLevelCourses, getLevels } from "./utils/utils"
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown"
import Level from "./models/Level"
import Course from "./models/Course"
import Company from "./models/Company"

interface Props {
  selectedPerson?: Person;
  handleUpdatePerson?: (personRow: Person) => void;
  handleBackClick?: () => void;
}

export const PersonDetail: React.FC<Props> = ({ selectedPerson, handleUpdatePerson, handleBackClick }) => {

  const [personForm, setPersonForm] = useState<Person>(
    selectedPerson ? selectedPerson : {
      id: 0,
      name: '',
      surname: '',
      alias: '',
      dob: undefined,
      email: '',
      phone: 0,
      rol: Role.STUDENT,
      isActive: true,
      city: '',
      levelId: undefined,
      companyId: undefined,
      courseId: undefined,
      cbu: '',
    });

  //if (selectedPerson) { setPersonForm(selectedPerson) }

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

  const handleDateChange = (e: CalendarViewChangeEvent) => {
    const selectedDate: Date = e.value;
    // Formatear a dd/mm/yy
    const formattedDate = selectedDate.toLocaleDateString('es-AR');
    setPersonForm(({
      ...personForm,
      dob: new Date(formattedDate)
    }));
  }

  const handleNumberChange = (e: InputNumberValueChangeEvent) => {
    setPersonForm(({
      ...personForm,
      [e.target.id]: e.value
    }));
  }

  const handleUpdateDetail = () => {
    handleUpdatePerson?.(personForm)
  }

  const [selectedLevel, setSelectedLevel] = useState<Level | undefined>(getLevel(personForm.levelId as number));
  const [selectedCourse, setSelectedCourse] = useState<Course | undefined>(getCourse(personForm.courseId as number));
  const [selectedCompany, setSelectedCompany] = useState<Company | undefined>(getCompany(personForm.companyId as number));



  const handleLevelDropdownChange = (e: DropdownChangeEvent): void => {
    setPersonForm({
      ...personForm,
      [e.target.id]: e.value.id,
      //ACA DEBERIA USAR UN ENUM?
      ['courseId']: undefined
    })

    setSelectedLevel(e.value)
    setSelectedCourse(undefined)
  }


  const handleCourseDropdownChange = (e: DropdownChangeEvent): void => {
    setPersonForm({
      ...personForm,
      [e.target.id]: e.value.id
    })
    setSelectedCourse(e.value)
  }


  const handleCompanyChange = (e: DropdownChangeEvent): void => {
    setPersonForm({
      ...personForm,
      [e.target.id]: e.value.id
    })
    setSelectedCompany(e.value)
  }

  return (
    <>
      <div className="card flex flex-wrap justify-content-start gap-3">
        <Button label="Back" icon="pi pi-arrow-left" onClick={handleBackClick} />
      </div>
      <div className="flex align-items-center justify-content-center">
        <div className="surface-card p-4 shadow-2 border-round w-full lg:w-6">
          <div className="text-center mb-5">

            {!personForm.courseId && personForm.rol == Role.STUDENT && <Tag severity="info" value="Sin curso"></Tag>}

            <div className="text-900 text-3xl font-medium mb-3">{personForm.id === 0 ? 'New' : 'Edit'} {personForm.rol}</div>
            {personForm.rol == Role.TEACHER && <Button label="Courses" icon="pi pi-eye" />}

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
            <Calendar dateFormat="dd/mm/yy" id="dob" placeholder="Birthday" value={personForm.dob} onChange={handleDateChange} className="w-full mb-3" />

            <label htmlFor="phone" className="block text-900 font-medium mb-2">Phone</label>
            <InputNumber id="phone" placeholder="Phone" value={personForm.phone} onValueChange={handleNumberChange} className="w-full mb-3" />

            <label htmlFor="city" className="block text-900 font-medium mb-2">City</label>
            <InputText id="city" type="text" placeholder="City" value={personForm.city} onChange={handleInputChange} className="w-full mb-3" />


            {personForm.rol == Role.STUDENT &&
              (<>
                <label htmlFor="levelId" className="block text-900 font-medium mb-2">Level</label>
                <Dropdown id="levelId" value={selectedLevel} onChange={handleLevelDropdownChange} options={[{ name: 'None', value: null }, ...getLevels()]} optionLabel="name"
                  placeholder="Select a Level" className="w-full mb-3" checkmark={true} highlightOnSelect={false} />

                <label htmlFor="courseId" className="block text-900 font-medium mb-2">Course</label>
                <Dropdown id="courseId" value={selectedCourse} onChange={handleCourseDropdownChange} options={[{ name: 'None', value: null }, ...getLevelCourses(selectedLevel?.id as number)]} optionLabel="name"
                  placeholder="Select a Course" className="w-full mb-3" checkmark={true} highlightOnSelect={false} />
                <label htmlFor="companyId" className="block text-900 font-medium mb-2">Company</label>
                <Dropdown id="companyId" value={selectedCompany} onChange={handleCompanyChange} options={[{ name: 'None', value: null }, ...getCompanies()]} optionLabel="name"
                  placeholder="Select a Company" className="w-full mb-3" checkmark={true} highlightOnSelect={false} />

              </>
              )}
            {personForm.rol == Role.TEACHER &&
              (<>
                <label htmlFor="cbu" className="block text-900 font-medium mb-2">CBU / Alias</label>
                <InputText id="cbu" type="text" placeholder="cbu alias" value={personForm.cbu} onChange={handleInputChange} className="w-full mb-3" />

              </>
              )}

            <label htmlFor="email" className="block text-900 font-medium mb-2">Email</label>
            <InputText id="email" type="text" placeholder="Email address" value={personForm.email} onChange={handleInputChange} className="w-full mb-3" />

            <label htmlFor="isActive" className="block text-900 font-medium mb-2">Status</label>
            <InputSwitch id="isActive" checked={personForm.isActive} onChange={handleSwitchChange} />
            <Message
              severity={personForm.isActive ? "success" : "error"}
              text={personForm.isActive ? "Active" : "Inactive"}
            />
            <Button label="Update" icon="pi pi-update" onClick={handleUpdateDetail} className="w-full mt-3" />
          </div>
        </div>
      </div>

    </>
  )
}
