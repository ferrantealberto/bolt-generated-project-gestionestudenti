import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../firebase'

function StudentManager() {
  const { className } = useParams()
  const [students, setStudents] = useState([])

  useEffect(() => {
    const fetchStudents = async () => {
      const querySnapshot = await getDocs(collection(db, 'classes', className, 'students'))
      const studentsData = querySnapshot.docs.map(doc => doc.data())
      setStudents(studentsData)
    }
    fetchStudents()
  }, [className])

  return (
    <div className="student-manager">
      <h1>Gestione Studenti - Classe {className}</h1>
      <div className="students-list">
        {students.map((student, index) => (
          <div key={index} className="student-card">
            <h3>{student.nome} {student.cognome}</h3>
            <p>Matricola: {student.matricola}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default StudentManager
