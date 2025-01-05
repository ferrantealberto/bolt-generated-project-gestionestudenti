import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as XLSX from 'xlsx'
import { collection, addDoc } from 'firebase/firestore'
import { db } from '../firebase'

function FileUpload({ setClasses }) {
  const [file, setFile] = useState(null)
  const navigate = useNavigate()

  const handleUpload = async (e) => {
    e.preventDefault()
    const reader = new FileReader()
    reader.onload = async (e) => {
      const data = new Uint8Array(e.target.result)
      const workbook = XLSX.read(data, { type: 'array' })
      const sheetName = workbook.SheetNames[0]
      const worksheet = workbook.Sheets[sheetName]
      const json = XLSX.utils.sheet_to_json(worksheet)
      
      // Process data
      const classes = processData(json)
      setClasses(classes)
      await saveToFirebase(classes)
      navigate('/classes')
    }
    reader.readAsArrayBuffer(file)
  }

  const processData = (data) => {
    const classesMap = new Map()

    data.forEach(row => {
      const classData = {
        id: row.id,
        name: row.name,
        school: row.school,
        date: row.date,
        timestamp: row.timestamp
      }

      if (!classesMap.has(row.class)) {
        classesMap.set(row.class, [])
      }
      classesMap.get(row.class).push(classData)
    })

    return Array.from(classesMap.keys())
  }

  const saveToFirebase = async (classes) => {
    try {
      // Save each class and its students
      for (const className of classes) {
        const classRef = await addDoc(collection(db, 'classes'), {
          className,
          createdAt: new Date()
        })

        const students = processData().get(className)
        for (const student of students) {
          await addDoc(collection(db, 'classes', classRef.id, 'students'), {
            ...student,
            classId: classRef.id
          })
        }
      }
    } catch (error) {
      console.error('Error saving to Firebase:', error)
    }
  }

  return (
    <div className="upload-container">
      <h1>Carica il file delle classi</h1>
      <form onSubmit={handleUpload}>
        <input 
          type="file" 
          accept=".xlsx"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <button type="submit">Carica</button>
      </form>
    </div>
  )
}

export default FileUpload
