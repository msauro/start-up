import { Tag } from "primereact/tag"
import { Role } from "../models/Person"
import { Button } from "primereact/button"
import { InputText } from "primereact/inputtext"
import { Calendar } from "primereact/calendar"
import { InputNumber } from "primereact/inputnumber"
import { InputSwitch } from "primereact/inputswitch"
import { Message } from "primereact/message"
import { Dropdown } from "primereact/dropdown"

export const PersonDetailForm = () => {

    return (
        <>
            <div className="card flex flex-wrap justify-content-start gap-3">
                <Button label="Back" icon="pi pi-arrow-left" onClick={handleBackClick} />
            </div>
            <div className="flex align-items-center justify-content-center">
                <div className="surface-card p-4 shadow-2 border-round w-full lg:w-6">
                    <div className="text-center mb-5">

                        {!personForm.courseId && personForm.rol == Role.STUDENT && <Tag severity="info" value="Sin curso"></Tag>}

                        <div className="text-900 text-3xl font-medium mb-3">Edit {personForm.rol}</div>
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
