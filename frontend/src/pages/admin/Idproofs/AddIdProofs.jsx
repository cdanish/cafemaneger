import { useEffect, useState } from "react";
import Title from "../../../components/Title"
import { FaListUl } from "react-icons/fa";
import { sweetAlertSuccess, sweetAlertWarning } from "../../../components/SweetAlert";
import axios from 'axios';
import SummaryApi from "../../../common/SummaryApi";
import { useNavigate, useParams } from "react-router-dom";

function AddIdProofs() {

  const [formdata, setFromData] = useState({
    name: "",
    status: "0",
  });

  const { id } = useParams();
  // console.log(id);

  //navigation
  const navigate = useNavigate();
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
      const response = await axios.get(SummaryApi.getid.url(id), { withCredentials: true });
      // console.log(response);
      if (response?.data?.success) {
        setFromData((prev) => ({
          ...prev,
          name: response?.data?.singleId.name,
          status: response?.data?.singleId.status,
        }))
      }
    }
    getdata();


  }, [id]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    //console.log(formdata);

    if (!formdata.name || !formdata.status) {
      return sweetAlertWarning({ msg: "please fill all details" });
    }

    // console.log(SummaryApi.addid.url);
    if (id) {
      // console.log(SummaryApi.updateId.url(id));
      const response = await axios.post(SummaryApi.updateId.url(id), formdata, { withCredentials: true });
      if (response?.data?.success) {
        sweetAlertSuccess({ msg: response?.data?.message });
        navigate("/admindashboard/idtypes");
        
      }
    } else {
      const response = await axios.post(SummaryApi.addid.url, formdata, { withCredentials: true });
      if (response?.data?.success) {
        sweetAlertSuccess({ msg: response?.data?.message });
        navigate("/admindashboard/idtypes");
        // formdata?.name("");
        // formdata.status("");
      }
    }







  }

  return (
    <div className="bg-[#e0e0e0] w-full pt-2 px-2" id="addids">
      <div className="p-4">
        <Title title={id ? "Edit id type" : "Add ID Type"} buttontext={<><div className="flex gap-2 items-center"><FaListUl /> all types ids</div></>} button={true} navto={"/admindashboard/idtypes"} />
      </div>

      <div className="p-4 w-full">
        <h2 className="capitalize font-medium py-3 px-5 mb-0 bg-black/5 border-b border-black/10">
          {id ? "edit details" : "Add details"}
        </h2>
        <form onSubmit={handleSubmit} className="w-full bg-white">

          <div className="max-w-3xl bg-white p-6 mx-auto">


            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-6 w-full items-center">

              <label className="md:col-span-3 text-gray-700 font-medium">
                Name
              </label>

              <div className="md:col-span-9">
                <input
                  type="text"
                  name="name"
                  placeholder="Enter Name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg
               focus:outline-none focus:ring-1 focus:ring-green-500
               focus:border-green-500 transition duration-200"
                  value={formdata.name}
                  onChange={handleChange}
                />
              </div>

            </div>


            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-6 w-full items-center">

              <label className="md:col-span-3 text-gray-700 font-medium">
                Status
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
                  <option value="1">Active</option>
                  <option value="0">Inactive</option>
                </select>
              </div>

            </div>


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

export default AddIdProofs
