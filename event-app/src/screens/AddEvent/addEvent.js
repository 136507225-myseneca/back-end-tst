import { useState } from 'react'
import { toast } from 'react-toastify'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import DesktopDatePicker from '@mui/lab/DesktopDatePicker'
import TextField from '@mui/material/TextField'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'
import Button from '../../componets/Button'
import { fetchWeather } from '../../actions/eventActions'

const AddEvent = ({ onAdd }) => {
  const [eventName, setEventName] = useState('')
  const [date1, setDate1] = useState(new Date())
  const [weather, setWeather] = useState('')
  const [eventLocation2, setEventLocation] = useState('')

  const onSubmit = (e) => {
    e.preventDefault()
    if (!eventName) {
      toast('Please add a task')
      return
    }
    let eventLocation = eventLocation2.label
    const date = date1.toLocaleDateString('en-US')
    onAdd({ eventName, date, eventLocation, weather })
    setEventName('')
    setDate1('')
    setEventLocation('')
  }

  const getWeather = async (e) => {
    e.preventDefault()
    const data = await fetchWeather(eventLocation2, date1)
    setWeather(data)
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <form className='add-form' onSubmit={onSubmit}>
        <div className='form-control'>
          <label>Event Name</label>
          <input
            type='text'
            placeholder='Add Event'
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
          />
        </div>

        <div className='form-control2'>
          <label>Event Location</label>
          <GooglePlacesAutocomplete
            apiKey={process.env.REACT_APP_GOOGLE_API_KEY}
            selectProps={{
              value: eventLocation2,
              onChange: (e) => setEventLocation(e),
            }}
          />
        </div>
        <div className='form-control'>
          <label>Event Date</label>
          <DesktopDatePicker
            value={date1}
            minDate={new Date()}
            onChange={(e) => {
              setDate1(e)
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </div>
        <div className='weather-container'>
          <div className='form-control'>
            <label>Weather</label>
            <TextField disabled value={weather} />
          </div>
          <Button color='green' text='Get weather' onClick={getWeather} />
        </div>

        <div className='form-control form-control-check'></div>

        <input type='submit' value='Save Event' className='btn btn-block' />
      </form>
    </LocalizationProvider>
  )
}

export default AddEvent
