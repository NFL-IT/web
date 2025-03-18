"use client"

import React from 'react'
import SampleModal from '@/app/components/Modals/Sample'

interface User {
    id: string;
    username: string;
    email: string;
    type: "admin" | "user";
}

const EditModal = ({ data, setClose }: { data: User | null, setClose: React.Dispatch<React.SetStateAction<User | null>> }) => {

    if (!data) return null;

    const [newUsername, setNewUsername] = React.useState(data.username);
    const [newEmail, setNewEmail] = React.useState(data.email);
    const [newPassword, setNewPassword] = React.useState('');
    const [newType, setNewType] = React.useState<"admin" | "user">(data.type);

    const editUser = async () => {

        const res = await fetch('/api/user/update', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: data.id,
                username: newUsername,
                email: newEmail,
                password: newPassword,
                type: newType
            })
        })

        if (res.ok) {
            setClose(null);
        } else {
            alert('Error updating user/client')
        }
    }

    return (
        <SampleModal>
            <h1 className='text-2xl font-bold text-black text-center'>Edit User/Client</h1>
            <p className='text-gray-500'>This is a edit modal</p>

            <div className='flex flex-col gap-4 max-w-[90%] lg:min-w-[400px] mx-auto'>
                <div className='flex flex-col gap-1'>
                    <label htmlFor='username'>New Username</label>
                    <input className='border-[1px] border-black text-black rounded-md p-2' type='text' name='username' id='username' value={newUsername} onChange={(e) => setNewUsername(e.target.value)} />
                </div>
                <div className='flex flex-col gap-1'>
                    <label htmlFor='email'>New Email</label>
                    <input className='border-[1px] border-black text-black rounded-md p-2' type='email' name='email' id='email' value={newEmail} onChange={(e) => setNewEmail(e.target.value)} />
                </div>
                <div className='flex flex-col gap-1'>
                    <label htmlFor='password'>New Password</label>
                    <input className='border-[1px] border-black text-black rounded-md p-2' type='password' name='password' id='password' value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                </div>
                <div className='flex flex-wrap gap-2 justify-center'>
                    <button className={`px-3 py-2 rounded-lg border-[1px] ${newType === 'admin' ? "bg-green-700 text-white border-green-300" : 'bg-white text-black border-slate-500'}`} onClick={() => setNewType('admin')}>Administrator</button>
                    <button className={`px-3 py-2 rounded-lg border-[1px] ${newType === 'user' ? "bg-green-700 text-white border-green-300" : 'bg-white text-black border-slate-500'}`} onClick={() => setNewType('user')}>Client</button>
                </div>
                <div className='flex justify-center flex-wrap gap-4'>
                    <button onClick={() => editUser()} className='bg-blue-700 text-white px-3 py-2 rounded-lg'>Edit</button>
                    <button onClick={() => setClose(null)} className='bg-red-700 text-white px-3 py-2 rounded-lg'>Cancel</button>
                </div>
            </div>
        </SampleModal>

    )
}

export default EditModal