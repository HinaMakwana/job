import { Button, Card, FormElement, Modal,Text } from '@nextui-org/react'
import React, { ChangeEvent, useState } from 'react'
import Select from "react-select";

interface type {
    value: string,
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
function other() {
	const [visible,setVisible] = useState(false)
    const [selectedOption, setSelectedOption] = useState<type>();
	const [form, setForm] = useState({ instituteName : '',grade : '',year: '',degreeName: null})
	const [edu,setEdu] = useState<edu>()

	const handler = () => setVisible(true);
	const closeHandler = () => {
		setVisible(false);
		console.log("closed");
	};
	const handleChange = (e: ChangeEvent<FormElement>) => {
		const { name, value } = e.target;
		setForm((preform) => ({
		  ...preform,
		  [name]: value,
		}));
	};
	const addEducation = async () => {
		let res = await fetch('http://127.0.0.1:1337/add/education',{
			method: 'POST',
			headers: {
				Authorization: `Barear ${localStorage.getItem('authToken')}`
			},
			body: JSON.stringify({...form,educationType: selectedOption?.value })
		})
		let final = await res.json()
		console.log(final);
		setEdu(final.data)
	}
	const handleSelectChange = (selectedOption:any) => {
        setSelectedOption(selectedOption);
    };
  return (
	<div>
		<button onClick={handler} className='border-2 mt-5'>Add education</button>
				<Modal
					closeButton
					aria-labelledby="modal-title"
					open={visible}
					onClose={closeHandler}
				>
					<Modal.Header>
						<Text id="modal-title" size={18}>
							Add Education Details
						</Text>
					</Modal.Header>
					<Modal.Body>
						<label htmlFor='select' className='mt-5'>Education Type</label>
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
						{ selectedOption && (selectedOption.value == 'degree') &&
							<div className='mt-5 flex flex-col'>
								<label htmlFor='degreeName' className=''>degreeName</label>
								<input name='degreeName' onChange={handleChange} id='degreeName' required className=' border-b-2' />
							</div>
						}
            </div>
						<label htmlFor='instituteName' className=''>University Name</label>
						<input name='instituteName' type='text' onChange={handleChange} id='instituteName' required className=' border-b-2 rounded-lg' />
						<label htmlFor='year' className=''>Passing Year</label>
						<input name='year' type='number' onChange={handleChange} id='year' required className=' border-b-2 rounded-lg' />
						<label htmlFor='grade' className=''>Grade/Percentage/Percentile</label>
						<input name='grade' type='text' onChange={handleChange} id='grade' required className=' border-b-2 rounded-lg' />
					</Modal.Body>
					<Modal.Footer>
						<Button auto flat onPress={closeHandler} color='error'>
							Close
						</Button>
						<Button auto onPress={addEducation}>
							Add
						</Button>
					</Modal.Footer>
      	</Modal>
				{
					edu &&
					<div className='mt-5'>
						<Card css={{ mw: "900px" }}>
							<Card.Body>
								<div className="flex gap-3 flex-col">
									<div>
										<span>{edu.educationType}</span>
									</div>
									<div className='flex flex-col'>
										<span>university Name:{edu.instituteName}</span>
										<span>Passing year:{edu.year}</span>
										<span>grade: {edu.grade}</span>
									</div>
								</div>
							</Card.Body>
						</Card>
					</div>
				}
	</div>
  )
}

export default other