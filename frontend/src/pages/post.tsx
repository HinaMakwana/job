import Select from "react-select";
import React, { useEffect, useState } from 'react'
import {options,options1,jobLocation,jobType,jobTime} from '../components/util/jobTitle.json'
import { FormElement, Textarea, Navbar, Text, Dropdown } from "@nextui-org/react";
import { getCookie } from "cookies-next";
import { useRouter } from "next/router";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Profile from "@/components/profile";

interface role {
    value: string,
    label:string
  }
function Post() {
	const router = useRouter()
	const [action,setAction] = useState<any>()
	const [isOpen, setIsOpen] = useState(false);
    const [Option, setOption] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
	const [open, setOpen] = useState(false)
	const [val, setValue] = useState('')
	const [query, setQuery] = useState('')
	const [show,setShow] = useState(false)
	const [select, setSelect] = useState('')
	const [search,setSearch] = useState('')
	const [selectedOption, setSelectedOption] = useState<role>();
	const [selectOption, setSelectOption] = useState<role>()
	const [form, setForm] = useState({description:''})
	// const token = getCookie('authToken')

	const handleChange = (e:React.ChangeEvent<FormElement>)=> {
		const {name , value} = e.target as HTMLTextAreaElement ;
        setForm((preform) => ({
			...preform ,
			[name] :value,
		}));
    }
	const handleToggle = () => {
		if(open) {
			setOpen(false)
		}
		if(show) {
			setShow(false)
		}
		setIsOpen(!isOpen);
	};
	const toggle = () => {
		if(isOpen) {
			setOpen(false)
		}
		if(show) {
			setShow(false)
		}
		setOpen(!open)
	}
	const toggleButton = () => {
		if(open) {
			setOpen(false)
		}
		if(isOpen) {
			setShow(false)
		}
		setShow(!show)
	}
	const handleOptionClick = (option:any) => {
		setOption(option);
		setIsOpen(false);

	};
	const optionClick = (option:any) => {
		setValue(option);
		setOpen(false)
	}
	const handleClick = (option:any) => {
		setSelect(option);
		setShow(false)
	}
	const handleSearchInputChange = (event:any) => {
		setSearchQuery(event.target.value);
	};
	const handleInputChange = (event:any) => {
	 	setQuery(event.target.value)
	}
	const searchInputChange = (event:any) => {
		setSearch(event.target.value)
	}
	let filteredOptions = options.filter((option) =>
		option.toLowerCase().includes(searchQuery.toLowerCase())
	);
	let filtered = options1.filter((option) =>
		option.toLowerCase().includes(query.toLowerCase())
	);
	let filterOption = jobLocation.filter((option) =>
		option.toLowerCase().includes(search.toLowerCase())
	)
	const handleSelectChange = (selectedOption:any) => {
		setSelectedOption(selectedOption);
	};
	const handleSelect = (option:any) => {
		setSelectOption(option)
	}
	const submit = async (e:React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
		if(selectOption && selectedOption && form.description) {
			const a = await fetch('http://127.0.0.1:1337/job/post',{
				method: 'POST',
				headers :{
					'Authorization' : `Bearer ${localStorage.getItem('authToken')}`
					},
				body: JSON.stringify({
					title: Option,
					company: val,
					workplaceType: selectedOption.value,
					jobLocation: select,
					jobType: selectOption.value,
					...form
				})
			})
			const content = await a.json()
			if(a.status === 201) {
				toast.success('Job posted successfully',{
					position:'top-right'
				})
				router.push('success')
			} else if(a.status == 409) {
				toast.warning('Title is already added by you',{
					position: 'top-right'
				})
			} else if(a.status === 500) {
				toast.warning('Server error',{
					position: 'top-right'
				})
			} else if(a.status === 401) {
				toast.error('User is unauthorized',{
					position: 'top-right'
				})
				router.push('signup')
			} else if(a.status === 404) {
				toast.error('User not found',{
					position: 'top-right'
				})
			}
		} else {
			alert('select all options first')
		}
	}

  return (
	<div>
		<div>
			<Profile />
		</div>
		<div className="bg-gradient-to-r from-gray-500 to-gray-500 h-[92.4vh] flex">
			<div className='border-2 w-fit m-auto p-5 bg-white mt- h-fit'>
				<div>
					<p className='text-center text-4xl'>Tell us who you're hiring</p>
				</div>
				<div className='mt-3 flex justify-center'>
					<div className=''>
						<form>
							<div className=''>
								<div className='w-[30vw]'>
									<label>Job title</label>
									<br />
									<div className={`${isOpen ? 'open' : ''} relative inline-block`}>
										<input type="text" className="w-[30vw] h-10 rounded-lg"
											onClick={handleToggle}
											onChange={handleSearchInputChange}
											value={searchQuery}
											placeholder={Option||'Select Job  title'} />
										{isOpen && (
										<div  className="absolute top-full left-0 w-full h-56 bg-white border-2 border-blue-500 z-10 overflow-y-auto">
											<ul className=" list-none p-0 m-0">
											{filteredOptions && filteredOptions.map((option, index) => (
												<li key={option} onClick={() => handleOptionClick(option)} className="pl-2 pt-3 cursor-pointer hover:bg-zinc-700">
												{option}
												</li>
											))}
											</ul>
										</div>
										)}
									</div>
								</div>
								<div className='w-[30vw] mt-2'>
									<label>Company Name</label>
									<div className={`${open ? 'open' : ''} relative inline-block`}>
										<input type="text"
											className="w-[30vw] h-10 rounded-lg"
											onClick={toggle}
											onChange={handleInputChange}
											value={query}
											placeholder={val||'Select Company'} />
										{open && (
										<div className="absolute top-full left-0 w-full h-56 bg-white border-2 border-blue-500 z-10 overflow-y-auto">
											<ul className=" list-none p-0 m-0">
											{filtered.map((option, index) => (
												<li key={option} onClick={() => optionClick(option)} className="pl-2 pt-3 cursor-pointer hover:bg-zinc-700">
												{option}
												</li>
											))}
											</ul>
										</div>
										)}
									</div>
								</div>
								<div className='w-[30vw] mt-2'>
									<label>WorkPlace Type</label>
									<Select
									options={jobType}
									className="mt-1"
									id="role"
									name="role"
									placeholder="work from home"
									value={selectedOption}
									onChange={handleSelectChange}
									required
									/>
								</div>
								<div className='w-[30vw] mt-2'>
									<label>Job location</label>
									<br />
									<div className={` ${show ? 'open' : ''} relative inline-block`}>
										<input type="text" className="w-[30vw] h-10 rounded-lg" onClick={toggleButton} onChange={searchInputChange} value={search} placeholder={select||'Select Job  location'} />
										{show && (
										<div className="absolute top-full left-0 w-full h-56 bg-white border-2 border-blue-50 z-10 overflow-y-auto">
											<ul className=" list-none p-0 m-0">
											{filterOption.map((option, index) => (
												<li key={option} onClick={() => handleClick(option)} className="pl-2 pt-3 cursor-pointer hover:bg-zinc-700">
												{option}
												</li>
											))}
											</ul>
										</div>
										)}
									</div>
								</div>
								<div className='w-[30vw] mt-2'>
									<label>Job Type</label>
									<Select
									options={jobTime}
									className="mt-1 border-black"
									id="role"
									name="role"
									placeholder="Full-time"
									value={selectOption}
									onChange={handleSelect}
									required
									/>
								</div>
								<div className='w-[30vw] mt-2'>
									<label htmlFor="description">Description</label>
									<br />
									<Textarea
									id="description"
									name="description"
									onChange={handleChange}
									css={{width:'30vw'}}
									placeholder="Enter your job Description"
									className="w-full border-2 mt-2"
									/>
								</div>
								<div className="w-[30vw] mt-2">
									<button onClick={submit} className="border-2 w-[30vw] py-2 rounded-lg bg-indigo-600 hover:bg-indigo-800">Post Job</button>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	</div>
  )
}

export default Post