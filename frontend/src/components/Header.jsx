import { Link, useNavigate } from "react-router-dom"
import { FaUserTie } from "react-icons/fa";
import { FaCaretDown } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import { sweetAlertError, sweetAlertSuccess } from "./SweetAlert";
import axios from "axios";
import SummaryApi from "../common/SummaryApi";
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "../store/userSlice";




function Header() {


    const [drop, setDrop] = useState(false);







    ///dispatch to clear localstorage and redux clear
    const dispatch = useDispatch();

    //navigation
    const navigation = useNavigate();
    //logout
    const logout = async () => {

        try {
            const response = await axios.get(SummaryApi.adminLogout.url, { withCredentials: true });

            dispatch(clearUser());
            sweetAlertSuccess({ msg: "Logout Successfully" })

           // console.log(response?.data);

            navigation("/")

        } catch (error) {
            sweetAlertError({ msg: error });
        }
    }

    const handleDropDown = () => setDrop(prev => !prev);

    const popupRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (popupRef.current && !popupRef.current.contains(e.target)) {
                // check if currently open
              //  setDrop(false);

            }
        }



        if (drop) document.addEventListener("click", handleClickOutside);

        return () => document.removeEventListener("click", handleClickOutside);

    }, [drop]);



    //get user details.
    const user = useSelector((state) => state?.user?.user);

    






    return (
        <div id="header" className="bg-[#f5f5f5] px-8 flex justify-between">
            <div className="py-6 px-0">
                <h2 className="text-lg md:text-md capitalize font-semibold tracking-wider"><Link className="outline-none cursor-pointer" to={"/admin/admindashboard"}>CyberCafe <br />Management</Link></h2>
            </div>
            <div className="flex justify-center items-center gap-4 py-6 px-8 cursor-pointer relative" onClick={() => handleDropDown()}>
                <div>
                    <FaUserTie className="text-md md:text-3xl" />
                </div>
                <div className="text-md md:text-md uppercase font-semibold tracking-wide select-none" >
                    {user?.username}
                </div>
                <div>
                    <FaCaretDown className="text-md md:text-2xl" />
                </div>

                {/* //  */}
                <div ref={popupRef} className={`w-80 bg-white pt-6 -left-30 absolute top-20  dropdown ${drop ? 'block transition-all duration-400 ease-in-out' : 'hidden'}`}>
                    <div className="flex justify-start gap-3 px-4 ">
                        <div className="py-2">
                            <FaUserTie className="text-md md:text-6xl" />
                        </div>
                        <div>
                            <h5 className="text-lg font-semibold capitalize select-none">Hi {user?.adminname}</h5>
                            <p className="text-sm capitalize text-gray-500 ">Hi site admistrator</p>
                        </div>
                    </div>
                    <hr />
                    <div className="flex items-center gap-3 pt-4 pb-4 px-4 hover:bg-[#2563EB] hover:text-white transition-all duration-300 ease-in">
                        <div className="">
                            <FaUserTie className="text-lg" />
                        </div>
                        <div className="text-sm font-semibold capitalize">
                            <Link to={"/admindashboard/adminprofile"}>
                                my profile
                            </Link>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 pb-4 pt-4 px-4 hover:bg-[#2563EB] hover:text-white transition-all duration-300 ease-in-out">
                        <div className="">
                            <FaUserTie className="text-lg" />
                        </div>
                        <Link to={"/admindashboard/adminpassword"}>
                            <div className="text-sm font-semibold capitalize">
                                change password
                            </div>
                        </Link>
                        
                    </div>
                    <hr />
                    <div className="flex items-center gap-3 pt-4 pb-4 px-4 hover:bg-[#2563EB] hover:text-white transition-all duration-300 ease-in-out" onClick={() => logout()}>
                        <div className="">
                            <FaUserTie className="text-lg" />
                        </div>
                        <div className="text-sm font-semibold capitalize" >
                            logout
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header
