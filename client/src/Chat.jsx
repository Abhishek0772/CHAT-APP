import React, { useState } from 'react'
import { useEffect } from 'react'
import { AiOutlineSend } from 'react-icons/ai'
import { BiArrowBack } from 'react-icons/bi'
import { CgProfile } from 'react-icons/cg'
import ScrollToBottom from 'react-scroll-to-bottom';
function Chat({ socket, userid, room ,setshowchat , showchat}) {
    const [massage, setmassage] = useState('')
    const [newmassge, setnewmassage] = useState([])


    const handlemsg = async (event) => {
        event.preventDefault()
        if (massage !== '') {
            const msgdata = {
                room: room,
                author: userid,
                cur_massage: massage,
                time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMonth()
            }
            setmassage('')
            console.log(massage)
            await socket.emit("send_massage", msgdata)
            setnewmassage((list) => [...list, msgdata])
        }
    }




    useEffect(() => {
        socket.on("recieve_msg", (data) => {
            // console.log(data)
            setnewmassage((list) => [...list, data])
        })
    }, [socket])


    return (
        <div className='h-screen flex justify-center items-center '>
            <div className='flex flex-col h-[560px] w-[300px]  justify-between shadow-md shadow-slate-400 rounded-t-2xl rounded-b-2xl'>

                <div className='bg-red-600  rounded-t-2xl text-center text-2xl py-6 transform  -z-1  flex justify-between items-center px-4'>
                    <BiArrowBack className='text-white' onClick={()=>setshowchat(!showchat)}/>
                    <p className='text-white font-bold'>
                    {userid}
                    </p>

                    <CgProfile className='text-white text-3xl '/>
                    
                    
                    </div>
                <div className=' z-2 h-full relative flex   justify-start flex-col'>
                    <ScrollToBottom className='massage'>

               
                    {newmassge.map((cur) => {
                        return (
                            <div className={`mt-1 flex  ${userid == cur.author ? 'justify-end rounded-tl-2xl' : 'justify-start'}`} key={cur.room}><span className={`bg-red-500 p-2 m-2 px-2   rounded-br-xl rounded-bl-xl ${userid == cur.author ? 'rounded-tl-xl' : 'rounded-tr-xl'} shadow-md shadow-gray-200`}>
                                {cur.cur_massage}
                            </span>
                               
                            </div>
                        )
                    })}
                    </ScrollToBottom>
                </div>
                <form onSubmit={handlemsg} className='
                shadow-inner shadow-slate-200 py-5  flex justify-center items-center rounded-b-2xl '><input type="text" onChange={(e) => setmassage(e.target.value)} value={massage} className='py-1 px-2   !outline-none' placeholder='Type massage' />
                    <label htmlFor="button"><AiOutlineSend className='text-4xl p-2 bg-red-600 rounded-full text-white hover:bg-white hover:text-red-500 transition delay-300 duration-150' /></label>
                    <button id='button' className='hidden'>send</button>
                </form>

            </div>
        </div>
    )
}

export default Chat