import Select from "react-select";
import { Label, TextInput } from 'flowbite-react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { Navbar, Text } from "@nextui-org/react";
interface role {
    value: string,
    label:string
  }
const options:role[] = [
    {value: "manager",label: "manager"},
    {value: "client",label: "client"}
  ];
function Auth() {
    const [selectedOption, setSelectedOption] = useState<role>();

    const handleSelectChange = (selectedOption:any) => {
        setSelectedOption(selectedOption);
    };
    const router = useRouter()
	const [form, setForm] = useState({firstName:'',lastName:'',email:'', password:'',confirmPassword:''})
	const handleChange = (e:React.ChangeEvent<HTMLInputElement>)=> {
		const {name , value} = e.target as HTMLInputElement ;
        setForm((preform) => ({
			...preform ,
			[name] :value,
		}));
    }
	const submit = async (e:React.MouseEvent<HTMLButtonElement>) => {
        if(selectedOption) {
            e.preventDefault()
            const a = await fetch('http://localhost:1337/user/signup',{
                method: 'POST',
                body: JSON.stringify({...form,role:selectedOption.value})
            })
            const content = await a.json()
            console.log('content',content);

            if(a.status === 201) {
                alert('Successfully register')
                router.push('signup')
            } else if(a.status == 409) {
                alert('User already exist..')
            } else if(a.status === 500) {
                alert('Server error')
            }
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
            <div>
                <div className='flex justify-center mt-10'>
                    <form className="flex flex-col gap-7">
                        <div>
                            <span className='text-5xl'>Join your Community</span>
                        </div>
                        <div className='flex gap-5'>
                            <div className="block">
                            <Label
                                htmlFor="firstName"
                                value="First name"
                                className=''
                            />
                            <TextInput
                            id="firstName"
                            className='mt-2 w-52'
                            name='firstName'
                            placeholder="First Name"
                            required
                            onChange={handleChange}
                            type="text"
                            />
                            </div>

                            <div className="block">
                            <Label
                                htmlFor="lastName"
                                value="Last name"
                                className=''
                            />
                            <TextInput
                            id="lastName"
                            className='mt-2 w-52'
                            placeholder="Last Name"
                            name='lastName'
                            required
                            onChange={handleChange}
                            type="text"
                            />
                            </div>
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
                                className=''
                                required
                                name='password'
                                type='password'
                                onChange={handleChange}
                                placeholder="Enter your password"
                                />
                            </div>
                        </div>
                        <div>
                            <div className="mb-2 block">
                            <Label
                                htmlFor="confirmPassword"
                                value="Your confirm password"
                            />
                            </div>
                            <div className=''>
                                <TextInput
                                id="confirmPassword"
                                className=''
                                required
                                type='password'
                                name='confirmPassword'
                                onChange={handleChange}
                                placeholder="Enter your password"
                                />
                            </div>
                        </div>
                        <div>
                            <div className="mb-2 block">
                            <Label
                                htmlFor="role"
                                value="Select your role"
                            />
                            </div>
                            <div className=''>
                                <Select
                                options={options}
                                className=""
                                id="role"
                                name="role"
                                value={selectedOption}
                                onChange={handleSelectChange}
                                required
                                />
                            </div>
                        </div>
                        <button onClick={submit} type="submit" className="bg-blue-600 h-10 rounded-md hover:bg-blue-700 hover:text-white">
                            Sign In
                        </button>
                        <span className='text-blue-600 -mt-5'><Link href='/signup'>Already have an account?</Link></span>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Auth