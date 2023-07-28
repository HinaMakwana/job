import Profile from '@/components/profile';
import { Card } from '@nextui-org/react'
import { useRouter } from 'next/router';
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
  likedByUsers:any,
  postedBy:{
    firstName:string,
    lastName:string,
    email:string
  }
}
function ListOne() {
	const [post,setPost] = useState<post>();
  const [isFill,setFill] = useState(false);
  const router = useRouter();
  const [value,setValue] = useState('Save');
  const getPost = async () => {
    const search = await fetch(`http://127.0.0.1:1337/job/listone/${router.query.id}`,{
      method: 'GET',
      headers: {
        'Authorization' : `Bearer ${localStorage.getItem('authToken')}`
      }
    })
    const result = await search.json()
    console.log('result',result);
    if(result.totalLike == 1) {
      setFill(true)
    }
    if(result.result == true) {
      setValue('Unsave')
    }
    setPost(result.data )
  }
	const likePost = async () => {
    if(post) {
      let likeUnlike = await fetch(`http://127.0.0.1:1337/like/${post.id}`,{
        method: 'POST',
        headers: {
          Authorization : `Bearer ${localStorage.getItem('authToken')}`
        }
      })
      let final = await likeUnlike.json()
      console.log(final);
    }
  }
	const sendMail = async (postId:string,managerEmail:string) => {
    const apply = await fetch('http://127.0.0.1:1337/apply',{
      method:'POST',
      headers: {
        'Authorization' : `Bearer ${localStorage.getItem('authToken')}`
      },
      body: JSON.stringify({managerEmail:managerEmail,postId:postId})
    })
    if(apply.status==200) {
      toast.success('Apply for job successfully',{
        position: 'top-right'
      })
    } else {
      toast.error('server error',{
        position: 'top-right'
      })
    }
  }
	const saveJob = async (id:string) => {
    let res = await fetch('http://127.0.0.1:1337/save/post',{
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('authToken')}`
      },
      body: JSON.stringify({jobId:id})
    })
    let final = await res.json();
    if(res.status==200) {
      toast.success(final.message,{
        position: 'top-right'
      })
      if(value == 'Save') {
        setValue('Unsave');
      } else {
        setValue('Save');
      }
    } else {
      toast.error('server error',{
        position: 'top-right'
      })
    }
  }
  useEffect(()=>{
    getPost();
  },[])
	return (
    <div>
      <div>
        <Profile />
      </div>
      <div>
        {
          post &&
          <div>
            <div className="text-4xl font-semibold text-center mt-10">Title:{post.title}</div>
            <div className="mt-10 flex justify-center">
              <Card css={{ mw: "700px" }}>
                <Card.Body>
                  <div className="flex flex-row">
                    <div className="flex flex-col">
                      <span className="text-lg">company name: {post.company}</span>
                      <span className="text-lg">Workplace type: {post.workplaceType}</span>
                      <span className="text-lg">Job location: {post.jobLocation}</span>
                    </div>
                    <div className="absolute right-10" onClick={likePost}>
                      <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" onClick={()=>{if(isFill == true){setFill(false)}else{setFill(true)}}} className={`h-5 w-5 stroke-black stroke-2`} style={{fill : (isFill) ? 'blue' : 'white'}} viewBox="0 0 51.997 51.997">
                      <path d="M51.911,16.242C51.152,7.888,45.239,1.827,37.839,1.827c-4.93,0-9.444,2.653-11.984,6.905
                        c-2.517-4.307-6.846-6.906-11.697-6.906c-7.399,0-13.313,6.061-14.071,14.415c-0.06,0.369-0.306,2.311,0.442,5.478
                        c1.078,4.568,3.568,8.723,7.199,12.013l18.115,16.439l18.426-16.438c3.631-3.291,6.121-7.445,7.199-12.014
                        C52.216,18.553,51.97,16.611,51.911,16.242z"/>
                      </svg>
                    </div>
                  </div>
                  <div className="text-lg border-2 p-1 rounded-lg">Description: <br />{post.description}</div>
                  <span>PostedBy:</span>
                  <div className="flex flex-row border-2 p-1 rounded-lg">
                    <img src="user.svg" className="h-10 w-10"/>
                    <div className="flex flex-col ml-5">
                      <span className="text-lg">Name: {post.postedBy.firstName} {post.postedBy.lastName}</span>
                      <span className="text-lg">Email: {post.postedBy.email}</span>
                    </div>
                  </div>
                  <div className="flex gap-3 mt-5">
                    <button className="border-2 w-20 hover:bg-blue-600 p-2 rounded-lg" onClick={()=>{sendMail(post.id,post.postedBy.email)}}>Apply</button>
                    <button className="border-2 w-20 hover:bg-blue-500 p-2 rounded-lg" onClick={()=>saveJob(post.id)}>{value}</button>
                  </div>
                </Card.Body>
              </Card>
            </div>
          </div>
        }
      </div>
    </div>
	)
}

export default ListOne