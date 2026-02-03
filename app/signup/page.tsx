"use client";
import { InputGroupInput } from "@/components/ui/input-group";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { AssetContainer } from "@/assets/asset";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { Input } from "@/components/ui/input";
import * as Yup from "yup";
import Link from "next/link";
export default function Signup() {
  const { google } = AssetContainer();

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50 ">
      <div className="   py-24 px-24 w-180  ">
        <div className="flex flex-col items-center gap-y-6">
          <Image src='./Logo.png' alt="Logo" />
          <h1 className="font-semibold text-[32px] text-[#100F14] text-center">
            Create an account
          </h1>
         <div className="gap-x-2.5 pl-5 pt-4.5 pb-4.5 pr-3 border rounded-[10px] w-132 h-16 flex justify-center">
             <h3 className="font-medium text-[16px] text-[#19181F]">
            Create account with Google 
          </h3>
           <Image src={google} alt="google" />
         </div>
           <div className="flex justify-center items-center gap-x-5.5">
            <span className="bg-[#CBCAD7] w-[165.5px] h-[1.5px]"></span>   Or <span className="bg-[#CBCAD7] w-[165.5px] h-[1.5px]"></span>
            </div>
        </div>
          
        <Formik
          initialValues={{ name: "", email: "", password: "" }}
          validationSchema={Yup.object({
            name: Yup.string().required("Name is required!"),
            email: Yup.string().email().required("Email is required!"),
            password: Yup.string().min(5).required("Password is required!"),
          })}
          onSubmit={(values) => console.log(values)}
        >
          <Form className="mt-10 flex flex-col gap-y-6">
            <div>
              <Field name="name" as={Input} placeholder="Enter your name" />
              <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />
            </div>

            <div>
              <Field name="email" as={Input} type="email" placeholder="Enter your email" />
              <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
            </div>

            <div>
              <Field name="password" as={Input} type="password" placeholder="Enter your password" />
              <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
            </div>

            <div className="gap-y-5 flex flex-col"><Button type="submit" className="w-full bg-blue-500">
              Signup
            </Button>
            <p className="font-semibold text-[16px]/[25px] text-center text-[#49475A]">
                Already have an account <Link href="/login" className="text-[#6938EF]">? Login</Link></p></div>
          </Form>
        </Formik>
      </div>
    </div>
  );
}
