"use client";
import { AiFillGithub } from 'react-icons/ai'
import {FcGoogle} from "react-icons/fc"
import { useState, useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Button from '@/app/components/Button';

export default function Login() {
  const session = useSession();
  const router = useRouter();
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (session?.status === "authenticated") {
      router.push('/dashboard')
      //router.push("/");
    }
  });

  const loginUser = async (e) => {
    e.preventDefault();
    signIn("credentials", 
          { ...data, redirect: false }
          )
      .then((callback) => {
        if (callback?.error) {
          toast.error(callback.error)
        }

        if (callback?.ok && !callback?.error) {
          toast.success("Logged in successfully!");
        }
      });
  };

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
            로그인
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={loginUser}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                이메일
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={data.email}
                  onChange={(e) => setData({ ...data, email: e.target.value })}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  패스워드
                </label>
                <div className="text-sm">
                  <a
                    href="#"
                    className="font-semibold text-indigo-600/70 hover:text-indigo-500"
                  >
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
                  onChange={(e) =>
                    setData({ ...data, password: e.target.value })
                  }
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                보내기
              </button>
            </div>
          </form>
          <hr />
          <div className='flex flex-col gap-2 pt-4'>
          <Button 
            outline
            label="Continue with Github"
            icon={AiFillGithub}
            onClick={()=>signIn('github')}
          />
          {/* <h1>Sign into Github below</h1>
          <button
            onClick={() => signIn("github")}
            className="bg-black text-white w-full"
          >
            Sign In
          </button> */}
          <Button 
            outline
            label="Continue with Google"
            icon={FcGoogle}
            onClick={()=>signIn('google')}
          />
          {/* <h1>Sign into Google below</h1>
          <button
            onClick={() => signIn("google")}
            className="bg-red-500 text-white w-full"
          >
            Sign In
          </button> */}

          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?{" "}
            <a
              href="#"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Start a 14 day free trial
            </a>
          </p>
          </div>
          
        </div>
      </div>
    </>
  );
}
