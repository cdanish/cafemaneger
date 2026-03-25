import React, { useContext, useEffect, useState } from 'react'
import Title from '../../../components/Title'
import { FaListUl } from 'react-icons/fa'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux';
import Context from '../../../Context/Context';
import SummaryApi from '../../../common/SummaryApi';
import { useNavigate } from 'react-router-dom';
import { sweetAlertError, sweetAlertSuccess } from '../../../components/SweetAlert';
import { clearUser } from '../../../store/userSlice';

function Profilxe() {

    //get user details.
    const user = useSelector((state) => state?.user?.user);
    //console.log(user);

    //
    const {getUserDetails}  = useContext(Context);

     ///dispatch to clear localstorage and redux clear
    const dispatch = useDispatch();

    //navigation
    const navigation = useNavigate();

    const [formdata, setFromData] = useState({
        adminname: user?.adminname,
        username: user?.username,
        adminemail:user?.adminemail,
        com_name:user?.com_name,
    });

    //change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFromData(
      (prev) => ({
        ...prev,
        [name]: value,
      })
    )

  }

    


    //handle submit 
    const handleSubmit = async (e)=>{
        e.preventDefault();
        try{
            
            const response = await axios.post(SummaryApi.updateAdmin.url,formdata,{withCredentials:true});

        if(response?.data?.success){
            sweetAlertSuccess({msg:response?.data?.message})
            dispatch(clearUser());
            navigation("/")
            
        }

        }catch(error){
            console.log(error);
            sweetAlertError({msg:error?.response?.data?.message})
        }

    }


   

    return (
        <div className="bg-[#e0e0e0] w-full pt-2 px-2" id="profile">
            <div className="p-4 w-full">
                <h2 className="capitalize font-medium py-3 px-5 mb-0 bg-black/5 border-b border-black/10">
                    {"Add details"}
                </h2>
                <form onSubmit={handleSubmit} className="w-full bg-white">

                    <div className="max-w-3xl bg-white p-6 mx-auto">


                        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-6 w-full items-center">

                            <label className="md:col-span-3 text-gray-700 font-medium">
                                Admin Name
                            </label>

                            <div className="md:col-span-9">
                                <input
                                    type="text"
                                    name="adminname"
                                    placeholder="Enter Admin Name"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg
               focus:outline-none focus:ring-1 focus:ring-green-500
               focus:border-green-500 transition duration-200"
                                    value={formdata.adminname}
                                    onChange={handleChange}
                                />
                            </div>

                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-6 w-full items-center">

                            <label className="md:col-span-3 text-gray-700 font-medium">
                                Admin Username
                            </label>

                            <div className="md:col-span-9">
                                <input
                                    type="text"
                                    name="username"
                                    placeholder="Enter Admin User Name"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg
               focus:outline-none focus:ring-1 focus:ring-green-500
               focus:border-green-500 transition duration-200"
                                    value={formdata.username}
                                    onChange={handleChange}
                                />
                            </div>

                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-6 w-full items-center">

                            <label className="md:col-span-3 text-gray-700 font-medium">
                                Admin Email
                            </label>

                            <div className="md:col-span-9">
                                <input
                                    type="text"
                                    name="adminemail"
                                    placeholder="Enter Admin Email"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg
               focus:outline-none focus:ring-1 focus:ring-green-500
               focus:border-green-500 transition duration-200"
                                    value={formdata.adminemail}
                                    onChange={handleChange}
                                />
                            </div>

                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-6 w-full items-center">

                            <label className="md:col-span-3 text-gray-700 font-medium">
                                Company Name
                            </label>

                            <div className="md:col-span-9">
                                <input
                                    type="text"
                                    name="com_name"
                                    placeholder="Enter Company name"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg
               focus:outline-none focus:ring-1 focus:ring-green-500
               focus:border-green-500 transition duration-200"
                                    value={formdata.com_name}
                                    onChange={handleChange}
                                />
                            </div>

                        </div>


                        


                        <div className="flex justify-end">
                            <button
                                type="submit"
                                className="bg-green-500 hover:bg-green-600 text-white
             px-6 py-2 rounded-lg transition cursor-pointer duration-200"
                            >
                                {"Update"}
                            </button>
                        </div>

                    </div>

                </form>
            </div>
        </div>
    )
}

export default Profilxe
