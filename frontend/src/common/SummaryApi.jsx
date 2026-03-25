const BackEndDomain = "http://localhost:3000";

const SummaryApi = {
    adminLogin:{
        url:`${BackEndDomain}/api/adminlogin`
    },
    admindetails:{
        url:`${BackEndDomain}/api/admindetails`
    },
    adminLogout:{
        url:`${BackEndDomain}/api/adminlogout`
    },
    allusers:{
        url:`${BackEndDomain}/api/getallusers`
    },
    allidproof:{
        url:`${BackEndDomain}/api/getallIds`
    },
    addid:{
        url:`${BackEndDomain}/api/addid`,
        method: 'POST'
    },
    getid:{
        url:(id)=>`${BackEndDomain}/api/getsingleid/${id}`,
        method:'get'
    },
    updateId:{
        url:(id)=>`${BackEndDomain}/api/updateId/${id}`,
    },
    deleteID:{
        url:(id)=>`${BackEndDomain}/api/deleteId/${id}`,
    },
    allComputers:{
        url:`${BackEndDomain}/api/getallcomputers`,
    },
    getSingleComputer:{
        url:(id)=>`${BackEndDomain}/api/singlecomputer/${id}`
    },
    addSingleComputer:{
        url:`${BackEndDomain}/api/addcomputer`
    },
    updateComputer:{
        url:(id)=>`${BackEndDomain}/api/updatecomputer/${id}`
    },
    deleteComputer:{
        url:(id)=>`${BackEndDomain}/api/deletecomputer/${id}`
    },
    getalluser:{
        url:`${BackEndDomain}/api/getallusers`
    },
    getsingleUser:{
        url:(id)=>`${BackEndDomain}/api/getsinleUser/${id}`
    },
    getidcomputer:{
        url:`${BackEndDomain}/api/getidcomputer`
    },
    addusers:{
        url:`${BackEndDomain}/api/adduser`
    },
    updateusers:{
        url:(id)=>`${BackEndDomain}/api/updateuser/${id}`
    },
    deleteuser:{
        url:(id)=>`${BackEndDomain}/api/delteuser/${id}`
    },
    updateAdmin:{
        url:`${BackEndDomain}/api/adminupdate`
    },
    updatePass:{
        url:`${BackEndDomain}/api/adminupdatepass`
    }
    
}

export default SummaryApi