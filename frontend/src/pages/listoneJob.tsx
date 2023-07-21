import Profile from '@/components/profile'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
interface post {
	id: string,
	title: string,
	company: string,
	workplaceType: string,
	description:string,
	jobLocation:string,
	jobType:string,
	postedBy:{
	  firstName:string,
	  lastName:string,
	  email:string
	}
  }
function ListoneJob() {
	const [data,setData] = useState<post>()
	const router = useRouter()
	useEffect (()=>{
		findData()
	},[])
	const findData = async () => {
		const res = await fetch(`http://127.0.0.1:1337/job/listone/${router.query.id}`,{
			method: 'GET',
			headers :{
				'Authorization' : `Bearer ${localStorage.getItem('authToken')}`
			}
		})
		const final = await res.json()
		console.log(final);
		setData(final.data)
	}
	console.log(data,'dss');

  return (
	<div>
		<div>
			<div>
				<Profile />
			</div>
		</div>
		<div className=''>
			{
				data &&
				<div className='mt-32 border-2 w-[50vw] p-10 mx-auto'>
					<div className='text-center'>
						<span className='text-4xl'>{data.title}</span>
					</div>
					<div className='mt-10'>
						<p><span>Job Location:</span>{data.jobLocation}</p>
						<p><span>company:</span>{data.company}</p>
						<p><span>jobType:</span>{data.jobType}</p>
					</div>
					<div>
					<div className="text-lg border-2 p-1">Description: <br />{data.description}</div>
						<div className="flex flex-col border-2 p-1">
						<span className="text-lg">postedBy: {data.postedBy.firstName} {data.postedBy.lastName}</span>
						<span className="text-lg">{data.postedBy.email}</span>
						</div>
					</div>
				</div>
			}
		</div>
	</div>
  )
}

export default ListoneJob