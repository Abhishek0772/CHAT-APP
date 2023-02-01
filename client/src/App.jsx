import React, { useState } from 'react'
import io from 'socket.io-client'
import Chat from './Chat'
import './App.css'
import {AiFillLock} from 'react-icons/ai'
const socket = io.connect("http://localhost:8000")

function App() {
  const [userid, setuserid] = useState('')
  const [room, setroom] = useState('')
  const [showchat,setshowchat]=useState(false)
  const join = () => {
    if (userid !== "" && room !== '') {

      socket.emit("join_room", room)
      setshowchat(true)
    }
  }
  return (
    <>
    {
      !showchat?
        
        (<div className='h-screen flex justify-center items-center flex-col  gap-3'>
          <div className=' flex justify-center items-center flex-col gap-6 px-8 py-5 shadow-md shadow-slate-400 rounded-md'>
          <AiFillLock className='text-9xl bg-slate-300 p-8 rounded-full text-red-500' />
          <h1 className='text-2xl uppercase'>join chat</h1>
          <input type="text" onChange={(e) => setuserid(e.target.value)} className='!outline-none border-b-[1px] border-black bg-transparent py-1 px-2  bg-opacity-30' placeholder='enter name'/>
          <input type="text" required onChange={(e) => setroom(e.target.value)} className='border-b-[1px] border-black py-1 px-2  bg-transparent !outline-none' placeholder='enter join id ' />
          <button onClick={join} className='shadow-md shadow-gray-400 py-2 px-4 rounded-md bg-red-500 hover:scale-105 delay-150 duration-150'>Join</button>
          </div>
          </div>)

      :
        (<Chat socket={socket} userid={userid} room={room} setshowchat={setshowchat} showchat={showchat}/>)
    
    }
      
    </>
      
    
  )
}

export default App