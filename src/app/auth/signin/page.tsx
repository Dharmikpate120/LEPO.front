"use client"
import {  signOut } from "next-auth/react";
import { LoginForm } from "@/components/login-form";

export default function page() {

  return (
<>
 <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
<form action={async ()=>{
  // "use server"
  await signOut()
}}>

<button type="submit">
      Sign out
    </button>
</form>
</>
  );
}