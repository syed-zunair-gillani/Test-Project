import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useEffect, useState } from 'react'
import { skillsList } from '@/const/skills'
import { RxCross2 } from 'react-icons/rx';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [skills, setSkills] = useState()
  const [value, setValue] = useState()
  const [selectedSkill, setSelectedList] = useState([])
  const [isExistSkill, setIsExistSkill] = useState()

  const handleChange = (e) => {
    setValue(e.target.value)
    setSkills(skillsList.filter(i => i.skill.toLowerCase().includes(e.target.value)))
  }
  const AddSkill = (item) => {
    const isSkill = selectedSkill.findIndex(i => i.skill === item.skill)
    if (isSkill === -1) {
      setSelectedList([...selectedSkill, item])
      setIsExistSkill({
        state:true,
        text: `${item.skill} Added!`
      })
    } else {
      setIsExistSkill({
        state:true,
        text: `${item.skill} already exist!`
      })
    }

  }
  const RemoveSkill = (item) => {
    const remaningItem = selectedSkill.filter(i => i.skill !== item.skill)
    setSelectedList(remaningItem)
    setIsExistSkill({
      state:true,
      text: `${item.skill} Removed!`
    })
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsExistSkill({
        state:false,
        text: ''
      })
    }, 4000);
    return () => clearTimeout(timer);
  }, [isExistSkill]);

  return (
    <>
      <section className='max-w-[600px] mt-10 w-full mx-auto px-3'>
        <div class="mb-6 relative">
          <input type="text" value={value} onChange={(e) => handleChange(e)} id="default-input" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-0  block w-full p-3" placeholder='Search Skill Here...!' />
          {
            value && <ul className='bg-gray-100  w-full p-5 mt-1 rounded-lg max-h-80 overflow-scroll'>
              {
                skills.length > 0 ? skills?.map((item, idx) => {
                  return (
                    <li key={idx} onClick={() => AddSkill(item)} className={`p-2 border-b-[1px] cursor-pointer ${skills.length === idx + 1 ? 'border-transparent' : ' border-gray-200'}`}>{item?.skill}</li>
                  )
                }) : <li>Result Not Found!</li>
              }
            </ul>
          }

        </div>
        <div>
          <h2 className='font-semibold mb-3 text-xl'>Selected Skills:</h2>
          <ul>
            {
              selectedSkill.map((s, idx) => {
                return (
                  <li key={idx} className='bg-gray-100 p-4 mb-3 rounded-lg flex justify-between items-center'><p>{s.skill} - <span className='text-gray-400 text-sm'>{s.level} </span></p> <RxCross2 className='text-xl cursor-pointer' onClick={() => RemoveSkill(s)} /></li>
                )
              })
            }
          </ul>
        </div>
      </section>

      {/*  Notifaction Toast  */}
      <section className={`absolute transition-all duration-400 ease-in-out top-4 ${isExistSkill?.state ? 'right-4' : '-right-[100%]'} `}>
        <div id="toast-success" class="flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800" role="alert">
          <div class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200">
            <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
            </svg>
            <span class="sr-only">Check icon</span>
          </div>
          <div class="ml-3 text-sm font-normal">{isExistSkill?.text}</div>
          <button type="button" onClick={()=>setIsExistSkill({ state:false, text: ''})} class=" -mx-1.5 -my-1.5 ml-2 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" data-dismiss-target="#toast-success" aria-label="Close">
            <span class="sr-only">Close</span>
            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
            </svg>
          </button>
        </div>
      </section>

    </>
  )
}
