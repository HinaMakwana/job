import { Card } from "@nextui-org/react";
import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";

export default function ListJob() {
	const [data,setData] = useState<any[]>([])
	const getData = async () => {
		const token = getCookie('authToken')
		const a = await fetch('http://127.0.0.1:1337/job/list',{
			method: 'GET',
			headers :{
				// 'Content-Type' :'application/json',
				'Authorization' : `Bearer ${token}`
				},
		})
		const content = await a.json()
		console.log(content.List);
		setData(content.List)
		console.log('data',data)
	}
	useEffect(()=>{
		getData()
	},[])
	return (
		<div className="flex gap-3 flex-col items-center mt-5">
			{
				data && data.map((post,index)=> {
					return (
						<Card css={{ mw: "900px" }} isHoverable isPressable>
							<Card.Body>

								<div className="flex gap-3 flex-col">
									<div>
										<h1>{post.title}</h1>
									</div>
									<div className="flex flex-col">
										<span>Company:{post.company}</span>
										<span>Location:{post.jobLocation}</span>
									</div>
									<div>
										<button className="border-2 p-2 rounded-lg">View More details</button>
									</div>
								</div>

							</Card.Body>
						</Card>
					)
				})
			}
		</div>
	)
}