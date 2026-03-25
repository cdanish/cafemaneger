import axios from 'axios';
import { useEffect, useState } from 'react'
import SummaryApi from '../../../common/SummaryApi';
import Title from '../../../components/Title';
import { confirmDelete, sweetAlertError, sweetAlertSuccess } from '../../../components/SweetAlert';
import { Link } from 'react-router-dom';
import { MdDelete, MdEdit } from 'react-icons/md';

function Computer() {
    //loading
        const [loading, setLoading] = useState(true);
    
        //all ids 
        const [iddata, setIddata] = useState([]);
    
        //limit varisable
        const [limit,setLimit] = useState("5");
    
        //pagination
        const [paginate, setPaginate] = useState({
            limit: limit,
            page: 1,
            totalPages: 1,
            pagingCounter: 1,
            hasPrevPage: false,
            hasNextPage: false,
            prevPage: null,
            nextPage: null
        });
    
        //Status type
        const [statusNumber, setStatusNumber] = useState("all");


        const getallComputers = async (page, limit, status) => {
      // console.log(limit);

       // console.log(page);
        try {
            // console.log(paginate.limit,"me2")
           // console.log(`${SummaryApi.allComputers.url}`)
            const response = await axios.get(`${SummaryApi.allComputers.url}?page=${page}&limit=${limit}&statusNumber=${status}`, { withCredentials: true });
            // console.log(`${SummaryApi.allidproof.url}?page=${paginate.page}&limit={paginate.limit}`)
            // console.log(response?.data?.allcomputers?.docs);
            setIddata(response?.data?.allcomputers?.docs)
            setPaginate((prev) => (
                {
                    ...prev,
                  //  limit: response?.data?.allIdTypes?.limit,
                    page: response?.data?.allcomputers?.page,
                    totalPages: response?.data?.allcomputers?.totalPages,
                    pagingCounter: response?.data?.allcomputers?.pagingCounter,
                    hasPrevPage: response?.data?.allcomputers?.hasPrevPage,
                    hasNextPage: response?.data?.allcomputers?.hasNextPage,
                    prevPage: response?.data?.allcomputers?.prevPage,
                    nextPage: response?.data?.allcomputers?.nextPage

                }
            ))
        } catch (error) {
            sweetAlertError({ msg: error });
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getallComputers(paginate.page, limit, statusNumber);
    }, [paginate.page, statusNumber,limit])

    // pagination buttons
    const [pagebutton, setPagebuttons] = useState([]);



    const handlePageChange = (page) => {

        if (page > 0 && page <= paginate.totalPages) {
            setPaginate(prev => ({ ...prev, page }))
        }
        //console.log(paginate.page)
    }

    //pagination
    useEffect(() => {
        const buttons = [];

        for (let i = 1; i <= paginate.totalPages; i++) {
            buttons.push(i);
        }

        setPagebuttons(buttons);
        //console.log("me", paginate?.totalPages);

    }, [paginate.totalPages]);




    const handleStutusNumber = (e) => {
        const value = e.target.value;
        // console.log(value);
        setStatusNumber(value);
        setPaginate((prev) => (
            {
                ...prev,
                limit: limit,
                page: 1,


            }
        ))

    }


    //limit bar
    const handleLimit =(e)=>{
        setLimit(e.target.value);
        setPaginate((prev) => (
            {
                ...prev,
                limit: limit,
                page: 1,


            }
        ))
    }

    //delete 
    const handleDelete = async(id)=>{
        const isConfirmed = await confirmDelete();
        if (!isConfirmed) return 
        
        try {
            setLoading(true);
            const response = await axios.get(`${SummaryApi.deleteComputer.url(id)}`,{withCredentials:true});
            if(response?.data?.success){
                sweetAlertSuccess({msg:response?.data?.message});
                getallComputers(paginate.page, limit, statusNumber);
                setLoading(false);
            }

        }catch (error) {
            sweetAlertError({ msg: error });
        } finally {
            setLoading(false);
        }
    }

  return (
    <div className="bg-[#e0e0e0] w-full pt-2 px-2" id="idTypes">
            <div className="p-4">
                <Title title={"computers"} button={true} buttontext={"+ Computer"} navto={"/admindashboard/addEditComputers"}/>
            </div>
            <div id="overviewtable rounded-lg bg-[#f7f7f7]" className="w-full px-4">
                <div className="flex p-4 items-center justify-between bg-[#f7f7f7]">
                    <div className=" font-bold text-xl text-md-md">
                        Computer List
                    </div>
                    <div className="flex justify-end">
                        
                        <select onChange={handleStutusNumber} value={statusNumber} className="border p-2 rounded-sm text-sm capitalize">
                            <option value="0">Free</option>
                            <option value="1">Booked</option>
                            <option value="all" >All Types Ids</option>
                        </select>
                        
                    </div>
                </div>
                {/* search and limit */}
                <div className="flex justify-between bg-[#f7f7f7] py-2 px-4">
                    <div className="limit">
                        <div className="text-md capitalize my-1">show</div>
                        <select className="border py-2 rounded-sm flex w-[100px] text-sm capitalize" value={limit} onChange={handleLimit}>
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="15">15</option>
                            <option value="20">20</option>
                        </select>
                        <div className="text-md capitalize my-1">entries</div>
                    </div>
                    <div className="search">
                        <div className="text-md  text-right capitalize">search :</div>
                        <input type="text" className="border border-solid border-black" />
                    </div>

                </div>



                <div className="overflow-x-auto">
                    <table className="w-full border-collapse bg-white">
                        <thead className="bg-black text-white">
                            <tr>
                                <th className="p-3 text-left">Sl.No</th>
                                <th className="p-3 text-left">ComputerName</th>
                                <th className="p-3 text-left">ComputerLocation</th>
                                <th className="p-3 text-left">Status</th>
                                <th className="p-3 text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {

                                iddata && iddata.length > 0 && (
                                    iddata.map((el, index) => {
                                        return (

                                            <tr className="border-b" key={index}>
                                                <td className="p-3">{(paginate.page - 1) * paginate.limit + index + 1}</td>
                                                <td className="p-3">{el?.computerName}</td>
                                                <td className="p-3">{el?.systemLocation}</td>
                                                <td className="p-3 capitalize">
                                                    {el?.status === "1" ? 'Booked' : 'free'}
                                                </td>
                                                <td className="p-3 text-center flex gap-3 justify-center">
                                                    <div className="bg-gray-500 rounded-full w-fit p-2 text-white cursor-pointer">
                                                        <Link className=""to={`/admindashboard/addEditComputers/${el._id}`}><MdEdit /></Link>
                                                    </div>
                                                    <div className="bg-gray-500 rounded-full w-fit p-2 text-white cursor-pointer" onClick={()=>handleDelete(el._id)}>
                                                        <MdDelete />
                                                    </div>
                                                </td>
                                            </tr>

                                        )
                                    })

                                )
                            }
                        </tbody>
                    </table>



                    {iddata && iddata.length === 0 && (
                        <div className="py-4 bg-white text-md capitalize text-center font-bold w-full">
                            nodata
                        </div>
                    )}

                    {/* pagination button */}
                    <div className="flex mt-4 justify-end gap-[2px] mb-6">

                        {
                            paginate?.hasPrevPage && (
                                <button
                                    onClick={() => handlePageChange(paginate.prevPage )}
                                    className="p-2 font-medium text-md bg-white text-gray-500 cursor-pointer capitalize rounded-l-md hover:text-blue-400">previous</button>
                            )
                        }
                        {pagebutton.map((el) => (
                            <button
                                key={el}
                                onClick={() => handlePageChange(el)}
                                className={`px-3 py-1  cursor-pointer
                                ${paginate.page === el
                                        ? 'bg-blue-500 text-white'
                                        : 'bg-white text-black'
                                    }`}
                            >
                                {el}
                            </button>
                        ))}
                        {
                            paginate?.hasNextPage && (
                                <button
                                    onClick={() => handlePageChange(paginate.nextPage )}
                                    className="p-2 font-medium text-md bg-white text-gray-500 cursor-pointer capitalize rounded-r-md hover:text-blue-400">next</button>
                            )
                        }

                    </div>




                </div>
            </div>
        </div>
  )
}

export default Computer
