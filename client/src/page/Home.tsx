import { Link } from 'react-router-dom';
import { Post } from '../components/Post';
import { IoIosAdd } from "react-icons/io";

export const Home = () => {
  return (
    <div className="mx-auto flex">
      <div className="w-1/4 p-4 border-l">
        <Link 
          to="/addpost"
          className="flex items-center p-4 mb-4 text-lg font-semibold text-gray-700 rounded hover:bg-gray-200 cursor-pointer border-b">
          Add Post <IoIosAdd /> 
        </Link>
      </div>
      <div className="w-3/4 p-4">
        <Post />
      </div>
    </div>
  );
};
