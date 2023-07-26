import { Card, Navbar,Pagination,Text } from '@nextui-org/react'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

function People() {
	const [data,setData] = useState<any[]>([])
	const router = useRouter()
	const getAllUsers = async () => {
		let response = await fetch('http://127.0.0.1:1337/list/users',{
			method: 'GET'
		})
		let final = await response.json()
		console.log('final',final.data);
		setData(final.data)
	}
	useEffect(()=>{
		getAllUsers()
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
						css={{
							gap:'10px'
						}}
					>
					<a href="/auth"><button className="hover:bg-slate-400 w-32 h-12 rounded-3xl">Join now</button></a>
					<a href="/signup"><button className="border-2 w-32 h-12 rounded-3xl border-blue-700 text-blue-800 hover:bg-blue-100">Sign in</button></a>
					</Navbar.Content>
				</Navbar>
			</div>
			<div>
                <div className="flex gap-3 flex-wrap mt-10 justify-center">
                {
                  data && data.map((user,index)=> {
                    return (
                      <Card css={{ mw: "550px" }} isHoverable isPressable key={index} onClick={()=>router.push({pathname:'watchProfile',query:{id:user.id}})}>
                        <Card.Body>
                          <div className="flex gap-3 flex-row">
                            <div className="pl-10">
                              <img src='user.svg' className='h-24' />
							  <span className='ml-5'>{ user.moreData && user.moreData.Headline}</span>
                            </div>
                            <div className="flex flex-col">
								<div className='flex flex-row gap-2 text-2xl pl-14'>
									<Text>{user.firstName}</Text>
									<Text>{user.lastName}</Text>
								</div>
								<div className='pl-14 pt-5'>
									<Text>Email: {user.email}</Text>
									<Text>Role: {user.role}</Text>
								</div>
                            </div>
                          </div>
                        </Card.Body>
                      </Card>
                    )
                  })
                }
                </div>
                <div className="my-5 flex justify-center">
                  <Pagination className="w-96"  initialPage={1} total={10}/>
                </div>
              </div>
		</div>
	)
}

export default People