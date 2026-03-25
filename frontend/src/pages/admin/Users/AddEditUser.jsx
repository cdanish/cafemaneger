import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { sweetAlertError, sweetAlertSuccess, sweetAlertWarning } from "../../../components/SweetAlert";
import Title from "../../../components/Title";
import { FaListUl } from "react-icons/fa";
import SummaryApi from "../../../common/SummaryApi";





//date
const getCurrentDateTime = (date) => {
    let d

    if (date && !isNaN(date)) {
        d = new Date(Number(date)) // timestamp case
    } else if (date) {
        d = new Date(date) // string date
    } else {
        d = new Date() // fallback current time
    }

    if (isNaN(d.getTime())) {
        d = new Date() // final fallback
    }

    const offset = d.getTimezoneOffset()
    const local = new Date(d.getTime() - offset * 60000)

    return local.toISOString().slice(0, 16)
}



function AddEditUser() {
    const { id } = useParams();
    // console.log(id);

    //navigation
    const navigate = useNavigate();

    const [formdata, setFromData] = useState({
        username: "",
        email: "",
        phone: "",
        address: "",
        computer: [],
        computerValue: "",
        idProof: [],
        idProofvalue: "",
        idProofNumber: "",
        inTime: getCurrentDateTime(),
        outTime: getCurrentDateTime(),
        entryId: "",
        remark: "",
        fees: "",
        status: "",

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

    //getiddata
    useEffect(() => {

        if (!id) return;
        const getdata = async () => {
            const response = await axios.get(SummaryApi.getsingleUser.url(id), { withCredentials: true });
            //console.log(response?.data);
            if (response?.data?.success) {
                setFromData((prev) => ({
                    ...prev,
                    username: response?.data?.getSingleUser.username,
                    email: response?.data?.getSingleUser.email,
                    phone: response?.data?.getSingleUser?.phone,
                    address: response?.data?.getSingleUser?.address,
                    computerValue: response?.data?.computerdetails,
                    idProofvalue: response?.data?.idproofdetails,
                    inTime: getCurrentDateTime(response?.data?.getSingleUser?.inTime),
                    idProofNumber: "9999999",
                    status:response?.data?.getSingleUser?.status,
                    // idProofvalue:response?.data?.idproofdetails?.name,
                    // computerValue:response?.data?.computerdetails?.computerName
                }))
            }
        }
        getdata();


    }, [id]);




    ///submit
    const handleSubmit = async (e) => {
        e.preventDefault();

        //console.log(formdata);
        if ((!formdata.idProofvalue || !formdata) || (!formdata.computerValue)) {
            return sweetAlertWarning({ msg: "please fill all details" });
        }

        const payloads = {
            username: formdata.username,
            email: formdata.email,
            phone: formdata.phone,
            address: formdata.address,
            computer: id ? formdata.computerValue?._id : formdata.computerValue,
            idProof: id ? formdata.idProofvalue?._id : formdata.idProofvalue,
            idProofNumber: formdata.idProofNumber,
            inTime: formdata.inTime,
            remark: formdata.remark ? formdata.remark : "visit hour",
            fees: formdata.fees ? formdata.fees : 50,
            status: formdata.status ? formdata.status : 1,
            outTime:formdata?.outTime,
            status : id ? formdata.status : "0"
        }

        // console.log(payloads);

        // console.log(SummaryApi.addid.url);
        try {

            if (id) {
               // console.log(SummaryApi.updateId.url(id));
                const response = await axios.post(SummaryApi.updateusers.url(id), payloads, { withCredentials: true });
                if (response?.data?.success) {
                    sweetAlertSuccess({ msg: response?.data?.message });
                    navigate("/admindashboard/mainuser");

                }
            } else {
                const response = await axios.post(SummaryApi.addusers.url, payload, { withCredentials: true });
                if (response?.data?.success) {
                    sweetAlertSuccess({ msg: response?.data?.message });
                    navigate("/admindashboard/mainuser");
                    // formdata?.name("");
                    // formdata.status("");
                }
            }

        } catch (error) {
            console.log(error);
            sweetAlertError({ msg: error?.response?.data?.message })
        }

    }

    //getallids&computers
    const getidcomputer = async () => {
        try {

            const response = await axios.get(`${SummaryApi.getidcomputer.url}`, { withCredentials: true });
            // console.log(response?.data);
            if (response?.data?.success) {
                setFromData((prev) => (
                    {
                        ...prev,
                        computer: response?.data?.getallComputer,
                        idProof: response?.data?.getAllIds
                    }))
            }


        } catch (error) {
            console.log(error);
            sweetAlertError({ msg: error })
        };
    }



    //run only edit is avaiable
    useEffect(() => {
        if (!id) {
            getidcomputer()
        }
        // console.log(formdata);
    }, [id])






    return (
        <div className="bg-[#e0e0e0] w-full pt-2 px-2" id="addids">
            <div className="p-4">
                <Title title={id ? "Edit User" : "Add User"} buttontext={<><div className="flex gap-2 items-center"><FaListUl /> all Users</div></>} button={true} navto={"/admindashboard/mainuser"} />
            </div>

            <div className="p-4 w-full">
                <h2 className="capitalize font-medium py-3 px-5 mb-0 bg-black/5 border-b border-black/10">
                    {id ? "edit details" : "Add details"}
                </h2>
                <form onSubmit={handleSubmit} className="w-full bg-white">

                    <div className="max-w-3xl bg-white p-6 mx-auto">


                        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-6 w-full items-center">

                            <label className="md:col-span-3 text-gray-700 font-medium">
                                User Name
                            </label>

                            <div className="md:col-span-9">
                                <input
                                    type="text"
                                    name="username"
                                    placeholder="User Name"
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
                                Email
                            </label>

                            <div className="md:col-span-9">
                                <input
                                    type="text"
                                    name="email"
                                    placeholder="Enter Email"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg
               focus:outline-none focus:ring-1 focus:ring-green-500
               focus:border-green-500 transition duration-200"
                                    value={formdata.email}
                                    onChange={handleChange}
                                />
                            </div>

                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-6 w-full items-center">

                            <label className="md:col-span-3 text-gray-700 font-medium">
                                Phone
                            </label>

                            <div className="md:col-span-9">
                                <input
                                    type="text"
                                    name="phone"
                                    placeholder="Enter Phone"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg
               focus:outline-none focus:ring-1 focus:ring-green-500
               focus:border-green-500 transition duration-200"
                                    value={formdata.phone}
                                    onChange={handleChange}
                                />
                            </div>

                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-6 w-full items-center">

                            <label className="md:col-span-3 text-gray-700 font-medium">
                                Address
                            </label>

                            <div className="md:col-span-9">
                                <input
                                    type="text"
                                    name="address"
                                    placeholder="Enter Address"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg
               focus:outline-none focus:ring-1 focus:ring-green-500
               focus:border-green-500 transition duration-200"
                                    value={formdata.address}
                                    onChange={handleChange}
                                />
                            </div>

                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-6 w-full items-center">

                            <label className="md:col-span-3 text-gray-700 font-medium">
                                Computer Name
                            </label>

                            <div className="md:col-span-9">
                                <select
                                    name="computerValue"
                                    value={formdata.computerValue}
                                    defaultValue={id && formdata.computerValue?._id }
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg
               focus:outline-none focus:ring-1 focus:ring-green-500
               focus:border-green-500 transition duration-200"
                                >
                                   
                                    {
                                        id ? formdata.computerValue && <option value={formdata.computerValue?._id}>{formdata.computerValue.computerName}</option> :

                                            formdata.computer.length > 0 && formdata.computer.map((el, index) => (
                                                <option key={index} value={el?._id}>{el?.computerName}</option>
                                            ))
                                    }




                                </select>
                            </div>

                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-6 w-full items-center">

                            <label className="md:col-span-3 capitalize text-gray-700 font-medium">
                                in Time
                            </label>

                            <div className="md:col-span-9">
                                <input
                                    type="datetime-local"
                                    name="inTime"

                                    placeholder="Enter Name"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg
               focus:outline-none focus:ring-1 focus:ring-green-500
               focus:border-green-500 transition duration-200"
                                    value={formdata.inTime}
                                    onChange={handleChange}
                                />
                            </div>

                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-6 w-full items-center">


                            <label className="md:col-span-3 text-gray-700 font-medium">
                                Id Proof
                            </label>


                            <div className="md:col-span-4">
                                <select
                                    name="idProofvalue"
                                    value={formdata.idProofvalue}
                                    defaultValue={id && formdata.idProofvalue?._id}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg
                 focus:outline-none focus:ring-1 focus:ring-green-500
                 focus:border-green-500 transition duration-200"
                                >

                                    
                                    {
                                        id ? formdata.idProofvalue && <option value={formdata.idProofvalue?._id}>{formdata.idProofvalue?.name}</option> :

                                            formdata.idProof.length > 0 && formdata.idProof.map((el, index) => (
                                                <option key={index} value={el?._id}>{el?.name}</option>
                                            ))
                                    }


                                </select>
                            </div>


                            <div className="md:col-span-5">
                                <input
                                    type="text"
                                    name="idProofNumber"
                                    value={formdata.idProofNumber}
                                    onChange={handleChange}
                                    placeholder="Enter Id Proof Number"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg
                 focus:outline-none focus:ring-1 focus:ring-green-500
                 focus:border-green-500 transition duration-200"
                                />
                            </div>

                        </div>

                        {
                            id && (
                                <div>
                                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-6 w-full items-center">

                                        <label className="md:col-span-3 capitalize text-gray-700 font-medium">
                                            out Time
                                        </label>

                                        <div className="md:col-span-9">
                                            <input
                                                type="datetime-local"
                                                name="outTime"

                                                placeholder=""
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg
               focus:outline-none focus:ring-1 focus:ring-green-500
               focus:border-green-500 transition duration-200 bg-amber-300 cursor-pointer"
                                                value={formdata.outTime}
                                                onChange={handleChange}
                                            />
                                        </div>

                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-6 w-full items-center">

                                        <label className="md:col-span-3 capitalize text-gray-700 font-medium">
                                            fees
                                        </label>

                                        <div className="md:col-span-9">
                                            <input
                                                type="text"
                                                name="fees"
                                                placeholder="Enter fees"
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg
               focus:outline-none focus:ring-1 focus:ring-green-500
               focus:border-green-500 transition duration-200"
                                                value={formdata.fees}
                                                onChange={handleChange}
                                            />
                                        </div>

                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-6 w-full items-center">

                                        <label className="md:col-span-3 capitalize text-gray-700 font-medium">
                                            remark
                                        </label>

                                        <div className="md:col-span-9">
                                            <textarea
                                                type="text"
                                                name="remark"
                                                placeholder="Enter remark"
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg
               focus:outline-none focus:ring-1 focus:ring-green-500
               focus:border-green-500 transition duration-200"
                                                value={formdata.remark}
                                                onChange={handleChange}
                                            />
                                        </div>

                                    </div>


                                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-6 w-full items-center">


                            <label className="md:col-span-3 capitalize text-gray-700 font-medium">
                                status
                            </label>


                            <div className="md:col-span-9">
                                <select
                                    name="status"
                                    value={formdata.status}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg
                 focus:outline-none focus:ring-1 focus:ring-green-500
                 focus:border-green-500 transition duration-200"
                                >

                                    <option key={"0"} value={"0"}>Check Out</option>
                                   <option key={"1"} value={"1"}>Check In</option>
                                   


                                </select>
                            </div>


                            

                        </div>



                                </div>



                            )
                        }




                        <div className="flex justify-end">
                            <button
                                type="submit"
                                className="bg-green-500 hover:bg-green-600 text-white
             px-6 py-2 rounded-lg transition cursor-pointer duration-200"
                            >
                                {id ? "Update" : "Save"}
                            </button>
                        </div>

                    </div>

                </form>
            </div>
        </div>
    )
}

export default AddEditUser
