import { Navbar, Text } from '@nextui-org/react'
import { useRouter } from 'next/router';
import React, { useState } from 'react'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ForgetPass() {
	const [form, setForm] = useState({email: ''});
	const [pass,setPass] = useState({newPassword: '',confirmPassword: ''});
	const [ok,setOk] = useState(true);
	const [token,setToken] = useState('');
	const router = useRouter();
	const handleChange = (e:React.ChangeEvent<HTMLInputElement>)=> {
	const {name , value} = e.target as HTMLInputElement ;
		setForm((preform) => ({
		...preform ,
		[name] :value,
		}));
  }
	const handleValue = (e:React.ChangeEvent<HTMLInputElement>) => {
		const {name , value} = e.target as HTMLInputElement ;
		setPass((prepass) => ({
			...prepass,
			[name] : value
		}));
	}
	const forgetPass = async () => {
		let res = await fetch('http://127.0.0.1:1337/forgetPass',{
			method: 'PATCH',
			body: JSON.stringify(form)
		})
		let token = await res.json();
		setToken(token.token);
		if(res.status === 404) {
			toast.error('email is invalid',{
				position: 'top-right'
			})
		} else if(res.status ===  200) {
			setOk(false);
		} else if(res.status === 500) {
			toast.error('Server error',{
				position: 'top-right'
			})
		}
	}
	const resetPass = async () => {
		let result = await fetch('http://127.0.0.1:1337/resetPass',{
			method: 'PATCH',
			body: JSON.stringify({...pass,forgetPassToken:token})
		})
		if(result.status === 400) {
			toast.error('Bad request',{
				position:'top-right'
			})
		} else if(result.status === 403) {
			toast.error('token expired',{
				position:'top-right'
			})
		} else if(result.status === 500) {
			toast.error('server error',{
				position:'top-right'
			})
		} else if(result.status === 200) {
			toast.success('Password updated',{
				position:'top-right'
			})
			router.push('signup')
		}
	}
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
				</Navbar>
			</div>
			<div className='flex justify-center bg-gradient-to-tl to-slate-400 via-slate-500 from-slate-600 h-screen'>
				{
					ok ?
					(
						<div className='flex flex-col border-2 p-10 mt-20 bg-white h-72'>
							<h1 className='text-3xl text-center font-semibold'>Forget Password</h1>
							<label htmlFor='email' className='mt-10'>Enter Email</label>
							<input name='email' id='email' onChange={handleChange} className='w-96 border-2 border-black' type='text'/>
							<button className='mt-5 border-2 py-2 rounded-lg border-black hover:bg-blue-500' onClick={forgetPass}>Submit</button>
						</div>
					) :
					(
						<div className='flex flex-col border-2 p-10 mt-20 bg-white h-96'>
							<h1 className='text-3xl text-center font-semibold'>Forget Password</h1>
							<label htmlFor='newPassword' className='mt-10'>new Password</label>
							<input name='newPassword' id='newPassword' onChange={handleValue} className='w-96 border-2 border-black' type='text'/>
							<label htmlFor='confirmPassword' className='mt-10'>confirm Password</label>
							<input name='confirmPassword' id='confirmPassword' onChange={handleValue} className='w-96 border-2 border-black' type='text'/>
							<button className='mt-5 border-2 py-2 rounded-lg border-black hover:bg-blue-500' onClick={resetPass}>Submit</button>
						</div>
					)
				}
			</div>
		</div>
	)
}

export default ForgetPass