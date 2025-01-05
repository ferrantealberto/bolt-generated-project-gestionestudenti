import React from 'react'
import { Link } from 'react-router-dom'

function ClassList({ classes = [] }) {
  return (
    <div className="class-list">
      <h1>Lista Classi</h1>
      {classes.length > 0 ? (
        <div className="classes-grid">
          {classes.map((className, index) => (
            <Link 
              key={index}
              to={`/class/${className}`}
              className="class-card"
            >
              {className}
            </Link>
          ))}
        </div>
      ) : (
        <p>Nessuna classe disponibile. Carica un file XLSX per iniziare.</p>
      )}
    </div>
  )
}

export default ClassList
