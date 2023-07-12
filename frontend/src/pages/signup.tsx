import { setCookie } from 'cookies-next';
import { Button, Label, TextInput } from 'flowbite-react';
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
        e.preventDefault();
        const a = await fetch('http://localhost:1337/user/login',{
            method: 'POST',
            headers :{
                // 'Content-Type' :'application/json'
                },
            body: JSON.stringify(form)
        })
        const content = await a.json()
        setCookie("authToken",content.token,{
            path: '/',
            maxAge: 3600,
            sameSite: true,
            secure: true
          })
        if(a.status === 200) {
            alert('Login successfully')
            if(content.role == 'manager') {
                setCookie("authToken",content.token,{
                    path: '/',
                    maxAge: 3600,
                    sameSite: true,
                    secure: true
                  })
                router.push('post')
            } else {
                router.push('apply')
            }
        } else if(a.status == 409) {
            alert('User already exist..')
        } else if(a.status === 500) {
            alert('Server error')
        }
	}
        return (
        <section className='flex' id='section1'>
            <div className='basis-1/2 xl:pl-44 md:pl-20 mt-20 sm:pl-0' id='form'>
                <form className="flex max-w-md flex-col gap-4">
                    <div>
                        <span className='text-5xl'>Welcome to your professional community</span>
                    </div>
                    <div>
                        <div className="mb-2 block">
                        <Label
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
                            <Link href=''>Forget password ?</Link>
                        </Label>
                    </div>
                    <Button onClick={submit} type="submit" className="bg-blue-600 hover:bg-blue-200">
                        Sign In
                    </Button>
                    <span className='text-blue-600 mt-3'><Link href='/signup'>Don't have an account?</Link></span>
                </form>
            </div>
            <div className='basis-1/2 m-auto'>
                <img src='signup.svg' />
            </div>
        </section>
    )
}