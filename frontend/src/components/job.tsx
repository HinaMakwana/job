import { Button } from "flowbite-react";
import { useRouter } from "next/router";
import { useState } from "react";

let job1Array = [
  "Engineering",
  "Business Development",
  "Finance",
  "Administrative Assistant",
  "Retail  Associate",
  "Customer Service",
  "Operations",
  "Information Technology",
  "Marketing",
  "Human resources",
];
let job2Array = [
  "Healthcare Service",
  "Sales",
  "Program and Project Management",
  "Accounting",
  "Arts and Design",
  "Community and Social Services",
  "Consulting",
  "Education",
  "Legal",
  "Media and Communications",
  "Product Management",
];
export default function Job() {
  const [show, setShow] = useState(false);
  const router = useRouter();
  const renderPage = () => {
    router.push("signup");
  };
  return (
    <section className="flex gap-10 px-40 py-20 h-max" id="job">
      <div className="basis-3/5">
        <span className="text-5xl">
          Find the right job or internship for you
        </span>
      </div>
      <div className="basis-3/5">
        <div>
          <div className="flex flex-wrap gap-3">
            {job1Array.map((name: string) => (
              <div key={name}>
                <Button
                  onClick={renderPage}
                  className="bg-transparent text-black border-2 border-black rounded-full w-32 h-14 hover:text-white hover:border-transparent"
                >
                  {name}
                </Button>
              </div>
            ))}
            {show && (
              <div className="flex flex-wrap gap-3">
                {job2Array.map((name: string) => (
                  <div key={name}>
                    <Button
                      onClick={renderPage}
                      className="bg-transparent text-black border-2 border-black rounded-full h-14 hover:text-white hover:border-transparent"
                    >
                      {name}
                    </Button>
                  </div>
                ))}
              </div>
            )}
            <div>
              <Button
                onClick={() => {
                  setShow((prev) => !prev);
                }}
                className="bg-transparent text-black border-2 border-black rounded-full w-32 hover:text-white hover:border-transparent"
              >
                {show ? "Show Less" : "Show More"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
