"use client"

import React from 'react'
import { useForm } from 'react-hook-form'
import Label from '@app/(pages)/login/components/Label'
import Input from '@app/(pages)/login/components/Input'
import Alert from '@app/(pages)/login/components/Alert'
import { useRouter } from 'next/navigation'

interface FormData {
    email: string
    password: string
}

const LoginPage = () => {
    const { register, handleSubmit } = useForm<FormData>();
    const [alert, setAlert] = React.useState<React.ReactNode>();
    const router = useRouter();

    React.useEffect(() => {
        if (alert) {
            setTimeout(() => {
                setAlert(null);
            }, 5000);
        }
    }, [alert])

    const handler = async (data: FormData) => {
        const res = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        const json = await res.json();

        if (!res.ok) {
            setAlert(<Alert message={json.message} />);
            return;
        }

        router.push('/dashboard');
    }

    return (
        <>
            <div className='relative h-24'>
                {alert}
            </div>
            <form onSubmit={handleSubmit(handler)} className='flex flex-col max-w-[300px] mx-auto gap-4'>
                <div className='flex flex-col'>
                    <Label target='email' text='Email' />
                    <Input type='email' placeholder='marc@mail.com' {...register('email', { required: true })} />
                </div>
                <div className='flex flex-col'>
                    <Label target='password' text='Password' />
                    <Input type='password' placeholder='********' {...register('password', { required: true })} />
                </div>
                <button className='bg-[#1f32ff] py-2 rounded-lg mt-6' type='submit'>Login</button>
            </form>
        </>

    )
}

export default LoginPage