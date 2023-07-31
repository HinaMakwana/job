import { setCookie } from 'cookies-next';
import { Button, Label, TextInput } from 'flowbite-react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function Signup() {
    const [form, setForm] = useState({email:'', password:''})
    const router = useRouter()
	const handleChange = (e:React.ChangeEvent<HTMLInputElement>)=> {
		const {name , value} = e.target as HTMLInputElement ;
        setForm((preform) => ({
			...preform ,
			[name] :value,
		}));
    }
	const submit = async (e:React.MouseEvent<HTMLButtonElement>) => {
        console.log(form);

        e.preventDefault();
        const a = await fetch('http://127.0.0.1:1337/user/login',{
            method: 'POST',
            body: JSON.stringify({...form})
        })
        const content = await a.json()
        console.log(content,'ytytyt');
        localStorage.setItem('authToken',content.token)
        // setCookie("authToken",content.token,{
        //     path: '/',
        //     maxAge: 3600,
        //     sameSite: true,
        //     secure: true
        //   })
        if(a.status === 200) {
            toast.success('Login successfully', {
                position: toast.POSITION.TOP_RIGHT
            });
            if(content.role == 'manager') {
                router.push('post')
            } else {
                router.push('apply')
            }
        } else if(a.status == 404) {
            toast.error('Email is Invalid', {
                position: toast.POSITION.TOP_RIGHT
            });
        } else if(a.status === 500) {
            toast.error('Server error', {
                position: toast.POSITION.TOP_RIGHT
            });
        } else if(a.status === 403) {
            toast.warning('Email or Password invalid', {
                position: toast.POSITION.TOP_RIGHT
            });
        }
	}
    return (
        <section className='flex' id='section1'>
            <div className='basis-1/2 xl:pl-80 md:pl-20 mt-20 sm:pl-0' id='form'>
                <form className="flex max-w-md flex-col gap-4 rounded-xl border-2 p-10 bg-gradient-to-t to-gray-400 via-gray-300 from-gray-200">
                    <div>
                        <span className='text-5xl text-stone-50'>Welcome to your professional community</span>
                    </div>
                    <div>
                        <div className="mb-2 block">
                        <Label
                            className='text-white'
                            htmlFor="email"
                            value="Your email"
                        />
                        </div>
                        <TextInput
                        id="email"
                        className=''
                        placeholder="name@flowbite.com"
                        required
                        name='email'
                        onChange={handleChange}
                        type="email"
                        />
                    </div>
                    <div>
                        <div className="mb-2 block">
                        <Label
                            className='text-white'
                            htmlFor="password"
                            value="Your password"
                        />
                        </div>
                        <div className=''>
                            <TextInput
                            id="password"
                            name='password'
                            className='w-full'
                            required
                            type='password'
                            onChange={handleChange}
                            placeholder="Enter your password"
                            />
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Label htmlFor="remember" className='text-blue-600'>
                            <Link href='forgetPass'>Forget password ?</Link>
                        </Label>
                    </div>
                    <Button onClick={submit} type="submit" className="bg-blue-600 hover:bg-blue-200">
                        Sign In
                    </Button>
                    <span className='text-blue-600 mt-3'><Link href='/auth'>Don't have an account?</Link></span>
                </form>
            </div>
            <div className='basis-1/2 m-auto'>
                <img src='signup.svg' />
            </div>
        </section>
    )
}