import { FaTachometerAlt } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import { RiComputerLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import { FaUserAlt } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";

function Sidebar() {
  return (
    <div className="slide bg-white min-h-screen">
      <ul className="pt-10 pl-6 flex flex-col gap-8">
        <li>
          <Link to={"/admindashboard"}>
            <div className="flex text-[#555] gap-3 items-center hover:text-blue-500">
              <div><FaTachometerAlt /></div>
              <div>Dashboard</div>
            </div>
          </Link>
        </li>
        <li>
          <Link to={"/admindashboard/mainuser"}>
            <div className="flex text-[#555] gap-3 items-center hover:text-blue-500">
              <div><FaUsers /></div>
              <div>Users</div>
            </div>
          </Link>
        </li>
        <li>
          <Link to={"/admindashboard/computers"}>
            <div className="flex text-[#555] gap-3 items-center hover:text-blue-500">
              <div><RiComputerLine /></div>
              <div>Computers</div>
            </div>
          </Link>
        </li>
        <li>
          <Link to={"/admindashboard/idtypes"}>
            <div className="flex text-[#555] gap-3 items-center hover:text-blue-500">
              <div><FaUserAlt /></div>
              <div>Id Proof Types</div>
            </div>
          </Link>
        </li>
        <li>
          <Link to={"/admindashboard"}>
            <div className="flex text-[#555] gap-3 items-center hover:text-blue-500">
              <div><FaSearch /></div>
              <div>Search</div>
            </div>
          </Link>
        </li>

        
      </ul>
    </div>
  )
}

export default Sidebar
