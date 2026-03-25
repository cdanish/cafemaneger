import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css';
import './App.css';
// import App from './App.tsx' //we can use it as test
import {RouterProvider} from "react-router-dom";
import Router from './Routes/Router.jsx';
import { Provider } from 'react-redux';
import {store} from "./store/store.jsx";

const rootElement = document.getElementById("root");

createRoot(rootElement).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={Router}/>
    </Provider>
    
  </StrictMode>,
)
