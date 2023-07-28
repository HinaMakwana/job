import React, { ChangeEvent, useState } from 'react'
import { FormElement, Navbar,Text } from '@nextui-org/react';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AddMore() {
	const [form, setForm] = useState({ Headline: '',Location:''})
	const [value,setValue] = useState<string[]>([])
	const [skill,setSkill] = useState<string>()
	const router = useRouter()
	const handleChange = (e: ChangeEvent<FormElement>) => {
		const { name, value } = e.target;
		setForm((preform) => ({
		  ...preform,
		  [name]: value,
		}))
	};
	const handleClick = () => {
        setValue((preValue:any) => [
			...preValue,skill
		]);
    };
	const addMoreInfo = async () => {
		let addProfile = await fetch(`http://127.0.0.1:1337/add/moreInfo/${router.query.id}`,
		{
			method: 'POST',
			body: JSON.stringify({...form,Skill:value})
		});
		let result = await addProfile.json();
		console.log(result);
		if(result.status == 500) {
			toast.error('Server error', {
                position: toast.POSITION.TOP_RIGHT
            });
		} else if(result.status == 400) {
			toast.warning('Bad request', {
                position: toast.POSITION.TOP_RIGHT
            });
		} else if(result.status == 401) {
			toast.error('Unauthorized', {
                position: toast.POSITION.TOP_RIGHT
            });
		} else if(result.status == 201) {
			toast.success('Profile Updated', {
                position: toast.POSITION.TOP_RIGHT
            });
			router.push('signup')
		}

	}
	console.log('value',value);
  return (
	<div>
		<div className="">
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
				</Navbar>
		</div>
		<div className=' bg-gradient-to-r to-slate-400 from-slate-500 h-screen'>
			<div className='grid'>
				<div className='m-20 bg-white border-2 p-20'>
					<div>
						<h1 className='font-bold text-4xl text-center'>Complete Profile</h1>
					</div>
					<div className='flex flex-col px-40 pt-10'>
						<label htmlFor='Headline' className=''>Headline</label>
						<input name='Headline' onChange={handleChange} id='Headline' required className=' border-b-2' />
						<label htmlFor='Location' className='mt-5'>Location</label>
						<input name='Location' onChange={handleChange} id='Location' required className=' border-b-2' />
						<label htmlFor='Skill' className='mt-5'>Skill</label>
						<input name='Skill' onChange={e => setSkill(e.currentTarget.value)} id='Skill' required className=' border-b-2' />
						<button className='border-2 mt-3' onClick={handleClick}>Add Skill</button>
						{
							value &&
							value.map((data,index)=> {
								return (
									<div key={index}>
										{data}
									</div>
								)
							})
						}
					</div>
					<div className='flex flex-row px-40 mt-10 gap-5'>
						<button className='border-2 p-2 rounded-xl hover:bg-blue-400 hover:scale-105' onClick={addMoreInfo}>Add To Profile</button>
						<button className='border-2 p-2 px-6 rounded-xl hover:bg-blue-400 hover:scale-105' onClick={()=>router.push('signup')}>Skip</button>
					</div>
				</div>
			</div>
		</div>
	</div>
  )
}

export default AddMore