import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearUser } from '../../../store/userSlice';
import SummaryApi from '../../../common/SummaryApi';
import { sweetAlertError, sweetAlertSuccess, sweetAlertWarning } from '../../../components/SweetAlert';
import axios from 'axios';

function Password() {


    ///dispatch to clear localstorage and redux clear
    const dispatch = useDispatch();

    //navigation
    const navigation = useNavigate();

    const [formdata, setFromData] = useState({
        password :"",
        newpassword:"",
        comfirmpass:"",
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

    const handleSubmit = async (e)=>{
        e.preventDefault();

        if(formdata.newpassword != formdata.comfirmpass){
             sweetAlertWarning({msg:"new password and confirm password does not match"})
            return false
        }

        try{
            
            const response = await axios.post(SummaryApi.updatePass.url,formdata,{withCredentials:true});

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
                    {"Change Password"}
            </h2>
            <form onSubmit={handleSubmit} className="w-full bg-white">

                    <div className="max-w-3xl bg-white p-6 mx-auto">


                        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-6 w-full items-center">

                            <label className="md:col-span-3 text-gray-700 font-medium">
                               Old Password
                            </label>

                            <div className="md:col-span-9">
                                <input
                                    type="text"
                                    name="password"
                                    placeholder="old password"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg
               focus:outline-none focus:ring-1 focus:ring-green-500
               focus:border-green-500 transition duration-200"
                                    value={formdata.password}
                                    onChange={handleChange}
                                />
                            </div>

                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-6 w-full items-center">

                            <label className="md:col-span-3 text-gray-700 font-medium">
                                New Password
                            </label>

                            <div className="md:col-span-9">
                                <input
                                    type="text"
                                    name="newpassword"
                                    placeholder="New Password"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg
               focus:outline-none focus:ring-1 focus:ring-green-500
               focus:border-green-500 transition duration-200"
                                    value={formdata.newpassword}
                                    onChange={handleChange}
                                />
                            </div>

                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-6 w-full items-center">

                            <label className="md:col-span-3 text-gray-700 font-medium">
                                Confirm Password
                            </label>

                            <div className="md:col-span-9">
                                <input
                                    type="text"
                                    name="comfirmpass"
                                    placeholder="Confirm Password"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg
               focus:outline-none focus:ring-1 focus:ring-green-500
               focus:border-green-500 transition duration-200"
                                    value={formdata.comfirmpass}
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

export default Password
