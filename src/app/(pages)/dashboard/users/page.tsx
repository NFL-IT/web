"use client"

import CreateModal from '@/app/components/Modals/UserClient/Create/CreateModal';
import React from 'react'
import Edit from '../components/icons/Edit';
import EditModal from '@/app/components/Modals/UserClient/Edit/EditModal';

interface User {
  id: string;
  username: string;
  email: string;
  type: 'user' | 'admin';
  created_at: number;
}

const UsersPage = () => {
  
  const [users, setUsers] = React.useState<User[]>([]);
  const [editor, setEditor] = React.useState<User | null>(null);

  const makeReq = () => {
    fetch("/api/users", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
      });
  }

  React.useEffect(() => {
    makeReq();
    const interval = setInterval(() => {
      makeReq();
    }
    , 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
    <table className="w-full border-collapse text-sm m-0 p-0 h-0 overflow-y-scroll">
      <thead>
        <tr className="border-b h-10 text-lg">
          <th className="px-3 py-1 text-left">ID</th>
          <th className="px-3 py-1 text-left">Username</th>
          <th className="px-3 py-1 text-left">Email</th>
          <th className="px-3 py-1 text-left">Date</th>
          <th className="px-3 py-1 text-left">Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => {
          const date = new Date(user.created_at);
          return (
          <tr key={user.id} className="border-b">
            <td className="px-3 py-1">{user.id}</td>
            <td className="px-3 py-1">{user.username}</td>
            <td className="px-3 py-1">{user.email}</td>
            <td className="px-3 py-1">{date.toLocaleString("fr-FR")}</td>
            <td className="px-3 py-1 flex gap-2">
                <Edit click={() => setEditor({ ...user, type: 'admin' })} />
            </td>
          </tr>
  )})}
      </tbody>
    </table>
    <CreateModal />
    {editor && <EditModal data={editor} setClose={() => setEditor(null)} />}
    </>
  );
};

export default UsersPage;
