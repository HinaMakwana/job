import { Button } from "flowbite-react";

let arr = [
  "Marketing",
  "Agriculture",
  "Public Administration",
  "Healthcare",
  "Engineering",
  "IT Services",
  "Sustainability",
  "Business Administration",
  "Telecommunications",
  "Show all",
];
export default function Article() {
  return (
    <section
      className="flex gap-10 px-40 py-20 h-max lg:flex-row sm:flex-col"
      id="article"
    >
      <div className="basis-3/5">
        <span className="text-5xl">Explore collaborative articles</span>
        <p className="text-xl">
          We’re unlocking community knowledge in a new way. Experts add insights
          directly into each article, started with the help of AI.
        </p>
      </div>
      <div className="basis-3/5">
        <div>
          <div className="flex flex-wrap gap-3">
            {arr.map((name:string)=> (
                <div key={name}>
                    <Button className="bg-transparent text-black border-2 border-black rounded-full w-32 h-14 hover:text-white hover:border-transparent">
                        {name}
                    </Button>
                </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
