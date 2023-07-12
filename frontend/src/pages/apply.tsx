import { Card, FormElement, Input, Pagination } from "@nextui-org/react";
import { Navbar,Text } from '@nextui-org/react'
import { getCookie } from "cookies-next";
import React, { useEffect, useState } from 'react'
interface post {
  id: string,
  title: string,
  company: string,
  workplaceType: string,
  description:string,
  jobLocation:string,
  postedBy:{
    firstName:string,
    lastName:string,
    email:string
  }
}
function Apply() {
  const token = getCookie('authToken')
  const [select,setSelect] = useState({title:''})
  const [data,setData] = useState<any[]>([])
  const [post,setPost] = useState<post>()
  const [totalPage,setTotalPage] = useState(10)
  const handleChange = (e:React.ChangeEvent<FormElement>)=> {
    const {name , value} = e.target as HTMLInputElement ;
        setSelect((preform) => ({
      ...preform ,
      [name] :value,
    }));
    }
  const searchData = async (e:React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    const search = await fetch('http://127.0.0.1:1337/job/search',{
      method: 'POST',
      headers: {
        'Authorization' : `Bearer ${token}`
      },
      body: JSON.stringify(select)
    })
    const output = await search.json()
    console.log(output.data.rows);
    setData(output.data.rows)
  }
  const getPost = async (job:string) => {
    const search = await fetch('http://127.0.0.1:1337/job/listone',{
      method: 'POST',
      headers: {
        'Authorization' : `Bearer ${token}`
      },
      body: JSON.stringify({id:job})
    })
    const result = await search.json()
    console.log('result',result);
    setPost(result.data )
  }
  const sendMail = async (postId:string,managerEmail:string) => {
    const apply = await fetch('http://127.0.0.1:1337/apply',{
      method:'POST',
      headers: {
        'Authorization' : `Bearer ${token}`
      },
      body: JSON.stringify({managerEmail:managerEmail,postId:postId})
    })
  }
  const handlePageChange = async (newPage:any) => {
    const a = await fetch(`http://127.0.0.1:1337/job?page=${newPage}`,{
			method: 'GET'
		})
		const content = await a.json()
    const total = Math.ceil((content.count) / 3)
    setTotalPage(total)
		setData(content.List)
  };
  useEffect(()=>{
    handlePageChange(1)
  },[])
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
            <img src="logo.jpg" alt="logo" className="h-16" />
            <Text b color="inherit">
              JobPortal
            </Text>
          </Navbar.Brand>
          <Navbar.Content
          // enableCursorHighlight
          css={{gap:'50px'}}
          >
          <Navbar.Link href="#" className="hover:opacity-100 opacity-50">
            {/* <button className='border-2 w-32 p-2 rounded-lg bg-sky-100 hover:bg-sky-700'>My post</button> */}
          </Navbar.Link>
          </Navbar.Content>
        </Navbar>
      </div>
        { post ?
          (
            <div>
              <div className="text-4xl font-semibold text-center mt-10">Title:{post.title}</div>
              <div className="mt-10 flex justify-center">
                <Card css={{ mw: "700px" }}>
                  <Card.Body>
                    <div className="flex flex-col">
                      <span className="text-lg">company name: {post.company}</span>
                      <span className="text-lg">Workplace type: {post.workplaceType}</span>
                      <span className="text-lg">Job location: {post.jobLocation}</span>
                    </div>
                    <div className="text-lg border-2 p-1">Description: <br />{post.description}</div>
                    <div className="flex flex-col border-2 p-1">
                      <span className="text-lg">postedBy: {post.postedBy.firstName} {post.postedBy.lastName}</span>
                      <span className="text-lg">{post.postedBy.email}</span>
                    </div>
                    <div>
                      <button className="border-2 p-2 rounded-xl bg-blue-400 mt-5 hover:bg-sky-500 hover:scale-105" onClick={()=>{sendMail(post.id,post.postedBy.email)}} >Apply Now</button>
                    </div>
                  </Card.Body>
                </Card>
              </div>
            </div>
          ) :
          (
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
                      <Card css={{ mw: "900px" }} isHoverable isPressable onClick={()=>{getPost(post.id)}} key={index}>
                        <Card.Body>
                          <div className="flex gap-3 flex-col">
                            <div>
                              <h1>{post.title}</h1>
                            </div>
                            <div className="flex flex-col">
                              <span>Company:{post.company}</span>
                              <span>Location:{post.jobLocation}</span>
                            </div>
                            <div className="flex gap-3">
                              <button className="border-2 w-20 hover:bg-blue-600 p-2 rounded-lg" onClick={()=>{sendMail(post.id,post.postedBy.email)}}>Apply</button>
                              <button className="border-2 w-20 hover:bg-blue-500 p-2 rounded-lg">Save</button>
                            </div>
                          </div>

                        </Card.Body>
                      </Card>
                    )
                  })
                }
                </div>
                <div className="my-5 flex justify-center">
                  <Pagination onChange={handlePageChange} className="w-96" total={totalPage} initialPage={1} />;
                </div>
              </div>
            </div>
          )
        }
	  </div>
  )
}

export default Apply