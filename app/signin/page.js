"use client"

import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';
import { useRouter } from "next/navigation";


export default function SignIn() {
    const router = useRouter();
    const verifyUser = async (token) => {
        const payload = { token }
        const response = await fetch("/api/verifyUser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        })
        if (response.status === 200) {
            const data = await response.json()
            router.push("/")
        }
    }
    return (
        <main className=' flex flex-col m-2 md:m-7 space-y-10 p-2'>
            <h1 className='text-4xl text-center md:text-left md:text-7xl font-bold text-slate-200'>TunnelExpress</h1>
            <div className="flex flex-col">
                <h1 className=" md:text-3xl font-bold mb-3 text-lg text-wrap">About TunnelExpress</h1>
                <span>
                    TunnelExpress is an application which allows you to host any service on your local machine and through tunneling you can access your hosted service through internet.
                    Using this you can easily host any applications like Express.js , Flask , Next.js , etc.
                    In current version it does not support websockets.
                    If you want two way communication similar to websockets you can use long polling library <a target="_blank" className="underline text-blue-400 text-wrap" href="https://github.com/Harshal2703/RealTimeDataBridge">RealTimeDataBridge.</a>
                </span>
            </div>
            <GoogleOAuthProvider clientId={process.env.GoogleAuthClientID}>
                <GoogleLogin
                    onSuccess={credentialResponse => {
                        verifyUser(credentialResponse)
                    }}
                    onError={() => {
                        console.log('Login Failed')
                    }}
                    useOneTap
                />
            </GoogleOAuthProvider>
        </main>
    )
}
