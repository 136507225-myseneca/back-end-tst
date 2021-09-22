import React from 'react'
import { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import TextField from '@mui/material/TextField'
import Button from '../../componets/Button'
import { useHistory } from 'react-router-dom'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import DesktopDatePicker from '@mui/lab/DesktopDatePicker'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'
import { fetchWeather, editEvent } from '../../actions/eventActions'

import 'react-toastify/dist/ReactToastify.css'

const EditEvent = (props) => {
  const { date, eventLocation, eventName, weather, id } =
    props.location.state.state
  const [editEventName, setEditEventName] = useState('')
  const [editDate, setEditDate] = useState('')
  const [editEventLocation, setEditEventLocation] = useState('')
  const [editWeather, setEditWeather] = useState('')
  const history = useHistory()
  const dispatch = useDispatch()

  useEffect(() => {
    setEditEventName(eventName)
    setEditDate(new Date(date))
    setEditEventLocation(eventLocation)
    setEditWeather(weather)
  }, [])

  const onSubmit = async (e) => {
    e.preventDefault()
    if (!editEventName) {
      toast('Please add a task')
      return
    }

    const data = {
      eventName: editEventName,
      date: editDate.toLocaleDateString('en-US'),
      weather: editWeather,
      eventLocation: editEventLocation.label,
    }
    const main = await dispatch(editEvent(id, data))
    if (main) {
      history.push('/')
    }
  }

  const getWeather = async (e) => {
    e.preventDefault()
    const data = await fetchWeather(editEventLocation, editDate)
    setEditWeather(data)
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <ToastContainer />
      <div className='container'>
        <header className='header'>
          <h1>Event Tracker</h1>

          <Button
            color={'red'}
            text={'Close'}
            onClick={() => {
              history.push('/')
            }}
          />
        </header>
        <form className='add-form'>
          <div className='form-control'>
            <label>Event Name</label>
            <input
              type='text'
              placeholder='Add Event'
              value={editEventName}
              onChange={(e) => setEditEventName(e.target.value)}
            />
          </div>
          <div className='form-control2'>
            <label>Event Location</label>
            <GooglePlacesAutocomplete
              apiKey='AIzaSyCR1pPhgjIPbVR5lNdXZ7x4lvUIQvXoIto'
              selectProps={{
                editEventLocation,
                onChange: setEditEventLocation,
              }}
            />
          </div>
          <div className='form-control'>
            <label>Event Date</label>
            <DesktopDatePicker
              value={editDate}
              minDate={new Date()}
              onChange={(e) => {
                setEditDate(e)
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </div>
          <div className='weather-container'>
            <div className='form-control'>
              <label>Weather</label>
              <TextField disabled value={editWeather} />
            </div>
            <Button color='green' text='Get weather' onClick={getWeather} />
          </div>
          <div className='form-control form-control-check'></div>

          <button className='btn btn-block' onClick={onSubmit}>
            Update Event
          </button>
        </form>
      </div>
    </LocalizationProvider>
  )
}

export default EditEvent
