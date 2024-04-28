import Container from './components/Container'
import {getServerSession} from 'next-auth'
import  {authOptions } from './api/auth/[...nextauth]/route'
import User from './components/User'

export default async function Home() {
  const session = await getServerSession(authOptions)
  return (
    <Container>
      <section className='p-2'>
        <h1>Home</h1>
        <h2>Server Side Rendering</h2>
        <pre>{`by import {getServerSession} from 'next-auth'`}</pre>
        <pre>{JSON.stringify(session,null, 2)}</pre>
      <User />
    </section>
    </Container>
    
  )
}
