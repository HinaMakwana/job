import { Label, TextInput } from 'flowbite-react'
import Select from "react-select";
import React, { useState } from 'react'
import {options,options1} from '../components/util/jobTitle.json'
import { Dropdown } from '@nextui-org/react';
interface jobTitle {
    value: string,
    label:string
  }

function Post() {
	const [selectedOption, setSelectedOption] = useState<jobTitle>();

    const handleSelectChange = (selectedOption:any) => {
        setSelectedOption(selectedOption);
    };
  return (
	<div className='mt-10'>
		<div>
			<p className='text-center text-4xl'>Tell us who you're hiring</p>
		</div>
		<div className='mt-5'>
			<div className=''>
				<form>
					<div className=''>
						<div className=''>
							<label>Job title</label>
							<Select
							options={options}
							className="mt-1"
							id="role"
							name="role"
							value={selectedOption}
							onChange={handleSelectChange}
							required
							/>
                    	</div>
						<div className=''>
							<label>Company Name</label>
							<Select
							options={options1}
							className="mt-1"
							id="role"
							name="role"
							value={selectedOption}
							onChange={handleSelectChange}
							required
							/>
                    	</div>
						<div className=''>
							<label>WorkPlace Type</label>
							<br />
							<Dropdown placement='bottom'>
								<Dropdown.Trigger>
									<button className=''>Select workplace type </button>
								</Dropdown.Trigger>
								<Dropdown.Menu
									color="secondary"
									aria-label="Actions"
									css={{ $$dropdownMenuWidth: "280px" }}
								>
									<Dropdown.Section title="Actions">
										<Dropdown.Item
											key="new"
											description="Create a new file"
										>
											Work from home
										</Dropdown.Item>
										<Dropdown.Item
											key="copy"
											description="Copy the file link"
										>
											Work from office
										</Dropdown.Item>
									</Dropdown.Section>
								</Dropdown.Menu>
							</Dropdown>
                    	</div>
					</div>
				</form>
			</div>
		</div>
	</div>
  )
}

export default Post