"use client";

import Link from "next/link";

// import { useActionState } from 'react';
// import { authenticate } from '@/app/lib/actions';

export default function SignInForm() {
  return (
    <main className="flex items-center justify-center  p-4">
      <div className=" min-w-lg lg:max-w-3xl">
        <form action="#" className="mt-8 grid w-full  gap-6">
          <div className="col-span-10">
            <label
              htmlFor="Email"
              className="block text-sm font-medium text-gray-700"
            >
              {" "}
              Email{" "}
            </label>
            <input
              type="email"
              id="Email"
              name="email"
              className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
            />
          </div>
          <div className="col-span-10">
            <label
              htmlFor="Password"
              className="block text-sm font-medium text-gray-700"
            >
              {" "}
              Password{" "}
            </label>
            <input
              type="password"
              id="Password"
              name="password"
              className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
            />
          </div>
          <div className="col-span-6"></div>
          <div className="col-span-10 sm:flex sm:items-center sm:gap-4">
            <button className=" inline-block w-full rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500">
              login
            </button>            
          </div>
          
        </form>
        <div className="mt-6 text-center text-sm text-gray-500">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="font-medium text-gray-700 hover:underline">
            Sign up
          </Link>
        </div>
      </div>
    </main>
  );
}
