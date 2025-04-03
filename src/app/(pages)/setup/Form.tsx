"use client"

import React from 'react'
import { useForm } from 'react-hook-form'
import Label from '../components/Label'
import Input from '../components/Input'
import { useRouter } from 'next/navigation'

interface FormData {
    email: string
    username: string
    password: string
    confirm: string
}

const Form = () => {
    const { handleSubmit, register } = useForm<FormData>();
    const router = useRouter();

    const handler = async (data: FormData) => {
        const pw1 = data.password;
        const pw2 = data.confirm;
        if (pw1 !== pw2) {
            alert("Passwords do not match");
            return;
        }
        const res = await fetch('/api/setup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: data.email,
                username: data.username,
                password: pw1,
            }),
        });

        const json = await res.json();
        if (!res.ok) {
            alert(json.message);
            return;
        }
        alert("User created successfully");
        router.push('/login');
    }

    return (
        <form onSubmit={handleSubmit(handler)} className='flex flex-col max-w-[300px] mx-auto gap-4'>
            <div className='flex flex-col'>
                <Label target='email' text='Email' />
                <Input placeholder='example@mail.com' type='email' {...register("email")} />
            </div>

            <div className='flex flex-col'>
                <Label target='username' text='Username' />
                <Input placeholder='Marc' type='text' {...register("username")} />
            </div>

            <div className='flex flex-col'>
                <Label target='password' text='Password' />
                <Input placeholder='********' type='password' {...register("password")} />
            </div>

            <div className='flex flex-col'>
                <Label target='confirm' text='Confirm Password' />
                <Input placeholder='********' type='password' {...register("confirm")} />
            </div>

            <button type='submit' className='bg-blue-500 text-white px-4 py-2 rounded-md'>Submit</button>
        </form>
    )
}

export default Form