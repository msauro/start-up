import { StatCard } from "./components/StatCard"
import { countActiveCourses, countActivePersonByRole } from "./utils/utils"

export enum Data {
  ACTIVE_STUDENT = 'Active Students',
  ACTIVE_TEACHER = 'Active Teachers',
  ACTIVE_COURSES = 'Active Courses',
  PISTUDENTS = 'pi-graduation-cap text-blue-500 text-xl',
  PITEACHERS = 'pi pi-users text-orange-500 text-xl',
  PICOURSESS = 'pi pi-inbox text-cyan-500 text-xl',
  PIINTERVIEW = 'pi pi-comment text-purple-500 text-xl',
  PICOURSES = 'pi-inbox',
  STUDENT = 'student',
  TEACHER = 'teacher'


}

export const HomeContainer = () => {
  return (
    <>
      <div className="grid p-3">


        <StatCard name={Data.ACTIVE_STUDENT} piIcon={Data.PISTUDENTS} primaryTotal={countActivePersonByRole(Data.STUDENT)} time={'since last month'} secondaryTotal={3} />
        <StatCard name={Data.ACTIVE_TEACHER} piIcon={Data.PITEACHERS} primaryTotal={countActivePersonByRole(Data.TEACHER)} time={'since last year'} secondaryTotal={1} />
        <StatCard name={Data.ACTIVE_COURSES} piIcon={Data.PICOURSESS} primaryTotal={countActiveCourses()} time={'since last year'} secondaryTotal={0} />
        <StatCard name={'Total cursos PRE o ver que estadistica ponemos'} piIcon={Data.PIINTERVIEW} primaryTotal={countActivePersonByRole(Data.TEACHER)} time={'since last year'} secondaryTotal={10} />




      </div>
    </>
  )
}
