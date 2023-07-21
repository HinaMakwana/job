import { Button } from "flowbite-react";

export default function Post() {
    return (
        <section className="flex gap-10 px-40 py-20 h-max" id="post">
            <div className="basis-3/5">
                <span className="text-5xl">Post your job for millions of people to see</span>
            </div>
            <div className="basis-3/5">
                <div >
                    <div className="flex flex-wrap gap-3">
                        <div>
                            <Button className="bg-transparent text-blue-600 border-2 border-blue-600 rounded-full w-28 h-12 hover:text-white hover:border-transparent">
                                <a href="auth">Post a job</a>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}