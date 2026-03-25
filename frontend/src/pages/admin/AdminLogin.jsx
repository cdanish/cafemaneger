import axios from "axios";
import { useForm} from "react-hook-form";
import { useNavigate } from "react-router-dom";
import SummaryApi from "../../common/SummaryApi";
import { sweetAlertError, sweetAlertSuccess, sweetAlertWarning } from "../../components/SweetAlert";
import { useDispatch, useSelector } from "react-redux";
import { useContext, useEffect } from "react";
import Context from "../../Context/Context";
import { setUserDetails, setuserToken } from "../../store/userSlice";



function AdminLogin() {

    // const user:any = useSelector(state =>state?.user);
    // console.log(user);

    // const contextget = useContext(Context);

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const user = useSelector((state) => state.user.userToken);

    const handleLogin = async (userdata) => {
        // console.log("Login Data:", userdata);

        try {
            const response = await axios.post(SummaryApi.adminLogin.url, userdata, { withCredentials: true });

            //console.log(response?.data?.data);
            dispatch(setuserToken(response?.data?.data));
            // contextget?.getUserDetails();


            if (response?.data?.error) {
                sweetAlertWarning({ msg: response?.data?.message });
            }

            if (response?.data?.success) {

                sweetAlertSuccess({ msg: "Login Successfully" });
                //  console.log(response);
                navigate("admindashboard");

            }


        } catch (error) {
            console.log(error);
            sweetAlertError({ msg: error });
        }

    };

    useEffect(() => {
        if (user != null) {
            navigate("/admindashboard");
        }
    }, [user, navigate]);



    return (
        <div className="w-full flex justify-center">
            <div className="w-full max-w-sm  md:max-w-lg bg-white mt-10 p-10 rounded-lg shadow-md">
                <h3 className="capitalize text-2xl md:text-3xl mb-4 text-[#2563EB] text-center font-semibold">
                    Cyber Cafe Management
                </h3>
                <div className="mt-8">
                    <form onSubmit={handleSubmit(handleLogin)}>
                        <div className='grid'>
                            <label htmlFor="username" className='capitalize cursor-pointer font-medium text-md text-[#4B5563]'>Username</label>
                            <div className='py-2'>
                                <input  {...register("username", { required: "Username is required" })} type="text" id='username' name='username' placeholder='Please enter username' className='w-full border-2 p-2 rounded-md' required />

                            </div>
                            {errors.username && (
                                <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>
                            )}
                        </div>
                        <div className='grid'>
                            <label htmlFor="Password" className='capitalize cursor-pointer font-medium text-md text-[#4B5563]'>Password</label>
                            <div className='py-2'>
                                <input
                                    {...register("password", {
                                        required: "Password is required",
                                        minLength: { value: 6, message: "Minimum 6 characters" },
                                    })}
                                    type="password" id='Password' name='password' placeholder='Please enter password' className='w-full border-2 p-2 rounded-md' required />
                            </div>
                            {errors.password && (
                                <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                            )}
                        </div>
                        <button type='submit' disabled={isSubmitting} className='w-full font-semibold p-2 mt-2 cursor-pointer bg-[#2563EB] hover:bg-[#1D4ED8] text-white py-2 rounded-md'>
                            {isSubmitting ? "Logging in..." : "Login"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AdminLogin;
