import Profile from '@/components/profile';
import { Card } from '@nextui-org/react'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
interface post {
	savedPosts : Array<string>
}
function SavedPost() {
	const [data,setData] = useState<post>();
	const router = useRouter();
	let listPosts = async () => {
		let res = await fetch('http://127.0.0.1:1337/list',{
			method: 'GET',
			headers: {
				Authorization : `Bearer ${localStorage.getItem('authToken')}`
			}
		})
		let final = await res.json()
		console.log(final);
		setData(final.data)
	}
	console.log(data,'jk');

	useEffect(()=> {
		listPosts();
	},[])
	return (
		<div>
			<div>
				<Profile />
			</div>
			{
				(data && data.savedPosts.length > 0) ?
				(
					<div>
						<div className="flex gap-3 flex-col items-center mt-5">
							{
								data && data.savedPosts.map((post:any,index:number)=> {
									return (
										<Card css={{ mw: "900px" }} isHoverable isPressable onClick={()=>{router.push({pathname:'listOne',query: {id:post.id}})}} key={index}>
											<Card.Body>
												<div className="flex gap-3 flex-col">
													<div className="">
														<h1>{post.title}</h1>
													</div>
													<div className="flex flex-col">
														<span>Company:{post.company}</span>
														<span>Location:{post.jobLocation}</span>
													</div>
												</div>
											</Card.Body>
										</Card>
									)
								})
						}
						</div>
					</div>
				) :
				(
					<div className='flex justify-center mt-20'>
						<p className=' text-4xl font-medium'>Not Saved anything</p>
					</div>
				)
			}
		</div>
	)
}

export default SavedPost