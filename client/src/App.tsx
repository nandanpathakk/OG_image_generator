import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Home } from "./page/Home"
import { AddPost } from "./page/AddPost"

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/addpost" element={<AddPost/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
