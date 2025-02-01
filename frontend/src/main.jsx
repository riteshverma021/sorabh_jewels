import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Route, Routes} from "react-router-dom"
import { ToastContainer } from 'react-toastify';
import App from './App.jsx'
import Upload from './pages/uploads/Uploads.jsx';
import Display from './pages/display/Display.jsx';
import Edit from "./pages/edit/Edit.jsx"
import SchemUpload from './pages/LuckyDraw/SchemUpload.jsx';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
createRoot(document.getElementById('root')).render(
  <StrictMode>
<>
<ToastContainer />

<Router>

<Navbar />
<Routes>

<Route  path='/' element={<App/>}    />
<Route path='/admin' element ={<Upload/>} />
<Route  path='/listItem' element={<Display/>}  />
<Route path="/items/:id/edit"  element={<Edit/>} />
<Route  path='/luckydraw/scheme'  element={<SchemUpload/>}/>
</Routes>


<Footer/>

</Router>


</>



  </StrictMode>

)
