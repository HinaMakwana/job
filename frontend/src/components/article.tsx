import { Button } from "flowbite-react";

export default function Article() {
    return (
        <section className="flex gap-10 px-40 py-20 h-max lg:flex-row sm:flex-col" id="article">
            <div className="basis-3/5">
                <span className="text-5xl">Explore collaborative articles</span>
                <p className="text-xl">We’re unlocking community knowledge in a new way. Experts add insights directly into each article, started with the help of AI.</p>
            </div>
            <div className="basis-3/5">
                <Button.Group >
                    <div className="flex flex-wrap gap-3">
                        <div>
                            <Button className="bg-transparent text-black border-2 border-black rounded-full w-32 h-14 hover:text-white hover:border-transparent">
                            Marketing
                            </Button>
                        </div>
                        <div>
                            <Button className="bg-transparent text-black border-2 border-black rounded-full w-32 h-14 hover:text-white hover:border-transparent">
                            Agriculture
                            </Button>
                        </div>
                        <div>
                            <Button className="bg-transparent text-black border-2 border-black rounded-full w-52 h-14 hover:text-white hover:border-transparent">
                            Public Administration
                            </Button>
                        </div>
                        <div>
                            <Button className="bg-transparent text-black border-2 border-black rounded-full w-28 h-14 hover:text-white hover:border-transparent">
                            Healthcare
                            </Button>
                        </div>
                        <div>
                            <Button className="bg-transparent text-black border-2 border-black rounded-full w-32 h-14 hover:text-white hover:border-transparent">
                            Engineering
                            </Button>
                        </div>
                        <div>
                            <Button className="bg-transparent text-black border-2 border-black rounded-full w-36 h-14 hover:text-white hover:border-transparent">
                            IT Services
                            </Button>
                        </div>
                        <div>
                            <Button className="bg-transparent text-black border-2 border-black rounded-full w-36 h-14 hover:text-white hover:border-transparent">
                            Sustainability
                            </Button>
                        </div>
                        <div>
                            <Button className="bg-transparent text-black border-2 border-black rounded-full w-56 h-14 hover:text-white hover:border-transparent">
                            Business Administration
                            </Button>
                        </div>
                        <div>
                            <Button className="bg-transparent text-black border-2 border-black rounded-full h-14 hover:text-white hover:border-transparent">
                            Telecommunications
                            </Button>
                        </div>
                        <div>
                            <Button className="bg-transparent text-blue-600 border-2 border-blue-600 rounded-full w-32 h-14 hover:text-white hover:border-transparent">
                            Show all
                            </Button>
                        </div>
                    </div>
                </Button.Group>
            </div>
        </section>
    )
}