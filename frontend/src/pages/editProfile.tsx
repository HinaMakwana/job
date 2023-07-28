import { Button, FormElement, Modal, Navbar,Text } from '@nextui-org/react'
import React, { ChangeEvent, useEffect, useState } from 'react'
import Select from "react-select";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface profileData {
	id: string,
	firstName: string,
	lastName: string,
	email:string,
	role:string,
	likePosts:Array<string>,
	moreData: {
		Headline: string,
		Skill: Array<string>,
		Location: string,
	},
	Education:Array<string>
}
interface type {
	value: string
	label:string
}
interface edu {
	educationType: string,
	grade: string,
	year: string,
	instituteName: string
}
const options:type[] = [
	{value: "SSC (10th)",label: "SSC (10th)"},
	{value: "HSC (12th)",label: "HSC (12th)"},
{value: "degree",label: "degree"}
];
function EditProfile() {
	const [value,setValue] = useState<any>()
	const [profile,setProfile] = useState<profileData>();
	const [selectedOption, setSelectedOption] = useState<type>();
	const [display,setDisplay] = useState(false);
	const [skillEdit,setSkill] = useState('');
	const [form, setForm] = useState({ instituteName : '',grade : '',year: '',degreeName: null})
	const [edu,setEdu] = useState<edu>()

	const closeHandler = () => {
		setDisplay(false);
	};
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
	const handleSelectChange = (selectedOption:any) => {
		setSelectedOption(selectedOption);
	};
	const handleChange = (e: ChangeEvent<FormElement>) => {
		const { name, value } = e.target;
		setSkill(value)
	}
	const handleForm = (e: ChangeEvent<FormElement>) => {
		const { name, value } = e.target;
		setForm((preform) => ({
		  ...preform,
		  [name]: value,
		}));
	};
	const addEducation = async () => {
		console.log(selectedOption);

		if(selectedOption) {
			let res = await fetch('http://127.0.0.1:1337/add/education',{
				method: 'POST',
				headers: {
					Authorization: `Barear ${localStorage.getItem('authToken')}`
				},
				body: JSON.stringify({...form,educationType: selectedOption.value })
			})
			let final = await res.json();
			console.log(final);
			setEdu(final.data)
			if(final.status == 400) {
				toast.warning('entered year is not valid',{
					position: 'top-right'
				})
			} else if(final.status == 409) {
				toast.warning('Education already added',{
					position: 'top-right'
				})
			} else if(final.status == 401) {
				toast.error('unauthorized',{
					position: 'top-right'
				})

			} else if(final.status == 500) {
				toast.error('Server error',{
					position: 'top-right'
				})
			} else if(final.status == 201) {
				toast.success('Added successfully	',{
					position: 'top-right'
				})
			} else if(final.status == 403) {
				toast.error('validation error',{
					position: 'top-right'
				})
			}
		} else {
			alert('select eductionType first');
		}
	};
	const handleImgChange = (e:ChangeEvent) => {
    let target = e.target as HTMLInputElement
		let files = target.files;
		if (!files || !files.length) {
			alert("Please select a file!");
		} else {
			let file = files[0]
			setValue(file)
		}
	};
	const submitData = async (e:any) => {
		e.preventDefault();
		const formData = new FormData();
		formData.append('image',value);
		let a = await fetch('http://127.0.0.1:1337/uploadImage',{
			method:'POST',
			headers: {
				Authorization : `Bearer ${localStorage.getItem('authToken')}`,
			},
			body: formData
		})
		console.log(await a.json());
		if(a.status == 400) {
			toast.warning('Image format is invalid',{
				position: 'top-right'
			})
		} else if(a.status == 500) {
			toast.error('Server error',{
				position: 'top-right'
			})
		} else if(a.status == 200) {
			toast.success('profile photo updated',{
				position: 'top-right'
			})
		}
	}
	const deleteData = async () => {
		let a = await fetch('http://127.0.0.1:1337/removePhoto',{
			method:'PATCH',
			headers: {
				Authorization : `Bearer ${localStorage.getItem('authToken')}`,
			}
		})
		if(a.status == 500) {
			toast.error('Server error',{
				position: 'top-right'
			})
		} else if(a.status == 200) {
			toast.success('Profile photo is removed',{
				position: 'top-right'
			})
		} else if(a.status == 400) {
			toast.error('Profile photo is already deleted',{
				position: 'top-right'
			})
		}
	}
	useEffect(()=> {
		findProfile()
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
						<a href="/myProfile"><button className="hover:bg-slate-400 hover:border-slate-400 w-24 h-12 rounded-3xl border-2 border-black">Back</button></a>
					</Navbar.Content>
				</Navbar>
			</div>
			<div className='flex flex-col bg-gradient-to-tl from-slate-400 via-slate-500 to-slate-600'>
				<div className='border-2 mt-10 mx-20 p-10 bg-white rounded-xl '>
					<div>
						<Text className='text-xl font-bold'>Edit Details</Text>
					</div>
					<div className='mt-5 grid grid-cols-4 gap-7'>
						<div>
							<label htmlFor='firstName' className=''>FirstName</label><br />
							<input type='text' name='firstName' id='firstName' required placeholder={profile && profile.firstName} className=' border-b-2 rounded-lg mt-1' />
						</div>
						<div className=''>
							<label htmlFor='lastName' className=''>LastName</label><br />
							<input name='lastName' type='text' id='lastName' required placeholder={profile && profile.lastName} className=' border-b-2 rounded-lg mt-1' />
						</div>
						<div className=''>
							<label htmlFor='Headline' className=''>HeadLine</label><br />
							<input name='Headline' type='text' id='Headline' required placeholder={profile?.moreData ? profile.moreData.Headline : 'Eg. Student'} className=' border-b-2 rounded-lg mt-1' />
						</div>
						<div className=''>
							<label htmlFor='Location' className=''>Location</label><br />
							<input name='Location' type='text' id='Location' required placeholder={profile?.moreData ? profile.moreData.Location : 'Eg. Gandhinagar'} className=' border-b-2 rounded-lg mt-1' />
						</div>
					</div>
					<div className='mt-5'>
						<button className='border-2 px-9 py-2 rounded-xl bg-blue-500 hover:bg-blue-700'>Save</button>
					</div>
				</div>
				<div className='border-2 mt-5 mx-20 p-10 bg-white rounded-xl '>
					<div>
						<Text className='text-xl font-bold'>Edit Education</Text>
					</div>
					{
						profile && (profile.Education.length > 0) ?
						(
							profile.Education.map((edu:any)=> {
								return (
									<div className='mt-5 grid grid-cols-4 gap-14'>
										<div className=''>
											<label>Education Type</label>
											<input disabled type='text' value={edu.educationType} className='mt-1 border-b-2 rounded-lg' />
										</div>
										<div>
											<label htmlFor='instituteName' className=''>University Name</label>
											<input name='instituteName' type='text' onChange={handleForm} id='instituteName' placeholder={edu.instituteName} required className='mt-1 border-b-2 rounded-lg' />
										</div>
										<div>
											<label htmlFor='year' className=''>Passing Year</label><br />
											<input name='year' onChange={handleForm} type='number' id='year' placeholder={edu.year} required className=' mt-1 border-b-2 rounded-lg' />
										</div>
										<div>
											<label htmlFor='grade' className=''>Grade/Percentage/Percentile</label><br />
											<input name='grade' onChange={handleForm} type='text' id='grade' placeholder={edu.grade} required className='mt-1 border-b-2 rounded-lg' />
										</div>
										{ (edu.degreeName != null) &&
												<div className=''>
													<label htmlFor='degreeName' className=''>Degree Name</label><br />
													<input name='degreeName' onChange={handleForm} type='text' id='degreeName' placeholder={edu.degreeName} required className='rounded-lg border-b-2 mt-1' />
												</div>
											}
									</div>
								)
							})
						) :
						(
							<div className='mt-5 grid grid-cols-4 gap-14'>
								<div className=''>
									<label>Education Type</label>
									<Select
										options={options}
										className="mt-2"
										id="role"
										name="role"
										value={selectedOption}
										onChange={handleSelectChange}
										required
									/>
								</div>
								<div>
									<label htmlFor='instituteName' className=''>University Name</label>
									<input name='instituteName' type='text' onChange={handleForm} id='instituteName' required className='mt-1 border-b-2 rounded-lg' />
								</div>
								<div>
									<label htmlFor='year' className=''>Passing Year</label><br />
									<input name='year' onChange={handleForm} type='number' id='year' required className=' mt-1 border-b-2 rounded-lg' />
								</div>
								<div>
									<label htmlFor='grade' className=''>Grade/Percentage/Percentile</label><br />
									<input name='grade' onChange={handleForm} type='text' id='grade' required className='mt-1 border-b-2 rounded-lg' />
								</div>
								{ selectedOption && (selectedOption.value == 'degree') &&
										<div className=''>
											<label htmlFor='degreeName' className=''>Degree Name</label><br />
											<input name='degreeName' onChange={handleForm} type='text' id='degreeName' required className='rounded-lg border-b-2 mt-1' />
										</div>
									}
							</div>
						)
					}
					<div className='mt-5'>
						<button onClick={addEducation} className='border-2 px-9 py-2 rounded-xl bg-blue-500 hover:bg-blue-700'>Save</button>
					</div>
				</div>
				<div className='border-2 mt-5 mx-20 p-10 bg-white rounded-xl '>
					<div>
						<Text className='text-xl font-bold'>Edit Skills</Text>
					</div>
					{
						profile && (profile.moreData) ?
						(
							<div className='mt-5 grid grid-cols-4 gap-7'>
								{
									profile.moreData.Skill.map((skill:string)=> {
										return (
											<div className={`border-2 p-2`} key={skill} id={skill}>
												<Text>{skillEdit ? skillEdit : skill}</Text>
												<svg version="1.1" viewBox="0 0 121.48 122.88" className={`h-3 float-right -mt-5 cursor-pointer`} onClick={()=>setDisplay(true)}>
													<g><path d="M96.84,2.22l22.42,22.42c2.96,2.96,2.96,7.8,0,10.76l-12.4,12.4L73.68,14.62l12.4-12.4 C89.04-0.74,93.88-0.74,96.84,2.22L96.84,2.22z M70.18,52.19L70.18,52.19l0,0.01c0.92,0.92,1.38,2.14,1.38,3.34 c0,1.2-0.46,2.41-1.38,3.34v0.01l-0.01,0.01L40.09,88.99l0,0h-0.01c-0.26,0.26-0.55,0.48-0.84,0.67h-0.01 c-0.3,0.19-0.61,0.34-0.93,0.45c-1.66,0.58-3.59,0.2-4.91-1.12h-0.01l0,0v-0.01c-0.26-0.26-0.48-0.55-0.67-0.84v-0.01 c-0.19-0.3-0.34-0.61-0.45-0.93c-0.58-1.66-0.2-3.59,1.11-4.91v-0.01l30.09-30.09l0,0h0.01c0.92-0.92,2.14-1.38,3.34-1.38 c1.2,0,2.41,0.46,3.34,1.38L70.18,52.19L70.18,52.19L70.18,52.19z M45.48,109.11c-8.98,2.78-17.95,5.55-26.93,8.33 C-2.55,123.97-2.46,128.32,3.3,108l9.07-32v0l-0.03-0.03L67.4,20.9l33.18,33.18l-55.07,55.07L45.48,109.11L45.48,109.11z M18.03,81.66l21.79,21.79c-5.9,1.82-11.8,3.64-17.69,5.45c-13.86,4.27-13.8,7.13-10.03-6.22L18.03,81.66L18.03,81.66z"/></g>
												</svg>
												<Modal
													closeButton
													aria-labelledby="modal-title"
													open={display}
													onClose={closeHandler}
												>
													<Modal.Header>
														<Text id="modal-title" size={18}>
															Edit Skill
														</Text>
													</Modal.Header>
													<Modal.Body>
														<label htmlFor='skill' className=''>Name</label>
														<input name='skill' type='text'  id='skill' onChange={handleChange} required className=' border-b-2 rounded-lg' />
													</Modal.Body>
													<Modal.Footer>
														<Button auto flat onPress={closeHandler} color='error'>
															Close
														</Button>
														<Button auto>
															Edit
														</Button>
													</Modal.Footer>
												</Modal>
												{/* <svg version="1.1" viewBox="0 0 122.878 122.88" className={`h-3 float-right -mt-5 cursor-pointer`} onClick={()=>{setDisplay(true)}}>
													<g><path d="M1.426,8.313c-1.901-1.901-1.901-4.984,0-6.886c1.901-1.902,4.984-1.902,6.886,0l53.127,53.127l53.127-53.127 c1.901-1.902,4.984-1.902,6.887,0c1.901,1.901,1.901,4.985,0,6.886L68.324,61.439l53.128,53.128c1.901,1.901,1.901,4.984,0,6.886 c-1.902,1.902-4.985,1.902-6.887,0L61.438,68.326L8.312,121.453c-1.901,1.902-4.984,1.902-6.886,0 c-1.901-1.901-1.901-4.984,0-6.886l53.127-53.128L1.426,8.313L1.426,8.313z"/></g>
												</svg> */}
											</div>
										)
									})
								}
							</div>
						) :
						(
							<div className='mt-5 grid grid-cols-4 gap-7'>

							</div>
						)
					}
				</div>
				<div className='border-2 mt-5 mx-20 p-10 bg-white rounded-xl '>
					<div>
						<Text className='text-xl font-bold'>Change Profile Photo</Text>
					</div>
					<div className='mt-5 flex justify-center'>
						<input type='file' name='file' id='file' onChange={handleImgChange} accept='image/*' />
					</div>
					<div className='mt-5'>
						<button onClick={submitData} className='border-2 px-9 py-2 rounded-xl bg-blue-500 hover:bg-blue-700'>Save</button>
						<button onClick={deleteData} className='border-2 px-9 py-2 rounded-xl bg-blue-500 hover:bg-blue-700'>Remove Photo</button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default EditProfile