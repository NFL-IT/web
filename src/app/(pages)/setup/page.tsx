"use client"

import React from 'react'
import Form from './Form'
import { useRouter } from 'next/navigation'

const SetupPage = () => {
    const router = useRouter();
    const [verified, setVerified] = React.useState(false);

    (async () => {
        const res = await fetch('/api/setup', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (res.status !== 200) {
            return router.push('/login');
        } else {
            setVerified(true);
        }
    })()
  return verified && (
    <Form />
  )
}

export default SetupPage