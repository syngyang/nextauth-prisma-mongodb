'use client'

import { useSession } from 'next-auth/react';

const User = () => {
  const {data : session } = useSession();

  return (
    <>
    <div>User - client side Rendering</div>
    <pre>{`by import { SessionProvider} from 'next-auth/react'`}</pre>
    <pre>{`by import { useSession } from 'next-auth/react';`}</pre>
    <h2>{JSON.stringify(session)}</h2>
    {/* <pre>{session}</pre> */}
    </>
  )
}

export default User