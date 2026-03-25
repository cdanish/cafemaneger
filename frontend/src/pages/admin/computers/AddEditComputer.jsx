import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Title from '../../../components/Title';
import { FaListUl } from 'react-icons/fa';
import axios from 'axios';
import SummaryApi from '../../../common/SummaryApi';
import { sweetAlertSuccess } from '../../../components/SweetAlert';

function AddEditComputer() {

    const [formdata, setFromData] = useState({
    computerName: "",
    status: "0",
    systemLocation:"",
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
      const response = await axios.get(SummaryApi.getSingleComputer.url(id), { withCredentials: true });
      // console.log(response);
      if (response?.data?.success) {
        setFromData((prev) => ({
          ...prev,
          computerName: response?.data?.getsinglecomputer.computerName,
          status: response?.data?.getsinglecomputer.status,
          systemLocation: response?.data?.getsinglecomputer.systemLocation,
        }))
      }
    }
    getdata();


  }, [id]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formdata);

    if (!formdata.computerName || !formdata.status || !formdata.systemLocation) {
      return sweetAlertWarning({ msg: "please fill all details" });
    }

    // console.log(SummaryApi.addid.url);
    if (id) {
      // console.log(SummaryApi.updateId.url(id));
      const response = await axios.post(SummaryApi.updateComputer.url(id), formdata, { withCredentials: true });
      if (response?.data?.success) {
        sweetAlertSuccess({ msg: response?.data?.message });
        navigate("/admindashboard/computers");
        
      }
    } else {
      const response = await axios.post(SummaryApi.addSingleComputer.url, formdata, { withCredentials: true });
      if (response?.data?.success) {
        sweetAlertSuccess({ msg: response?.data?.message });
        navigate("/admindashboard/computers");
        // formdata?.name("");
        // formdata.status("");
      }
    }

  }

  return (
    <div className="bg-[#e0e0e0] w-full pt-2 px-2" id="addids">
      <div className="p-4">
        <Title title={id ? "Edit computer" : "Add computer"} buttontext={<><div className="flex gap-2 items-center"><FaListUl /> all computers</div></>} button={true} navto={"/admindashboard/computers"} />
      </div>

      <div className="p-4 w-full">
        <h2 className="capitalize font-medium py-3 px-5 mb-0 bg-black/5 border-b border-black/10">
          {id ? "edit details" : "Add details"}
        </h2>
        <form onSubmit={handleSubmit} className="w-full bg-white">

          <div className="max-w-3xl bg-white p-6 mx-auto">


            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-6 w-full items-center">

              <label className="md:col-span-3 text-gray-700 font-medium">
                Computer Name
              </label>

              <div className="md:col-span-9">
                <input
                  type="text"
                  name="computerName"
                  placeholder="Enter Name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg
               focus:outline-none focus:ring-1 focus:ring-green-500
               focus:border-green-500 transition duration-200"
                  value={formdata.computerName}
                  onChange={handleChange}
                />
              </div>

            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-6 w-full items-center">

              <label className="md:col-span-3 text-gray-700 font-medium">
                Computer Location
              </label>

              <div className="md:col-span-9">
                <input
                  type="text"
                  name="systemLocation"
                  placeholder="Enter Name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg
               focus:outline-none focus:ring-1 focus:ring-green-500
               focus:border-green-500 transition duration-200"
                  value={formdata.systemLocation}
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
                  <option value="1">Booked</option>
                  <option value="0">Free</option>
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

export default AddEditComputer
