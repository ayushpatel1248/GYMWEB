import FloatingNavDemo from "../LandingPage/navbar";
import WordPullUp from "@/components/ui/word-pull-up";
import { UserCircleIcon } from "@heroicons/react/24/solid";

const AboutPerson = () => {
  return (
    <div>
      <WordPullUp
        className="text-4xl font-bold tracking-[-0.02em] text-blue-700 dark:text-white md:text-7xl md:leading-[5rem]"
        words="SV Fitness"
      />
      <FloatingNavDemo />
      <div className="bg-white p-3 shadow-sm rounded-sm mt-20">
        <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
          <span className="text-blue-700">
            <svg
              className="h-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </span>
          <span className="tracking-wide">About</span>
        </div>

        <div className="text-gray-700">
          <div className="">
          <UserCircleIcon
            aria-hidden="true"
            className="h-28 w-28 text-gray-300"
          />
          </div>
          <div className="grid md:grid-cols-2 text-sm">
            <div className="grid grid-cols-2">
              <div className="px-4 py-2 font-semibold">First Name</div>
              <div className="px-4 py-2">ayush</div>
            </div>
            <div className="grid grid-cols-2">
              <div className="px-4 py-2 font-semibold">Last Name</div>
              <div className="px-4 py-2">patel</div>
            </div>
            <div className="grid grid-cols-2">
              <div className="px-4 py-2 font-semibold">Gender</div>
              <div className="px-4 py-2">male</div>
            </div>
            <div className="grid grid-cols-2">
              <div className="px-4 py-2 font-semibold">Contact No.</div>
              <div className="px-4 py-2">+91 998001001</div>
            </div>
            <div className="grid grid-cols-2">
              <div className="px-4 py-2 font-semibold">Current Address</div>
              <div className="px-4 py-2">Beech Creek, PA, Pennsylvania</div>
            </div>
            <div className="grid grid-cols-2">
              <div className="px-4 py-2 font-semibold">Permanant Address</div>
              <div className="px-4 py-2">Arlington Heights, IL, Illinois</div>
            </div>
            <div className="grid grid-cols-2">
              <div className="px-4 py-2 font-semibold">Email.</div>
              <div className="px-4 py-2">
                <a className="text-blue-800" href="mailto:jane@example.com">
                  jane@example.com
                </a>
              </div>
            </div>
            <div className="grid grid-cols-2">
              <div className="px-4 py-2 font-semibold">Birthday</div>
              <div className="px-4 py-2">Feb 06, 1998</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPerson;
