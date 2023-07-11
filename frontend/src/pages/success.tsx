import React, { useState } from 'react'
import { Navbar, Text, Link } from "@nextui-org/react";
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
				<Text b color="inherit">
					ACME
				</Text>
				</Navbar.Brand>
				<Navbar.Content
				// enableCursorHighlight
				css={{gap:'50px'}}
				>
				<Navbar.Link href="#" className="hover:opacity-100 opacity-50">
					<button onClick={handleChange} className='border-2 w-32 p-2 rounded-lg bg-sky-100 hover:bg-sky-700'>My post</button>
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
					<div>
						<p className=' text-5xl text-center mt-20'>Posted job successfully</p>
					</div>
				)
			}
		</div>
	</div>
  )
}

export default Success