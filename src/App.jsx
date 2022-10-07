import axios from 'axios'
import { useState, useEffect } from 'react'
import './App.css'
import CardResident from './components/CardResident'
import ErrorScreen from './components/ErrorScreen'
import FilterList from './components/FilterList'
import LocationInfo from './components/LocationInfo'
import getRandomNumber from './utils/getRandomNumber'

//importando imagen para titulo
import titulo from './assets/img/nombre.png'


function App() {

  // Para guardar una location
  const [location, setlocation] = useState()

  // Para guardar la información del input y hacer la petición cuando se hace submit
  const [searchInput, setSearchInput] = useState('')
  // Para guardar las sugerencias de la api
  const [suggestedList, setSuggestedList] = useState()
  // Para indicar si hay error o no 
  const [hasError, setHasError] = useState(false)
  


  useEffect(() => {
    let id = getRandomNumber()
    if (searchInput) {
      id = searchInput

    }

    const URL = `https://rickandmortyapi.com/api/location/${id}`

    axios.get(URL)
      .then(res => {
        setHasError(false)
        setlocation(res.data)
      })
      .catch(err => setHasError(true))
  }, [searchInput])

  const handleSubmit = event => {
    event.preventDefault()
    setSearchInput(event.target.idLocation.value)

  }

  const handleChange = event => {
    if (event.target.value === '') {

      setSuggestedList()
    }
    else {
      const URL = `https://rickandmortyapi.com/api/location?name=${event.target.value}`

      axios.get(URL)
        .then(res => setSuggestedList(res.data.results))
        .catch(err => console.log(true))
    }
  }


  return (
    <><header className='header2'>
      <img className='title' src={titulo} />
    </header>
    
    <div className="App">
    <div className='header-information'>
      <form onSubmit={handleSubmit} className="buscador">
          <input
            id='idLocation'
            placeholder='Enter a nother number from 1 to 126'
            type="text"
            onChange={handleChange} />
          <button className='BtnBuscar'>Search</button>
          <FilterList
            suggestedList={suggestedList}
            setSearchInput={setSearchInput} />
        </form>
        
    </div>

        {hasError ?
          <ErrorScreen />
          :
          <>
          <div className="locations">
            <LocationInfo
                location={location}
                setSearchInput={setSearchInput} />
          </div>
            
            <div className='card-container'>

              {location?.residents.map(url => (
                <CardResident
                  key={url}
                  url={url} />
              ))}
            </div>
          </>}
      </div></>
  )
}

export default App
