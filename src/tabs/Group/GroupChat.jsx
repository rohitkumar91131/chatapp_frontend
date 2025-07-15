import React from 'react'
import { useGroup } from './context/GroupContext'

export default function GroupChat() {
  const { groupRoomId } = useGroup()
  return (
    <div className='h-[80dvh] md:h-[90dvh] bg-white shadow-xl rounded-xl overflow-hidden grid grid-rows-[1fr_auto]'>
      <div className='overflow-y-auto p-4 space-y-3 bg-gradient-to-b from-gray-50 to-gray-100'>
        All chats
      </div>
      <div className='flex items-center gap-3 px-4 py-2 border-t'>
        <input
          type='text'
          placeholder='Type a message…'
          className='flex-1 bg-gray-100 rounded-full px-4 py-2 text-sm outline-none'
        />
        <button className='h-10 w-10 flex items-center justify-center bg-green-500 rounded-full active:scale-95 transition'>
          <img src='icons/SendButton.svg' className='h-7 w-7' />
        </button>
      </div>
    </div>
  )
}
