import { Button } from "flowbite-react";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Job() {
    const [show,setShow] = useState(false)
    const router = useRouter()
    const renderPage = () => {
        router.push('signup')
    }
    return (
        <section className="flex gap-10 px-40 py-20 h-max" id="job">
            <div className="basis-3/5">
                <span className="text-5xl">Find the right job or internship for you</span>
            </div>
            <div className="basis-3/5">
                <div>
                    <div className="flex flex-wrap gap-3">
                        <div>
                            <Button onClick={renderPage} className="bg-transparent text-black border-2 border-black rounded-full w-32 h-14 hover:text-white hover:border-transparent">
                            Engineering
                            </Button>
                        </div>
                        <div>
                            <Button onClick={renderPage} className="bg-transparent text-black border-2 border-black rounded-full h-14 hover:text-white hover:border-transparent">
                            Business Development
                            </Button>
                        </div>
                        <div>
                            <Button onClick={renderPage} className="bg-transparent text-black border-2 border-black rounded-full w-52 h-14 hover:text-white hover:border-transparent">
                            Finance
                            </Button>
                        </div>
                        <div>
                            <Button onClick={renderPage} className="bg-transparent text-black border-2 border-black rounded-full h-14 hover:text-white hover:border-transparent">
                            Administrative Assistant
                            </Button>
                        </div>
                        <div>
                            <Button onClick={renderPage} className="bg-transparent text-black border-2 border-black rounded-full h-14 hover:text-white hover:border-transparent">
                            Retail  Associate
                            </Button>
                        </div>
                        <div>
                            <Button onClick={renderPage} className="bg-transparent text-black border-2 border-black rounded-full h-14 hover:text-white hover:border-transparent">
                            Customer Service
                            </Button>
                        </div>
                        <div>
                            <Button onClick={renderPage} className="bg-transparent text-black border-2 border-black rounded-full w-36 h-14 hover:text-white hover:border-transparent">
                            Operations
                            </Button>
                        </div>
                        <div>
                            <Button onClick={renderPage} className="bg-transparent text-black border-2 border-black rounded-full w-56 h-14 hover:text-white hover:border-transparent">
                            Information Technology
                            </Button>
                        </div>
                        <div>
                            <Button onClick={renderPage} className="bg-transparent text-black border-2 border-black rounded-full h-14 hover:text-white hover:border-transparent">
                            Marketing
                            </Button>
                        </div>
                        <div>
                            <Button onClick={renderPage} className="bg-transparent text-black border-2 border-black rounded-full h-14 hover:text-white hover:border-transparent">
                            Human resources
                            </Button>
                        </div>
                        {
                            show &&
                            <div className="flex flex-wrap gap-3">
                                <div>
                                    <Button onClick={renderPage} className="bg-transparent text-black border-2 border-black rounded-full h-14 hover:text-white hover:border-transparent">
                                    Healthcare Service
                                    </Button>
                                </div>
                                <div>
                                    <Button onClick={renderPage} className="bg-transparent text-black border-2 border-black rounded-full w-32 h-14 hover:text-white hover:border-transparent">
                                    Sales
                                    </Button>
                                </div>
                                <div>
                                    <Button onClick={renderPage} className="bg-transparent text-black border-2 border-black rounded-full h-14 hover:text-white hover:border-transparent">
                                    Program and Project Management
                                    </Button>
                                </div>
                                <div>
                                    <Button onClick={renderPage} className="bg-transparent text-black border-2 border-black rounded-full h-14 hover:text-white hover:border-transparent">
                                    Accounting
                                    </Button>
                                </div>
                                <div>
                                    <Button onClick={renderPage} className="bg-transparent text-black border-2 border-black rounded-full h-14 hover:text-white hover:border-transparent">
                                    Arts and Design
                                    </Button>
                                </div>
                                <div>
                                    <Button onClick={renderPage} className="bg-transparent text-black border-2 border-black rounded-full h-14 hover:text-white hover:border-transparent">
                                    Community and Social Services
                                    </Button>
                                </div>
                                <div>
                                    <Button onClick={renderPage} className="bg-transparent text-black border-2 border-black rounded-full h-14 hover:text-white hover:border-transparent">
                                    Consulting
                                    </Button>
                                </div>
                                <div>
                                    <Button onClick={renderPage} className="bg-transparent text-black border-2 border-black rounded-full h-14 hover:text-white hover:border-transparent">
                                    Education
                                    </Button>
                                </div>
                                <div>
                                    <Button onClick={renderPage} className="bg-transparent text-black border-2 border-black rounded-full h-14 w-32 hover:text-white hover:border-transparent">
                                    Legal
                                    </Button>
                                </div>
                                <div>
                                    <Button onClick={renderPage} className="bg-transparent text-black border-2 border-black rounded-full h-14 hover:text-white hover:border-transparent">
                                    Media and Communications
                                    </Button>
                                </div>
                                <div>
                                    <Button onClick={renderPage} className="bg-transparent text-black border-2 border-black rounded-full h-14 hover:text-white hover:border-transparent">
                                    Product Management
                                    </Button>
                                </div>
                            </div>
                        }
                        <div>
                            <Button onClick={()=>{if(show== true){setShow(false)}else{setShow(true)}}} className="bg-transparent text-black border-2 border-black rounded-full w-32 hover:text-white hover:border-transparent">
                            {show ? 'Show Less' : 'Show More'}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}