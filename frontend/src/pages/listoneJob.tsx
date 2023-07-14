import { getCookie } from 'cookies-next'
import { useRouter } from 'next/router'
import React, { useState } from 'react'

function ListoneJob(postId:any) {
	const [data,setData] = useState<any[]>([])
	const token = getCookie('authToken')
	const router = useRouter()
	const findData = async () => {

		const{ query : {id}} = router
		const props = {id}
		const res = await fetch(`http://127.0.0.1:1337/job/listone`,{
			method: 'POST',
			headers :{
				'Authorization' : `Bearer ${token}`
			},
			body: JSON.stringify({id:props.id})
		})
		const final = await res.json()
		console.log(final);
	}
  return (
	<div>
		<button onClick={findData}>fdfdf</button>
	</div>
  )
}

export default ListoneJob