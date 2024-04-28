'use client'

import { useState } from 'react'
import axios from "axios"
import { toast } from "react-hot-toast"
import {useRouter} from 'next/navigation'

export default function Register() {
  const router = useRouter();
  const [data, setData] = useState({
    name:"",
    email:"",
    password: "",
  })

  const registerUser = (e)=>{
    e.preventDefault()
    axios.post('/api/register', data)
    .then((response)=>{
      if(response.status === 200) {
        toast.success('User has been registered!')
      } else {
        toast.error('Something went wrong!')
      }
    })
    .catch((err)=>{
      console.error(err)
      toast.error("Something went really wrong!!")
    })
    // const response = await fetch('/api/register', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify(data)
    // })
    // const userInfo = await response.json()
    // console.log(userInfo)
    // router.push('/login')
  }

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            등록하기
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">

          <form className="space-y-6" onSubmit={registerUser}>
          <div>
              <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                이름
              </label>
              <div className="mt-2">
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  value={data.name}
                  onChange={e => setData({ ...data, name: e.target.value })}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                이메일
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={data.email}
                  onChange={e => setData({...data, email: e.target.value })}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  패스워드
                </label>
                <div className="text-sm">
                  <a href="#" className="font-semibold text-indigo-600/70 hover:text-indigo-500">
                    패스워드 찾기?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={data.password}
                  onChange={e => setData({ ...data, password: e.target.value })}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                등록
              </button>
            </div>
          </form>

          <p className="flex justify-end mt-10 text-sm text-gray-500">
            {/* Not a member?{' '} */}
            <a href="/login" className="font-semibold group leading-6 text-indigo-600/70 hover:text-indigo-500">
              회원 로그인<span className='transition-all group-hover:ms-0.5'>&rarr;</span>
            </a>
          </p>
        </div>
      </div>
    </>
  )
}