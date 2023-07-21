import { Card } from "@nextui-org/react";
import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { type } from "os";
import Profile from "@/components/profile";

export default function ListJob() {
	const [data,setData] = useState<any[]>([])
	const router = useRouter()
	// const token = getCookie('authToken')

	const getData = async () => {
		const a = await fetch('http://127.0.0.1:1337/job/list',{
			method: 'GET',
			headers :{
				'Authorization' : `Bearer ${localStorage.getItem('authToken')}`
			},
		})
		const content = await a.json()
		setData(content.List)
		console.log('data',data)
	}
	const sendId = async (id:any) => {
		router.push({
			pathname: '/listoneJob',
			query : {
				id
			}
		})
	}
	useEffect(()=>{
		getData()
	},[])
	return (
		<div>
			<div>
				<Profile />
			</div>
			<div className="flex gap-3 flex-col items-center mt-5">
				{
					data && data.map((post,index)=> {

						return (
							<Card css={{ mw: "900px" }} isHoverable isPressable>
								<Card.Body>

									<div key={index} className="flex gap-3 flex-col">
										<div>
											<h1>{post.title}</h1>
										</div>
										<div className="flex flex-col">
											<span>Company:{post.company}</span>
											<span>Location:{post.jobLocation}</span>
										</div>
										<div>
											<button onClick={()=> {sendId(post.id)}} className="border-2 p-2 rounded-lg hover:bg-cyan-700 hover:scale-110">View More details</button>
										</div>
									</div>

								</Card.Body>
							</Card>
						)
					})
				}
			</div>
		</div>
	)
}