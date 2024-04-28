'use client'
import {useSession,signOut} from 'next-auth/react'


const DashboardPage = () => {
  const {data: session} = useSession();

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Hi, {session?.user?.name}</p>
      <button onClick={()=> signOut()} className='bg-green-600 rounded-lg mt-10 text-neutral-50 px-4 py-2'>
         Sign Out
      </button>
    </div>
  )
}

export default DashboardPage