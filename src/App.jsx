import { useState } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import FileUpload from './components/FileUpload'
import ClassList from './components/ClassList'
import StudentManager from './components/StudentManager'
import './App.css'

function App() {
  const [classes, setClasses] = useState([])

  return (
    <BrowserRouter>
      <div className="app-container">
        <nav className="nav-menu">
          <Link to="/">Home</Link>
          <Link to="/classes">Classi</Link>
        </nav>
        <Routes>
          <Route path="/" element={<FileUpload setClasses={setClasses} />} />
          <Route path="/classes" element={<ClassList classes={classes} />} />
          <Route path="/class/:className" element={<StudentManager />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
