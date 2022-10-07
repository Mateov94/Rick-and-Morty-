import React from 'react'

const locationInfo = ({location}) => {


  return (
    <article>
      <h2 className='name_Location'>{location?.name}</h2>
      <div className='Info__container'>
        <ul>
        <li className='Info-description'><span>Type:</span>{location?.type}</li>
        <li className='Info-description'><span>Dimension:</span>{location?.dimension}</li>
        <li className='Info-description'><span>Population:</span>{location?.residents.length}</li>
      </ul>
      </div>
      
    </article>
  )
}

export default locationInfo