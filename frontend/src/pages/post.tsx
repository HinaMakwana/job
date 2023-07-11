import Select from "react-select";
import React, { useState } from 'react'
import {options,options1,jobLocation,jobType,jobTime} from '../components/util/jobTitle.json'
import { Textarea } from "@nextui-org/react";

function Post() {
	const [isOpen, setIsOpen] = useState(false);
    const [Option, setOption] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
	const [open, setOpen] = useState(false)
	const [val, setValue] = useState('')
	const [query, setQuery] = useState('')
	const [show,setShow] = useState(false)
	const [select, setSelect] = useState('')
	const [search,setSearch] = useState('')
	const [selectedOption, setSelectedOption] = useState();
	const [selectOption, setSelectOption] = useState()
		const handleToggle = () => {
			setIsOpen(!isOpen);
		};
		const toggle = () => {
			setOpen(!open)
		}
		const toggleButton = () => {
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
	
	  const filteredOptions = options.filter((option) =>
		option.toLowerCase().includes(searchQuery.toLowerCase())
	  );
	  const filtered = options1.filter((option) =>
		option.toLowerCase().includes(query.toLowerCase())
	  );
	  const filterOption = jobLocation.filter((option) =>
		option.toLowerCase().includes(search.toLowerCase())
	  )
    const handleSelectChange = (selectedOption:any) => {
        setSelectedOption(selectedOption);
    };
	const handleSelect = (option:any) => {
		setSelectOption(option)
	}
  return (
	<div className='mt-10'>
		<div>
			<p className='text-center text-4xl'>Tell us who you're hiring</p>
		</div>
		<div className='mt-5 flex justify-center'>
			<div className=''>
				<form>
					<div className=''>
						<div className='w-[30vw]'>
							<label>Job title</label>
							<br />
							<div className={` ${isOpen ? 'open' : ''} relative inline-block`}>
								<input type="text" className="w-[30vw] h-10 rounded-lg" onClick={handleToggle} onChange={handleSearchInputChange} value={searchQuery} placeholder={Option||'Select Job  title'} />
								{isOpen && (
								<div className="absolute top-full left-0 w-full h-56 bg-slate-800 border-2 border-blue-500 z-10 overflow-y-auto">
									<ul className=" list-none p-0 m-0">
									{filteredOptions.map((option, index) => (
										<li key={index} onClick={() => handleOptionClick(option)} className="pl-2 pt-3 cursor-pointer hover:bg-zinc-700">
										{option}
										</li>
									))}
									</ul>
								</div>
								)}
							</div>
                    	</div>
						<div className='w-[30vw] mt-5'>
							<label>Company Name</label>
							<div className={`${open ? 'open' : ''} relative inline-block`}>
								<input type="text" className="w-[30vw] h-10 rounded-lg" onClick={toggle} onChange={handleInputChange} value={query} placeholder={val||'Select Company'} />
								{open && (
								<div className="absolute top-full left-0 w-full h-56 bg-slate-800 border-2 border-blue-500 z-10 overflow-y-auto">
									<ul className=" list-none p-0 m-0">
									{filtered.map((option, index) => (
										<li key={index} onClick={() => optionClick(option)} className="pl-2 pt-3 cursor-pointer hover:bg-zinc-700">
										{option}
										</li>
									))}
									</ul>
								</div>
								)}
							</div>
                    	</div>
						<div className='w-[30vw] mt-5'>
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
						<div className='w-[30vw] mt-5'>
							<label>Job location</label>
							<br />
							<div className={` ${show ? 'open' : ''} relative inline-block`}>
								<input type="text" className="w-[30vw] h-10 rounded-lg" onClick={toggleButton} onChange={searchInputChange} value={search} placeholder={select||'Select Job  location'} />
								{show && (
								<div className="absolute top-full left-0 w-full h-56 bg-slate-800 border-2 border-blue-500 text-white z-10 overflow-y-auto">
									<ul className=" list-none p-0 m-0">
									{filterOption.map((option, index) => (										
										<li key={index} onClick={() => handleClick(option)} className="pl-2 pt-3 cursor-pointer hover:bg-zinc-700">
										{option}
										</li>
									))}
									</ul>
								</div>
								)}
							</div>
                    	</div>
						<div className='w-[30vw] mt-5'>
							<label>WorkPlace Type</label>
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
						<div className='w-[30vw] mt-5'>
							<label>Description</label>
							<br />
							<Textarea
							css={{width:'30vw'}}
							placeholder="Enter your job Description"
							className="w-full border-2 mt-2"
							/>
                    	</div>
						<div className="w-[30vw] mt-5">
							<button className="border-2 w-[30vw] py-2 rounded-lg bg-indigo-600 hover:bg-indigo-800">Post Job</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	</div>
  )
}

export default Post