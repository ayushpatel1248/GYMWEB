import WordPullUp from "@/components/ui/word-pull-up";
import Form from "./form";
import FloatingNavDemo from "../LandingPage/navbar";


const AddPerson = () => {

  return (
    <div>
       <FloatingNavDemo />
        <WordPullUp
        className="text-4xl font-bold tracking-[-0.02em] text-blue-700 dark:text-white md:text-7xl md:leading-[5rem]"
        words="SV Fitness"
      />
      <Form/>
    </div>
  )
}

export default AddPerson