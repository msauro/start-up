import { StatCard } from "./components/StatCard"

export enum Data {
  STUDENT = 'Students',
  TEACHER = 'Teachers',
  PISTUDENTS = 'pi-graduation-cap',
  PITEACHERS = 'pi-users',
  PICOURSES = 'pi-inbox',


}

export const HomeContainer = () => {
  return (
    <>
      <div className="grid p-3">


        <StatCard name={Data.STUDENT} piIcon={Data.PISTUDENTS} total={8} time={'since last month'} totalNew={3} />


        <div className="col-12 md:col-6 lg:col-3">
          <div className="surface-0 shadow-2 p-3 border-1 border-50 border-round">
            <div className="flex justify-content-between mb-3">
              <div>
                <span className="block text-500 font-medium mb-3">Teachers</span>
                <div className="text-900 font-medium text-xl">3</div>
              </div>
              <div className="flex align-items-center justify-content-center bg-orange-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                <i className="pi pi-users text-orange-500 text-xl"></i>
              </div>
            </div>
            <span className="text-green-500 font-medium">%52+ </span>
            <span className="text-500">since last week</span>
          </div>
        </div>
        <div className="col-12 md:col-6 lg:col-3">
          <div className="surface-0 shadow-2 p-3 border-1 border-50 border-round">
            <div className="flex justify-content-between mb-3">
              <div>
                <span className="block text-500 font-medium mb-3">Courses</span>
                <div className="text-900 font-medium text-xl">21</div>
              </div>
              <div className="flex align-items-center justify-content-center bg-cyan-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                <i className="pi pi-inbox text-cyan-500 text-xl"></i>
              </div>
            </div>
            <span className="text-green-500 font-medium">2  </span>
            <span className="text-500">newly added</span>
          </div>
        </div>
        <div className="col-12 md:col-6 lg:col-3">
          <div className="surface-0 shadow-2 p-3 border-1 border-50 border-round">
            <div className="flex justify-content-between mb-3">
              <div>
                <span className="block text-500 font-medium mb-3">Interview</span>
                <div className="text-900 font-medium text-xl">52 </div>
              </div>
              <div className="flex align-items-center justify-content-center bg-purple-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                <i className="pi pi-comment text-purple-500 text-xl"></i>
              </div>
            </div>
            <span className="text-green-500 font-medium">5 </span>
            <span className="text-500">last week</span>
          </div>
        </div>
      </div>
    </>
  )
}
