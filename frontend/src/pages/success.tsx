import React, { useState } from 'react'
import { Navbar, Text } from "@nextui-org/react";
import ListJob from '@/components/listJob';

function Success() {
	const [open,setOpen] = useState(false)
	const handleChange = () => {
		setOpen(!open)
	}
  return (
	<div>
		<div>
			<Navbar variant="sticky" className="lg:px-32 md:px-24 sm:px-16">
				<Navbar.Brand
				css={{
					"@xs": {
					w: "12%",
					},
				}}
				>
					<img src="logo.jpg" alt="logo" className="h-16" />
					<Text b color="inherit">
						JobPortal
					</Text>
				</Navbar.Brand>
				<Navbar.Content
				// enableCursorHighlight
				css={{gap:'50px'}}
				>
				<Navbar.Link href="#" className="hover:opacity-100">
					{ open ?
					(
						<button onClick={handleChange} className='border-2 w-32 p-2 rounded-lg bg-sky-100 hover:bg-sky-700'>Back</button>
					) :
					(
						<button onClick={handleChange} className='border-2 w-32 p-2 rounded-lg bg-sky-100 hover:bg-sky-700'>My post</button>
					)
					}
				</Navbar.Link>
				</Navbar.Content>
			</Navbar>
		</div>
		<div>
			{
				open ?
				(
					<div>
						<ListJob />
					</div>
				) :
				(
					<div className='flex flex-col items-center mt-20'>
						<p className=' text-5xl text-center mt-20'>Posted job successfully</p>
						<button className='mt-10 border-2 p-2 rounded-lg hover:bg-cyan-700 hover:scale-110'><a href='post'>Add one more job</a></button>
					</div>
				)
			}
		</div>
	</div>
  )
}

export default Success