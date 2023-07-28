import React, { ChangeEvent, useState } from 'react'

function Test() {
	const [value,setValue] = useState<any>()

	const handleImgChange = (e:ChangeEvent) => {
    let target = e.target as HTMLInputElement
		let files = target.files;
		if (!files || !files.length) {
			alert("Please select a file!");
		} else {
			let file = files[0]
			setValue(file)
		}
	};
	const submitData = async (e:any) => {
		e.preventDefault();
		const formData = new FormData();
		formData.append('image',value);
		let a = await fetch('http://127.0.0.1:1337/uploadImage',{
			method:'POST',
			headers: {
				Authorization : `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InBvb2phQGdtYWlsLmNvbSIsInVzZXJJZCI6IjQzYjUyODI3LTVmNWUtNDdiZC1iZmQ3LTA3OGQ4NmNhNWM5MSIsImlhdCI6MTY5MDQzNTM5OSwiZXhwIjoxNjkwNDY0MTk5fQ.U3RG79F3YsQ_mOAgEJYhmIXlESmqeM2r2dWn-lrYimM`,
			},
			body: formData
		})
		console.log(await a.json());
	}


	return (
		<div>
			<form action="" onSubmit={submitData}>
				<div>
					<input type='file' name='file' id='file' onChange={handleImgChange} />
					<button type='submit'>submit</button>
				</div>
			</form>
			<img src='/Users/ztlab133/Documents/profile/bfadcd82-7cdd-4644-9e9a-799de7883159.svg' />
		</div>

	)
}

export default Test