import { Outlet } from "react-router-dom"
import { Suspense } from 'react';
import Loading from "../../components/Loading";

function AdminHome() {



  return (
    <div className="bg-[#F1F1F1]">
      <main className='w-full min-h-screen'>
        <Suspense fallback={<Loading/>}>
            <Outlet/>
        </Suspense>
      </main>
    </div>
  )
}

export default AdminHome
