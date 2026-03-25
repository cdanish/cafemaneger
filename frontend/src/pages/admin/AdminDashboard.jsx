import { useDispatch } from "react-redux"
import Header from "../../components/Header"
import Context from "../../Context/Context"
import { Suspense, useEffect, useState } from "react";
import axios from "axios";
import SummaryApi from "../../common/SummaryApi";
import Loading from "../../components/Loading";
import { setUserDetails, setuserToken } from "../../store/userSlice";
import { sweetAlertError } from "../../components/SweetAlert";
import Sidebar from "../../components/Sidebar";
import { Outlet } from "react-router-dom";


function AdminDashboard() {


  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const usertoken = localStorage.getItem("token") || null;
  //console.log(usertoken);

  const getUserDetails = async () => {
    try {
      const response = await axios.get(
        SummaryApi.admindetails.url,
        { withCredentials: true }
      );

      const userData = response?.data?.data;

      //console.log('User data:', userData);

      if (userData) {
        dispatch(setUserDetails(userData));
      }
      dispatch(setuserToken(usertoken));

    } catch (error) {
      sweetAlertError({ msg: error?.response?.data?.message });
      if (error?.response?.data?.success === false) {
        dispatch(setuserToken(null));
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserDetails();

  }, []);

  if (loading) {
    return <Loading />;
  }






  return (
    <Context.Provider value={{
      getUserDetails,
    }}>
      <div className="mainPage">
        <Header />
        <div id="middleSection" className="bg-[#e0e0e0] w-full">

          <div className="h-screen overflow-hidden">

            <div className="grid grid-cols-12 h-full">

              {/* Sidebar */}
              <div className="col-span-2 h-full">
                <Sidebar />
              </div>

              {/* Main */}
              <div className="col-span-10 h-full mb-2 min-h-screen overflow-y-auto">
                <Suspense fallback={<Loading />}>
                  <Outlet />
                </Suspense>
              </div>

            </div>

          </div>

        </div>
      </div>
    </Context.Provider>
  )
}

export default AdminDashboard
