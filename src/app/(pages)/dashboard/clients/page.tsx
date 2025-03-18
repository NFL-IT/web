export const dynamic = 'force-dynamic';

import db from '@/db/index'
import { usersTable } from '@/db/schema';
import { eq } from 'drizzle-orm';
import React from 'react'

const ClientsPage = async () => {
    const clients = await db.query.usersTable.findMany({
        where: eq(usersTable.type, "user"),
    });

    return (
        <>
            <table className="w-full border-collapse text-sm m-0 p-0 h-0">
                <thead>
                    <tr className="border-b h-10 text-lg">
                        <th className="px-3 py-1 text-left">ID</th>
                        <th className="px-3 py-1 text-left">Username</th>
                        <th className="px-3 py-1 text-left">Email</th>
                        <th className="px-3 py-1 text-left">Date</th>
                    </tr>
                </thead>
                <tbody>
                    {clients.map((client) => {
                        const date = new Date(client.created_at);
                        return (
                            <tr key={client.id} className="border-b">
                                <td className="px-3 py-1">{client.id}</td>
                                <td className="px-3 py-1">{client.username}</td>
                                <td className="px-3 py-1">{client.email}</td>
                                <td className="px-3 py-1">{date.toLocaleString("fr-FR")}</td>
                            </tr>

                        )
                    })}
                </tbody>
            </table>
        </>
    );
};

export default ClientsPage;
