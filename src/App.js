import { BrowserRouter, Route, Routes } from "react-router-dom";
import BookEdit from "./BookEdit";
import Home from "./Home";
import StudentEdit from "./StudentEdit";


function App() {
  return(
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/student/edit/:id' element={<StudentEdit/>}/>
      <Route path='/book/edit/:id' element={<BookEdit/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App;
