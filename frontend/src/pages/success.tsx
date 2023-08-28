import React, { useState } from 'react'
import { Dropdown, Navbar, Text } from "@nextui-org/react";
import ListJob from '@/pages/listJob';
import { useRouter } from 'next/router';
import Profile from '@/components/profile';

function Success() {
	const router = useRouter()
	const [open,setOpen] = useState(false)
  return (
	<div>
		<div>
			<Profile />
		</div>
		<div>
				<div className='flex flex-col items-center mt-20'>
					<p className=' text-5xl text-center mt-20'>Posted job successfully</p>
					<button className='mt-10 border-2 p-2 rounded-lg hover:bg-cyan-700 hover:scale-110'><a href='post'>Add one more job</a></button>
				</div>
		</div>
	</div>
  )
}

export default Success