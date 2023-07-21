import { Dropdown, Navbar, Text } from '@nextui-org/react'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
interface profile {
	firstName : string,
	lastName: string,
	email: string,
	role: string
}
function Profile() {
	const [action,setAction] = useState<any>()
	const [data,setData] = useState<profile>()
	let router = useRouter();
	useEffect(()=> {
		getProfile()
	},[])
	let getProfile = async () => {
		let getData = await fetch('http://127.0.0.1:1337/user/profile',{
			method: 'GET',
			headers: {
				Authorization : `Bearer ${localStorage.getItem('authToken')}`
			}
		})
		let result = await getData.json()
		console.log(result.user);
		setData(result.user)
	}
  return (
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
          <Dropdown placement="bottom-left">
            <Navbar.Item>
              <Dropdown.Trigger>
                <div className="flex flex-row">
                  <img src="user.svg" className="h-10" />
                  <Text className="m-auto pl-3 font-bold hover:scale-105" style={{color:'royalblue'}}>{data && data.firstName + ' ' + data.lastName}</Text>
                </div>
              </Dropdown.Trigger>
            </Navbar.Item>
            <Dropdown.Menu
              aria-label="User menu actions"
              color="secondary"
              onAction={(actionKey) => {
				if(actionKey == 'settings'){

				} else if(actionKey == 'post') {
					router.push('listJob')
				} else if(actionKey == 'saved') {

				} else if(actionKey == 'logout') {

				}
			  }}
            >
              <Dropdown.Item key="profile" css={{ height: "$18" }}>
                <Text b color="inherit" css={{ d: "flex" }}>
                  Signed in as
                </Text>
                <Text b color="inherit" css={{ d: "flex" }}>
                  {data && data.email}
                </Text>
              </Dropdown.Item>
              <Dropdown.Item key="settings" withDivider>
                My Profile
              </Dropdown.Item>
			  { data &&
			  	(data.role == 'manager') ?
				(
				<Dropdown.Item key="post" withDivider>
					My Posts
				</Dropdown.Item>
				):
				(
				<Dropdown.Item key="saved" withDivider>
					Saved job
				</Dropdown.Item>
				)
			  }
              <Dropdown.Item key="help_and_feedback" withDivider>
                Help & Feedback
              </Dropdown.Item>
              <Dropdown.Item key="logout" withDivider color="error">
                Log Out
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          </Navbar.Content>
        </Navbar>
	</div>
  )
}

export default Profile