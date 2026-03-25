import { createBrowserRouter } from 'react-router-dom'
import AdminHome from '../pages/admin/AdminHome'
import NotFound from '../components/NotFound'
import AdminLogin from '../pages/admin/AdminLogin'
import AdminDashboard from '../pages/admin/AdminDashboard'
import ProtectedRouter from '../components/ProtectedRouter'
import OverviewPage from '../pages/admin/OverviewPage'
import Users from '../pages/admin/Users'
import Idproofs from '../pages/admin/Idproofs/Idproofs'
import AddIdProofs from '../pages/admin/Idproofs/AddIdProofs'
import Computer from '../pages/admin/computers/Computer'
import AddEditComputer from '../pages/admin/computers/AddEditComputer'
import User from '../pages/admin/Users/User'
import AddEditUser from '../pages/admin/Users/AddEditUser'
import Profilxe from '../pages/admin/Admin/Profilxe'
import Password from '../pages/admin/Admin/Password'


const Router = createBrowserRouter([
    {
      path:"/",
      element:<AdminHome/>,
      children:[
        {
          index:true,
          element:(<AdminLogin/>)
        },
        {
          path:"admindashboard",
          element:(<ProtectedRouter><AdminDashboard/></ProtectedRouter>),
          children:[
            {
              path:"",
              index:true,
              element:<OverviewPage/>
            },
            {
              path:"users",
              element:<Users/>
            },
            {
              path:"idtypes",
              element:<Idproofs/>,
            },
            {
              path:"addid",
              element:<AddIdProofs/>
            },
            {
              path:`editIdtypes/:id`,
              element:<AddIdProofs/>
            },
            {
              path:`computers`,
              element:<Computer/>
            },
            {
              path:`addEditComputers/`,
              element:<AddEditComputer/>
            },
            {
              path:`addEditComputers/:id`,
              element:<AddEditComputer/>
            },
            {
              path:`mainuser`,
              element:<User/>
            },
            {
              path:`adduser`,
              element:<AddEditUser/>
            },
            {
              path:`adduser/:id`,
              element:<AddEditUser/>
            },
            {
              path:`adminprofile/`,
              element:<Profilxe/>
            },
            {
              path:`adminpassword`,
              element:<Password/>
            }

          ]
        }
      ]
    },
    {
            path:"*",
            element:<NotFound/>
    }
])

export default Router
