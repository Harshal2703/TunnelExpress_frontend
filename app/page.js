"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation";




export default function Home() {
  const router = useRouter();
  useEffect(() => {
    fetch("/api/getApiKey").then(response => {
      if (response.status === 200) {
        response.json().then(data => {
          set_client_api_key(data["api_key"])
          set_client_name(data["name"])
          set_client_picture(data["picture"])
        })
      } else {
        router.push("/signin")
      }
    })
    return () => { }
  }, [])


  const [client_api_key, set_client_api_key] = useState("")
  const [client_name, set_client_name] = useState("")
  const [client_picture, set_client_picture] = useState("")
  const [copy_status, set_copy_status] = useState("copy to clipboard")

  const handleDownload = () => {
    const url = '/TunnelExpress_Client.exe';
    const link = document.createElement('a');
    link.href = url;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };


  const copyToClipboard = async () => {
    set_copy_status("copied")
    await navigator.clipboard.writeText(client_api_key);
    setTimeout(() => {
      set_copy_status("copy to clipboard")
    }, 1500);
  };




  return (
    <main className="">
      <div className=" flex flex-wrap justify-between">
        <h1 className="text-slate-200 font-bold text-3xl my-4 text-center m-auto md:m-7 md:text-left md:text-7xl ">TunnelExpress</h1>
        <div className=" flex md:m-7 space-x-3">
          <img src={client_picture} className=" rounded-full w-14 h-14 md:m-auto mt-2 mr-2"/>
          <span className="hidden md:inline-block m-auto font-bold text-xl">{client_name}</span>
        </div>
      </div>
      <div className=" space-x-2 m-7 flex flex-wrap ">
        <span className=' md:bg-slate-200 md:text-black px-2 py-1 md:px-3 md:py-2 rounded-full font-bold'>client api key : {client_api_key}</span>
        <button onClick={copyToClipboard} className='hover:scale-105 hover:bg-slate-200 bg-slate-200 text-black px-3 py-1 rounded-full font-bold '>{copy_status}</button>
      </div>
      <div className="mx-7 my-3 flex flex-wrap space-x-2">
        <span className='text-white rounded-full font-bold md:text-3xl px-2'>Download : TunnelExpress_Client.exe</span>
        <button onClick={handleDownload} className='hover:scale-105 hover:bg-slate-200 bg-slate-200 text-black px-3 py-1 rounded-full font-bold '>Download for Windows</button>
      </div>
      <div className="mx-7 my-3 p-2 flex flex-col">
        <h1 className=" md:text-3xl font-bold mb-3 text-lg text-wrap">About TunnelExpress</h1>
        <span>
          TunnelExpress is an application which allows you to host any service on your local machine and through tunneling you can access your hosted service through internet.
          Using this you can easily host any applications like Express.js , Flask , Next.js , etc.
          In current version it does not support websockets.
          If you want two way communication similar to websockets you can use long polling library <a target="_blank" className="underline text-blue-400 text-wrap" href="https://github.com/Harshal2703/RealTimeDataBridge">RealTimeDataBridge.</a>
        </span>
      </div>
      <div className="mx-7 my-3 p-2 flex flex-col space-y-1">
        <h1 className=" md:text-3xl font-bold mb-1 md:mb-3 text-lg ">How to use?</h1>
        <span>1 : Download TunnelExpress_Client.exe on your local machine.</span>
        <span>2 : Run it, then enter your client api key to verify.</span>
        <span>3 : Then enter the ports you want to expose (tunnel).</span>
        <span>4 : For each port you will get a unique link using that you can access your service through internet.</span>
      </div>
    </main>
  );
}
