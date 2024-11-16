import Link from "next/link";
import Button from "../utils/Button";


const table = () => {
  return (
    <div className="overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
               NAME
            </th>
            <th scope="col" className="px-6 py-3">
              DOJ
            </th>
            <th scope="col" className="px-6 py-3">
              Fees
            </th>
            <th scope="col" className="px-6 py-3">
              status
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
           <Link href="/aboutPerson"> <th
              scope="row"
              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              Ayush patel
            </th></Link>
            <td className="px-6 py-4">11/12/24</td>
            <td className="px-6 py-4">400</td>
            <td className="text-white"><Button status="paid"/></td>
            <td className="px-6 py-4">
              <a
                href="#"
                className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
              >
                Edit
              </a>
            </td>
          </tr>
          <tr>
           <Link href="/aboutPerson"> <th
              scope="row"
              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              Ayush patel
            </th></Link>
            <td className="px-6 py-4">11/12/24</td>
            <td className="px-6 py-4">400</td>
            <td className=" text-black"><Button status="unpaid"/></td>
            <td className="px-6 py-4">
              <a
                href="#"
                className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
              >
                Edit
              </a>
            </td>
          </tr>
          <tr>
           <Link href="/aboutPerson"> <th
              scope="row"
              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              Ayush patel
            </th></Link>
            <td className="px-6 py-4">11/12/24</td>
            <td className="px-6 py-4">400</td>
            <td className=" text-white"><Button status="unpaid"/></td>
            <td className="px-6 py-4">
              <a
                href="#"
                className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
              >
                Edit
              </a>
            </td>
          </tr>
          <tr>
           <Link href="/aboutPerson"> <th
              scope="row"
              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              Ayush patel
            </th></Link>
            <td className="px-6 py-4">11/12/24</td>
            <td className="px-6 py-4">400</td>
            <td className=" text-white"><Button status="unpaid"/></td>
            <td className="px-6 py-4">
              <a
                href="#"
                className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
              >
                Edit
              </a>
            </td>
          </tr>
          <tr>
           <Link href="/aboutPerson"> <th
              scope="row"
              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              Ayush patel
            </th></Link>
            <td className="px-6 py-4">11/12/24</td>
            <td className="px-6 py-4">400</td>
            <td className=" text-white"><Button status="unpaid"/></td>
            <td className="px-6 py-4">
              <a
                href="#"
                className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
              >
                Edit
              </a>
            </td>
          </tr>
          <tr>
           <Link href="/aboutPerson"> <th
              scope="row"
              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              Ayush patel
            </th></Link>
            <td className="px-6 py-4">11/12/24</td>
            <td className="px-6 py-4">400</td>
            <td className=" text-white"><Button status="unpaid"/></td>
            <td className="px-6 py-4">
              <a
                href="#"
                className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
              >
                Edit
              </a>
            </td>
          </tr>
          <tr>
           <Link href="/aboutPerson"> <th
              scope="row"
              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              Ayush patel
            </th></Link>
            <td className="px-6 py-4">11/12/24</td>
            <td className="px-6 py-4">400</td>
            <td className=" text-white"><Button status="unpaid"/></td>
            <td className="px-6 py-4">
              <a
                href="#"
                className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
              >
                Edit
              </a>
            </td>
          </tr>
          <tr>
           <Link href="/aboutPerson"> <th
              scope="row"
              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              Ayush patel
            </th></Link>
            <td className="px-6 py-4">11/12/24</td>
            <td className="px-6 py-4">400</td>
            <td className=" text-white"><Button status="unpaid"/></td>
            <td className="px-6 py-4">
              <a
                href="#"
                className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
              >
                Edit
              </a>
            </td>
          </tr>
          <tr>
           <Link href="/aboutPerson"> <th
              scope="row"
              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              Ayush patel
            </th></Link>
            <td className="px-6 py-4">11/12/24</td>
            <td className="px-6 py-4">400</td>
            <td className=" text-white"><Button status="unpaid"/></td>
            <td className="px-6 py-4">
              <a
                href="#"
                className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
              >
                Edit
              </a>
            </td>
          </tr>
          <tr>
           <Link href="/aboutPerson"> <th
              scope="row"
              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              Ayush patel
            </th></Link>
            <td className="px-6 py-4">11/12/24</td>
            <td className="px-6 py-4">400</td>
            <td className=" text-white"><Button status="unpaid"/></td>
            <td className="px-6 py-4">
              <a
                href="#"
                className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
              >
                Edit
              </a>
            </td>
          </tr>
          <tr>
           <Link href="/aboutPerson"> <th
              scope="row"
              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              Ayush patel
            </th></Link>
            <td className="px-6 py-4">11/12/24</td>
            <td className="px-6 py-4">400</td>
            <td className=" text-white"><Button status="unpaid"/></td>
            <td className="px-6 py-4">
              <a
                href="#"
                className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
              >
                Edit
              </a>
            </td>
          </tr>
          <tr>
           <Link href="/aboutPerson"> <th
              scope="row"
              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              Ayush patel
            </th></Link>
            <td className="px-6 py-4">11/12/24</td>
            <td className="px-6 py-4">400</td>
            <td className=" text-white"><Button status="unpaid"/></td>
            <td className="px-6 py-4">
              <a
                href="#"
                className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
              >
                Edit
              </a>
            </td>
          </tr>
          <tr>
           <Link href="/aboutPerson"> <th
              scope="row"
              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              Ayush patel
            </th></Link>
            <td className="px-6 py-4">11/12/24</td>
            <td className="px-6 py-4">400</td>
            <td className=" text-white"><Button status="unpaid"/></td>
            <td className="px-6 py-4">
              <a
                href="#"
                className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
              >
                Edit
              </a>
            </td>
          </tr>
          <tr>
           <Link href="/aboutPerson"> <th
              scope="row"
              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              Ayush patel
            </th></Link>
            <td className="px-6 py-4">11/12/24</td>
            <td className="px-6 py-4">400</td>
            <td className=" text-white"><Button status="unpaid"/></td>
            <td className="px-6 py-4">
              <a
                href="#"
                className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
              >
                Edit
              </a>
            </td>
          </tr><tr>
           <Link href="/aboutPerson"> <th
              scope="row"
              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              Ayush patel
            </th></Link>
            <td className="px-6 py-4">11/12/24</td>
            <td className="px-6 py-4">400</td>
            <td className=" text-white"><Button status="unpaid"/></td>
            <td className="px-6 py-4">
              <a
                href="#"
                className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
              >
                Edit
              </a>
            </td>
          </tr>
          <tr>
           <Link href="/aboutPerson"> <th
              scope="row"
              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              Ayush patel
            </th></Link>
            <td className="px-6 py-4">11/12/24</td>
            <td className="px-6 py-4">400</td>
            <td className=" text-white"><Button status="unpaid"/></td>
            <td className="px-6 py-4">
              <a
                href="#"
                className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
              >
                Edit
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default table;
