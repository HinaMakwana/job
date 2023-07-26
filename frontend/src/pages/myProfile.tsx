import { Card, Navbar, Text } from '@nextui-org/react';
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
interface profileData {
	firstName: string,
	lastName: string,
	email:string,
	role:string,
	likePosts:Array<string>,
	moreData: {
		Headline: string,
		Skill: Array<string>,
	},
	Education:Array<string>
}

function MyProfile() {
	const [profile,setProfile] = useState<profileData>();
	const router = useRouter();
	let findProfile = async () => {
		let result = await fetch(`http://127.0.0.1:1337/user/profile`,{
			method: 'GET',
			headers: {
				Authorization: `Bearer ${localStorage.getItem('authToken')}`
			}
		});
		let finalResult = await result.json()
		console.log(finalResult);
		setProfile(finalResult.user)
	}
	useEffect(()=> {
		findProfile();
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
						<a href="/apply"><button className="hover:bg-slate-400 w-24 h-12 rounded-3xl">Back</button></a>
						<a href="/editProfile"><button className="border-2 w-24 h-12 rounded-3xl border-blue-700 text-blue-800 hover:bg-blue-100">Edit Profile</button></a>
					</Navbar.Content>
				</Navbar>
			</div>
			{
				profile &&
				<div className='flex justify-center mt-10'>
					<Card css={{ mw: "1000px"}}>
						<Card.Body>
							<div className='flex flex-row'>
								<div className=''>
									<img src='user.svg' className='h-24' />
									<Text className='pl-4 mt-2'>{ profile.moreData && profile.moreData.Headline}</Text>
								</div>
								<div className='border-r-2 pl-10'></div>
								<div className='ml-20 mt-8'>
									<div className='flex flex-row gap-2 text-2xl'>
										<Text>{profile.firstName}</Text>
										<Text>{profile.lastName}</Text>
									</div>
									<div className='mt-3'>
										<Text>Email : {profile.email}</Text>
									</div>
								</div>
							</div>
							<div className='mt-5 border-2 p-5'>
								<Text className='text-xl font-bold'>Education</Text>
								{
									(profile.Education.length <= 0) ?
									(
										<div>
											<Text>Not Added</Text>
										</div>
									) :
									(
										profile.Education.map((edu:any,index:number)=> {
											return (
												<div className='flex justify-center'>
													<Card css={{ mw: "500px"}} key={index}>
														<Card.Body>
															<div className='flex gap-5 items-center'>
																<div>
																	<svg version="1.1" viewBox="0 0 122.88 113.05" className='h-6'>
																		<g><path className="st0" d="M0,100.07h14.72V1.57c0-0.86,0.71-1.57,1.57-1.57h49.86c0.86,0,1.57,0.71,1.57,1.57V38.5h44.12 c0.86,0,1.57,0.71,1.57,1.57v59.99h9.47v12.99H0V100.07L0,100.07z M27.32,14.82h10.2c0.31,0,0.57,0.26,0.57,0.57v12.36 c0,0.31-0.26,0.57-0.57,0.57h-10.2c-0.31,0-0.57-0.26-0.57-0.57V15.39C26.75,15.08,27.01,14.82,27.32,14.82L27.32,14.82z M44.6,76.3h10.2c0.31,0,0.57,0.26,0.57,0.57v12.36c0,0.31-0.26,0.57-0.57,0.57H44.6c-0.31,0-0.57-0.26-0.57-0.57V76.87 C44.03,76.55,44.29,76.3,44.6,76.3L44.6,76.3z M27.32,76.3h10.2c0.31,0,0.57,0.26,0.57,0.57v12.36c0,0.31-0.26,0.57-0.57,0.57 h-10.2c-0.31,0-0.57-0.26-0.57-0.57V76.87C26.75,76.55,27.01,76.3,27.32,76.3L27.32,76.3z M44.6,55.8h10.2 c0.31,0,0.57,0.26,0.57,0.57v12.36c0,0.31-0.26,0.57-0.57,0.57H44.6c-0.31,0-0.57-0.26-0.57-0.57V56.38 C44.03,56.06,44.29,55.8,44.6,55.8L44.6,55.8z M27.32,55.8h10.2c0.31,0,0.57,0.26,0.57,0.57v12.36c0,0.31-0.26,0.57-0.57,0.57 h-10.2c-0.31,0-0.57-0.26-0.57-0.57V56.38C26.75,56.06,27.01,55.8,27.32,55.8L27.32,55.8z M44.6,35.31h10.2 c0.31,0,0.57,0.26,0.57,0.57v12.36c0,0.31-0.26,0.57-0.57,0.57H44.6c-0.31,0-0.57-0.26-0.57-0.57V35.88 C44.03,35.57,44.29,35.31,44.6,35.31L44.6,35.31z M27.32,35.31h10.2c0.31,0,0.57,0.26,0.57,0.57v12.36c0,0.31-0.26,0.57-0.57,0.57 h-10.2c-0.31,0-0.57-0.26-0.57-0.57V35.88C26.75,35.57,27.01,35.31,27.32,35.31L27.32,35.31z M44.6,14.82h10.2 c0.31,0,0.57,0.26,0.57,0.57v12.36c0,0.31-0.26,0.57-0.57,0.57H44.6c-0.31,0-0.57-0.26-0.57-0.57V15.39 C44.03,15.08,44.29,14.82,44.6,14.82L44.6,14.82z M23.17,7.32h35.92c0.62,0,1.13,0.61,1.13,1.35v85.87c0,0.74-0.51,1.35-1.13,1.35 H23.17c-0.62,0-1.13-0.61-1.13-1.35V8.67C22.04,7.93,22.55,7.32,23.17,7.32L23.17,7.32z M72.61,53.43h10.2 c0.31,0,0.57,0.26,0.57,0.57v12.36c0,0.31-0.26,0.57-0.57,0.57h-10.2c-0.31,0-0.57-0.26-0.57-0.57V54 C72.04,53.69,72.3,53.43,72.61,53.43L72.61,53.43z M89.89,76.3h10.2c0.31,0,0.57,0.26,0.57,0.57v12.36c0,0.31-0.26,0.57-0.57,0.57 h-10.2c-0.31,0-0.57-0.26-0.57-0.57V76.87C89.32,76.55,89.58,76.3,89.89,76.3L89.89,76.3z M72.61,76.3h10.2 c0.31,0,0.57,0.26,0.57,0.57v12.36c0,0.31-0.26,0.57-0.57,0.57h-10.2c-0.31,0-0.57-0.26-0.57-0.57V76.87 C72.04,76.55,72.3,76.3,72.61,76.3L72.61,76.3z M89.89,53.43h10.2c0.31,0,0.57,0.26,0.57,0.57v12.36c0,0.31-0.26,0.57-0.57,0.57 h-10.2c-0.31,0-0.57-0.26-0.57-0.57V54C89.32,53.69,89.58,53.43,89.89,53.43L89.89,53.43z M68.86,45.82h35.92 c0.62,0,1.13,0.61,1.13,1.35v47.37c0,0.74-0.51,1.35-1.13,1.35H68.86c-0.62,0-1.13-0.61-1.13-1.35V47.17 C67.73,46.43,68.24,45.82,68.86,45.82L68.86,45.82z"/></g>
																	</svg>
																</div>
																<div>
																	<Text>{edu.educationType}</Text>
																	<Text>{edu.instituteName}</Text>
																	<Text>{edu.year}</Text>
																</div>
															</div>
														</Card.Body>
													</Card>
												</div>
											)
										})
									)
								}
							</div>
							<div className='border-2 p-5'>
								<Text className='text-xl font-bold'>Skills</Text>
								{
									profile.moreData ?
									(
										<ul className=' list-disc ml-20'>
											{
												profile.moreData.Skill.map((skill:string,index:number)=> {
													return (
														<li key={index} className='text-lg'>
															{skill}
														</li>
													)
												})
											}
										</ul>
									) :
									(
										<Text>Not Added</Text>
									)
								}
							</div>
							<div className='border-2 p-5'>
								<Text className='text-xl font-bold'>Activity</Text>
								{
									(profile.likePosts.length <= 0) ?
									(
										<Text>No Activity</Text>
									) :
									(
										<div>
											<Text className='ml-16'>Liked Posts By {profile.firstName}:</Text>
											{
												profile.likePosts.map((like:any,index:number)=> {
													return (
														<div className='flex justify-center mt-3'>
															<Card css={{mw:'500px'}}>
																<Card.Body>
																	<div>
																		<Text>Title: {like.title}</Text>
																		<Text>Company: {like.company}</Text>
																		<Text>Location: {like.jobLocation}</Text>
																	</div>
																</Card.Body>
															</Card>
														</div>
													)
												})
											}
										</div>
									)
								}
							</div>
						</Card.Body>
					</Card>
				</div>
			}
		</div>
  )
}

export default MyProfile