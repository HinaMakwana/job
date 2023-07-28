import Profile from '@/components/profile'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

	const deleteData = async () => {
		let deletePost = await fetch('http://127.0.0.1:1337/job/delete',{
			method: 'DELETE',
			headers: {
				Authorization: `Bearer ${localStorage.getItem('authToken')}`
			},
			body: JSON.stringify({jobId: router.query.id})
		})
		if(deletePost.status == 404){
			toast.warning('post not found',{
				position: 'top-right'
			})
		} else if(deletePost.status == 401) {
			toast.error('user unAuthorize',{
				position: 'top-right'
			})
		} else if(deletePost.status == 500) {
			toast.error('Server error',{
				position: 'top-right'
			})
		} else if(deletePost.status == 200) {
			toast.success('Post deleted successfully',{
				position: 'top-right'
			})
			router.push('listJob')
		}
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
				<div className='mt-32 border-2 w-[50vw] p-10 mx-auto rounded-xl'>
					<div className='text-center'>
						<span className='text-4xl'>{data.title}</span>
					</div>
					<div className='mt-10'>
						<p><span className='text-lg font-semibold'>Job Location:</span>{data.jobLocation}</p>
						<p className='mt-2'><span className='text-lg font-semibold'>company:</span>{data.company}</p>
						<p className='mt-2'><span className='text-lg font-semibold'>jobType:</span>{data.jobType}</p>
					</div>
					<div className='mt-5'>
						<div className="text-lg border-2 p-1">Description: <br />
							<p>{data.description}</p>
						</div>
					</div>
					<div className='mt-5 flex gap-5'>
						<button onClick={deleteData} className='border-2 py-2 px-4 rounded-xl hover:bg-blue-400 hover:scale-105'>Delete Post</button>
					</div>
				</div>
			}
		</div>
	</div>
  )
}

export default ListoneJob