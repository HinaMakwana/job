import { Navbar, Text, Link } from "@nextui-org/react";
import Auth from "../pages/auth";
export default function Navigation() {
  const collapseItems = [
    "Profile",
    "Dashboard",
    "Activity",
    "Analytics",
    "System",
    "Deployments",
    "My Settings",
    "Team Settings",
    "Help & Feedback",
    "Log Out",
  ];

  return (
    <div>
      <Navbar variant="sticky" className="lg:px-32 md:px-24 sm:px-16">
        <Navbar.Toggle showIn="sm" />
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
        hideIn="sm"
        css={{gap:'50px'}}
        >
          <Navbar.Link href="#ar001" className="hover:opacity-100 opacity-50">
            <div className="flex flex-col">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 17" className="stroke-1 h-5">
                <path d="m11 9.5h5v1h-5v-1zm5-5h-12v3h12v-3zm-5 8h5v-1h-5v1zm9-12v13c0 1.657-1.343 3-3 3h-14c-1.657 0-3-1.343-3-3v-13h20zm-2 2h-16v11c0 0.552 0.449 1 1 1h14c0.551 0 1-0.448 1-1v-11zm-9 7h-5v3h5v-3z" fill="currentColor"></path>
              </svg>
              <span className="text-base">Articles</span>
            </div>
          </Navbar.Link>
          <Navbar.Link href="#" className="hover:opacity-100 opacity-50">
            <div className="flex flex-col">
              <svg className="h-5 stroke-2 fill-black" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 18">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M14 3a3 3 0 1 1-1.614 5.53M15 12a4 4 0 0 1 4 4v1h-3.348M10 4.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0ZM5 11h3a4 4 0 0 1 4 4v2H1v-2a4 4 0 0 1 4-4Z"/>
              </svg>
              <span className="text-base text-slate-950">People</span>
            </div>
          </Navbar.Link>
          <Navbar.Link href="#ps001" className="hover:opacity-100 opacity-50">
            <div className="flex flex-col">
            <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 122.88 100.54" className="h-5" >
                <g>
                    <path d="M65.98,54.6H56.9c-0.15,0-0.27,0.06-0.37,0.15c-0.1,0.1-0.15,0.23-0.15,0.37v19.14c0,0.15,0.06,0.27,0.15,0.37 c0.1,0.1,0.23,0.15,0.37,0.15h9.07c0.15,0,0.27-0.06,0.37-0.15c0.1-0.1,0.15-0.23,0.15-0.37V55.12c0-0.15-0.06-0.27-0.15-0.37 C66.25,54.64,66.12,54.6,65.98,54.6L65.98,54.6L65.98,54.6z M6.98,13.97h31.49V4.94c0-1.37,0.56-2.6,1.45-3.49 C40.82,0.56,42.06,0,43.41,0h36.06c1.37,0,2.59,0.56,3.49,1.45c0.89,0.89,1.45,2.14,1.45,3.49v9.03h31.49 c1.93,0,3.67,0.79,4.92,2.06c1.27,1.27,2.06,3.01,2.06,4.92v16.86c-7.89,5.41-16.03,10.02-24.42,13.78 c-8.44,3.78-17.14,6.71-26.14,8.73v-6.74c0-1.54-0.63-2.96-1.64-3.98c-1.01-1.01-2.43-1.64-3.98-1.64H56.17l0,0 c-1.54,0-2.96,0.63-3.98,1.64c-1.01,1.01-1.64,2.43-1.64,3.98v6.59c-8.76-2.01-17.25-4.89-25.48-8.58 C16.45,47.73,8.1,42.96,0,37.36V20.95c0-1.93,0.79-3.67,2.06-4.92C3.32,14.76,5.07,13.97,6.98,13.97L6.98,13.97L6.98,13.97z M122.88,47.81v45.76c0,1.93-0.79,3.67-2.06,4.92c-1.27,1.27-3.01,2.06-4.92,2.06H6.98c-1.93,0-3.67-0.79-4.92-2.06 C0.79,97.22,0,95.48,0,93.57V47.39c6.89,4.42,13.98,8.28,21.27,11.55c9.41,4.22,19.17,7.45,29.29,9.61v7.25 c0,1.54,0.63,2.96,1.64,3.98c1.01,1.01,2.44,1.64,3.98,1.64h10.53c1.54,0,2.96-0.63,3.98-1.64c1.01-1.01,1.64-2.43,1.64-3.98v-7.6 l0.11,0.46c10.31-2.17,20.25-5.43,29.83-9.73C109.33,55.77,116.2,52.05,122.88,47.81L122.88,47.81z M75.71,6.73H47.19 c-0.17,0-0.31,0.06-0.44,0.19c-0.1,0.1-0.19,0.27-0.19,0.44v6.42h29.75V7.36c0-0.17-0.06-0.31-0.19-0.44 c-0.1-0.1-0.27-0.19-0.44-0.19H75.71L75.71,6.73z"/>
                </g>
            </svg>
              <span className="text-base">Jobs</span>
            </div>
          </Navbar.Link>
        </Navbar.Content>
        <Navbar.Content
        css={{

            gap:'10px'
        }}
        >
            <a href="/auth"><button className="hover:bg-slate-400 w-32 h-12 rounded-3xl">Join now</button></a>
            <button className="border-2 w-32 h-12 rounded-3xl border-blue-700 text-blue-800 hover:bg-blue-100">Sign in</button>
        </Navbar.Content>
        <Navbar.Collapse>
          {collapseItems.map((item, index) => (
            <Navbar.CollapseItem
              key={item}
              activeColor="secondary"
              css={{
                color: index === collapseItems.length - 1 ? "$error" : "",
              }}
              isActive={index === 2}
            >
              <Link
                color="inherit"
                css={{
                  minWidth: "100%",
                }}
                href="#"
              >
                {item}
              </Link>
            </Navbar.CollapseItem>
          ))}
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}