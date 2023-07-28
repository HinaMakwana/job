import { Card } from '@nextui-org/react'
import React, { useEffect, useState } from 'react'
interface post {
	savedPosts : Array<string>
}
function SavedPost() {
	const [data,setData] = useState<post>()
	const [totalLike,setLike] = useState(0)

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
			{
				data &&
				<div>
					<div className="flex gap-3 flex-col items-center mt-5">
						{
							data && data.savedPosts.map((post:any,index:number)=> {
								return (
									<Card css={{ mw: "900px" }} isHoverable isPressable onClick={()=>{}} key={index}>
										<Card.Body>
											<div className="flex gap-3 flex-col">
												<div className="">
													<h1>{post.title}</h1>
													<div className="flex absolute right-9">
														<img src="like.svg" className="h-4 mt-1 mr-1" />
														<span className="">{(totalLike) ? (totalLike) : post.likeByUsers}</span>
													</div>
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
			}
		</div>
	)
}

export default SavedPost