import { Button } from "primereact/button"
import { PersonDetail } from "../PersonDetail"


export const AddButton = () => {

  const handleAddPerson = () => {
    <PersonDetail />
  }

  return (
    <div className="card flex flex-wrap justify-content-end gap-3">
      <Button label="Add" icon="pi pi-plus" onClick={handleAddPerson} />
    </div>
  )
}
