import { MdEdit } from "react-icons/md";
import Title from "../../components/Title";
import { sweetAlertError } from "../../components/SweetAlert";
import { useEffect, useState } from "react";
import axios from "axios";
import SummaryApi from "../../common/SummaryApi";
import Loading from "../../components/Loading";
import { FaRegUser } from "react-icons/fa6";
import { GrPersonalComputer } from "react-icons/gr";
import { HiDesktopComputer } from "react-icons/hi";
import { Link } from "react-router-dom";
import DashboardCharts from "../../components/Chart";

export default function Users() {

    const [loading, setLoading] = useState(true);
    const [user, setUsers] = useState(null);
    const [alluser, setAlluser] = useState([]);





    const getuserDetails = async () => {
        try {

            const response = await axios.get(SummaryApi.allusers.url, { withCredentials: true });

            if (response?.data?.success) {
                setUsers(response?.data);
                setAlluser(response?.data?.allusers?.docs);

            }


        } catch (error) {
            sweetAlertError({ msg: error });
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {

        getuserDetails();

    }, []);

    // useEffect(() => {
    //     console.log('Users state updated:', alluser);
    // }, [alluser]);

    if (loading) {
        return <Loading />
    }

    const data = {
        activeUserCount: user?.activeUserCount,
        totalComputers: user?.totalComputers,
        activeComputers: user?.totalComputers,
    }



    return (
        <div className="bg-[#e0e0e0] w-full pt-10 pl-6" id="overview">
            <div className="p-2">
                <Title title={"overview"} button={false} buttontext={""} />
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4 w-full">

                {/* Card 1 */}
                <div className="flex items-center justify-center gap-4 h-[140px] bg-blue-700 rounded-md text-white">
                    <div className="text-5xl">
                        <FaRegUser />
                    </div>
                    <div>
                        <div className="text-4xl font-bold">{user?.activeUserCount}</div>
                        <div>Active Users</div>
                    </div>
                </div>

                {/* Card 2 */}
                <div className="flex items-center justify-center gap-4 h-[140px] bg-green-700 rounded-md text-white">
                    <div className="text-5xl">
                        <GrPersonalComputer />
                    </div>
                    <div>
                        <div className="text-4xl font-bold">{user?.totalComputers}</div>
                        <div>Computers</div>
                    </div>
                </div>

                {/* Card 3 */}
                <div className="flex items-center justify-center gap-4 h-[140px] bg-orange-700 rounded-md text-white">
                    <div className="text-5xl">
                        <HiDesktopComputer />
                    </div>
                    <div>
                        <div className="text-4xl font-bold">{user?.activeComputers}</div>
                        <div>Free computers</div>
                    </div>
                </div>

            </div>

            


           

            <DashboardCharts data={data}/>

             <div id="overviewtable" className="w-full p-4">
                <div className="bg-[#f7f7f7] p-4 border-b font-bold text-xl">
                    Active Users
                </div>
                <div className="bg-[#e0e0e0] w-full" id="users">
                    <div id="overviewtable rounded-lg bg-white" className="w-full ">

                        <div className="overflow-x-auto p-2 bg-white">
                            <table className="w-full border bg-white ">
                                <thead className="bg-black text-white">
                                    <tr className="">
                                        <th className="p-3 text-left">Sl.No</th>
                                        <th className="p-3 text-left">Entry ID</th>
                                        <th className="p-3 text-left">User Details</th>
                                        <th className="p-3 text-left">Computer</th>
                                        <th className="p-3 text-left">Timings</th>
                                        <th className="p-3 text-left">Action</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {
                                        alluser && alluser.length > 0 && (
                                            alluser.map((el, index) => {
                                                return (
                                                    <tr className="border border-l-0 border-t-0 " key={index}>
                                                        <td className="p-3 border-r ">{index + 1}</td>
                                                        <td className="p-3 border-r">{el?.entryId}</td>
                                                        <td className="p-3 border-r">
                                                            <ul>
                                                                <li className="border-b border-b-gray-500">Name: {el?.username}</li>
                                                                <li className="border-b border-b-gray-500">Email: {el?.email}</li>
                                                                <li className="border-b border-b-gray-500">Phone: {el?.phone}</li>
                                                                <li>Status: <span className='text-red-500'>{el?.status === "0" ? "Check Out" : "Check In"}</span></li>
                                                            </ul>
                                                        </td>
                                                        <td className="p-3 border-r">{el?.computer?.computerName}</td>
                                                        <td className="p-3 border-r">
                                                            {new Date(el?.inTime).toLocaleDateString('en-IN', {
                                                                day: '2-digit',
                                                                month: 'short',
                                                                year: 'numeric'
                                                            })}
                                                            <br />
                                                            {new Date(el?.inTime).toLocaleTimeString('en-IN', {
                                                                hour: '2-digit',
                                                                minute: '2-digit',
                                                                hour12: true
                                                            })}
                                                            {' - '}
                                                            {el?.outTime
                                                                ? new Date(el?.outTime).toLocaleTimeString('en-IN', {
                                                                    hour: '2-digit',
                                                                    minute: '2-digit',
                                                                    hour12: true
                                                                })
                                                                : '00:00 AM'}
                                                        </td>
                                                        <td className="p-3 text-center">
                                                            <Link to={`/admindashboard/adduser/${el?._id}`}>
                                                                <div className="bg-gray-500 rounded-full cursor-pointer w-fit p-2 text-white">
                                                                    <MdEdit />
                                                                </div>
                                                            </Link>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        )

                                    }



                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>


            </div>

        </div>
    )
}
