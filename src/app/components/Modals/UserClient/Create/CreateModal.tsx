"use client"

import React from 'react'
import SampleModal from '@/app/components/Modals/Sample'

const CreateModal = () => {

    const [isOpen, setOpen] = React.useState(false);

    const [username, setUsername] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [type, setType] = React.useState<"admin" | "user">('user');

    const createUser = async () => {
        const res = await fetch('/api/user/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username,
                email,
                password,
                type
            })
        })

        if (res.ok) {
            setOpen(false);
        } else {
            alert('Error creating user/client')
        }
    }

    return (
        <>
            {isOpen && (
                <SampleModal>
                    <h1 className='text-2xl font-bold text-black text-center'>Create User/Client</h1>
                    <p className='text-gray-500'>This is a create modal</p>

                    <div className='flex flex-col gap-4 max-w-[90%] lg:min-w-[400px] mx-auto'>
                        <div className='flex flex-col gap-1'>
                            <label htmlFor='username'>Username</label>
                            <input className='border-[1px] border-black text-black rounded-md p-2' type='text' name='username' id='username' value={username} onChange={(e) => setUsername(e.target.value)} />
                        </div>
                        <div className='flex flex-col gap-1'>
                            <label htmlFor='email'>Email</label>
                            <input className='border-[1px] border-black text-black rounded-md p-2' type='email' name='email' id='email' value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className='flex flex-col gap-1'>
                            <label htmlFor='password'>Password</label>
                            <input className='border-[1px] border-black text-black rounded-md p-2' type='password' name='password' id='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <div className='flex flex-wrap gap-2 justify-center'>
                            <button className={`px-3 py-2 rounded-lg border-[1px] ${type === 'admin' ? "bg-green-700 text-white border-green-300" : 'bg-white text-black border-slate-500'}`} onClick={() => setType('admin')}>Administrator</button>
                            <button className={`px-3 py-2 rounded-lg border-[1px] ${type === 'user' ? "bg-green-700 text-white border-green-300" : 'bg-white text-black border-slate-500'}`} onClick={() => setType('user')}>Client</button>
                        </div>
                        <div className='flex justify-center flex-wrap gap-4'>
                            <button onClick={() => createUser()} className='bg-blue-700 text-white px-3 py-2 rounded-lg'>Create</button>
                            <button onClick={() => setOpen(false)} className='bg-red-700 text-white px-3 py-2 rounded-lg'>Cancel</button>
                        </div>
                    </div>
                </SampleModal>
            )}

            <button className='absolute bottom-4 right-4 bg-blue-700 text-white px-3 py-2 rounded-lg'
                onClick={() => setOpen(true)}>Create User/Client</button>
        </>

    )
}

export default CreateModal