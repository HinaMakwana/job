import Profile from '@/components/profile'
import { useRouter } from 'next/router';
import React, { useState } from 'react'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ChangePass() {
	const [pass,setPass] = useState({oldPassword:'',newPassword: '',confirmPassword: ''});
	const router = useRouter();
	const handleValue = (e:React.ChangeEvent<HTMLInputElement>) => {
		const {name , value} = e.target as HTMLInputElement ;
		setPass((prepass) => ({
			...prepass,
			[name] : value
		}));
	}
	const changePass = async () => {
		let result = await fetch('http://127.0.0.1:1337/changePass',{
			method: 'PATCH',
			headers:{
				Authorization: `Bearer ${localStorage.getItem('authToken')}`
			},
			body: JSON.stringify(pass)
		})
		if(result.status == 400) {
			toast.error('password and confirm password must match',{
				position:'top-right'
			})
		} else if(result.status == 500) {
			toast.error('server error',{
				position:'top-right'
			})
		} else if(result.status == 200) {
			toast.success('Password updated',{
				position:'top-right'
			})
			router.push('apply');
		}
	}
	return (
		<div>
			<div>
				<Profile />
			</div>
			<div className='flex justify-center bg-gradient-to-tl to-slate-400 via-slate-500 from-slate-600 h-screen'>
				<div className='flex flex-col border-2 p-10 mt-20 bg-white h-[500px]'>
					<h1 className='text-3xl text-center font-semibold'>Forget Password</h1>
					<label htmlFor='oldPassword' className='mt-10'>old Password</label>
					<input name='oldPassword' id='oldPassword' onChange={handleValue} className='w-96 border-2 border-black' type='text'/>
					<label htmlFor='newPassword' className='mt-10'>new Password</label>
					<input name='newPassword' id='newPassword' onChange={handleValue} className='w-96 border-2 border-black' type='text'/>
					<label htmlFor='confirmPassword' className='mt-10'>confirm Password</label>
					<input name='confirmPassword' id='confirmPassword' onChange={handleValue} className='w-96 border-2 border-black' type='text'/>
					<button className='mt-5 border-2 py-2 rounded-lg border-black hover:bg-blue-500' onClick={changePass}>Submit</button>
				</div>
			</div>
		</div>
	)
}

export default ChangePass