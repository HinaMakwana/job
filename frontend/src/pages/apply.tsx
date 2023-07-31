import Profile from "@/components/profile";
import { Card, FormElement, Pagination } from "@nextui-org/react";
import { getCookie } from "cookies-next";
import { useRouter } from "next/router";
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
function Apply() {
  // const token = getCookie('authToken')
  const [currentPage,setCurrentPage] = useState(1)
  const [select,setSelect] = useState<any>('')
  const [data,setData] = useState<any[]>([])
  const [totalPage,setTotalPage] = useState(10)
  const [totalLike,setLike] = useState(0)
  const router = useRouter()

  const handleChange = (e:React.ChangeEvent<FormElement>)=> {
    const {name , value} = e.target as HTMLInputElement ;
    console.log('name',value);
    setSelect(value)
  }
  const searchData = async (e:React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    const search = await fetch(`http://127.0.0.1:1337/job/search?page=${currentPage}`,{
      method: 'POST',
      headers: {
        'Authorization' : `Bearer ${localStorage.getItem('authToken')}`
      },
      body: JSON.stringify({title:select})
    });
    const output = await search.json();
    const final = Math.ceil((output.count) / 4)
    setData(output.data.rows)
    setTotalPage(final)
    setLike(output.likeByUsers)
  }
  const handlePageChange = async (page:number) => {
    setCurrentPage(page)
    if((select.length > 0 )) {
      console.log(select,page,'sdsd');
      let search = await fetch(`http://127.0.0.1:1337/job/search?page=${page}`,{
      method: 'POST',
      headers: {
        'Authorization' : `Bearer ${localStorage.getItem('authToken')}`
      },
      body: JSON.stringify({title:select})
      });
      let content = await search.json()
      let total = Math.ceil((content.count) / 4)
      setTotalPage(total)
      setData(content.data.rows)
    } else {
      let a = await fetch(`http://127.0.0.1:1337/job?page=${page}`,{
        method: 'GET'
      })
      let content = await a.json()
      let total = Math.ceil((content.count) / 4)
      setTotalPage(total)
      setData(content.List)
    }
  };
  useEffect(()=>{
    handlePageChange(1)
  },[])
  return (
    <div>
      <div>
        <Profile />
      </div>
      <div className="flex flex-col">
        <div>
          <div className="mt-5 flex justify-center" id="search">
            <form>
              <label htmlFor="title" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                </div>
                <input onChange={handleChange} type="search" id="title" name="title" className="block w-[54vw] p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search title. . ." required />
                <button onClick={searchData} type="submit" className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
              </div>
            </form>
          </div>
        </div>
        <div>
          <div className="flex gap-3 flex-col items-center mt-5">
          {
            data && data.map((post,index)=> {
              return (
                <Card css={{ mw: "900px" }} isHoverable isPressable onClick={()=>{router.push({pathname:'listOne',query:{id:post.id}})}} key={index}>
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
          <div className="my-5 flex justify-center">
            <Pagination onChange={(page:number)=>{setCurrentPage(page);handlePageChange(page);}} className="w-96" total={totalPage} initialPage={currentPage} />
          </div>
        </div>
      </div>
	  </div>
  )
}

export default Apply