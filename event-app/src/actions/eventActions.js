import {
  FETCH_EVENTS_REQUEST,
  FETCH_EVENTS_SUCCES,
  FETCH_EVENTS_FAIL,
  EVENT_CREATE_FAIL,
  EVENT_CREATE_REQUEST,
  EVENT_CREATE_SUCCESS,
  EVENT_EDIT_FAIL,
  EVENT_EDIT_REQUEST,
  EVENT_EDIT_SUCCESS,
  EVENT_DELETE_FAIL,
  EVENT_DELETE_REQUEST,
  EVENT_DELETE_SUCCESS,
} from './types'
import { API } from 'aws-amplify'
import { toast } from 'react-toastify'
import Geocode from 'react-geocode'
import axios from 'axios'

export const fetchWeather = async (eventLocation2, date1) => {
  Geocode.setApiKey(process.env.REACT_APP_GOOGLE_API_KEY)
  Geocode.setLocationType('ROOFTOP')

  let currentDate = new Date()
  let dateRange = new Date()

  dateRange.setDate(dateRange.getDate() + 7)
  if (eventLocation2.label && date1) {
    const loc = await Geocode.fromAddress(eventLocation2.value.terms[0].value)
    const { lat, lng } = loc.results[0].geometry.location
    if (date1 > dateRange) {
      toast(
        'Event weather forecast cannot be loaded because it is more than 7 days in the future'
      )
    } else {
      toast('Getting weather info')
      const APIkey = process.env.REACT_APP_GOOGLE_OPEN_WEATHER_API_KEY
      const forecast = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&exclude=current,hourly,minutely,alerts&units=metric&appid=${APIkey}`
      const diffTime = Math.abs(currentDate - date1)
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
      const req = axios.get(forecast)
      const res = await req

      return `${res.data.daily[diffDays].weather[0].description} ${res.data.daily[diffDays].temp.day}°C`
    }
  } else {
    toast('location and date required')
  }
}

export const fetchEvents = () => async (dispatch) => {
  try {
    dispatch({
      type: FETCH_EVENTS_REQUEST,
    })
    const data = await API.get('eventapi', '/events/id')
    dispatch({
      type: FETCH_EVENTS_SUCCES,
      payload: data,
    })
  } catch (error) {
    const message = error.response && error.response.data.error.message
    dispatch({
      type: FETCH_EVENTS_FAIL,
      payload: message,
    })
  }
}

export const createEvent = (eventData) => async (dispatch) => {
  try {
    dispatch({
      type: EVENT_CREATE_REQUEST,
    })

    const { data } = await API.post('eventapi', '/events', {
      body: eventData,
    })

    toast('Event Added')
    dispatch({
      type: EVENT_CREATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    const message = error.response && error.response.data.error.message
    if (error && message) {
      toast(message)
    }
    dispatch({
      type: EVENT_CREATE_FAIL,
      payload: message,
    })
  }
}

export const editEvent = (id, eventData) => async (dispatch) => {
  try {
    dispatch({
      type: EVENT_EDIT_REQUEST,
    })
    const data = await API.put('eventapi', `/events/${id}`, {
      body: eventData,
    })
    toast('Event Update Successful')
    dispatch({
      type: EVENT_EDIT_SUCCESS,
      payload: data.data,
    })
    return data.data
  } catch (error) {
    const message = error.response && error.response.data.error.message
    dispatch({
      type: EVENT_EDIT_FAIL,
      payload: message,
    })
  }
}

export const deleteEvent = (id) => async (dispatch) => {
  try {
    dispatch({
      type: EVENT_DELETE_REQUEST,
    })

    const data = await API.del('eventapi', `/events/${id}`)
    toast('Event Deleted Successful')
    dispatch({
      type: EVENT_DELETE_SUCCESS,
      payload: id,
    })
  } catch (error) {
    const message = error.response && error.response.data.error.message
    dispatch({
      type: EVENT_DELETE_FAIL,
      payload: message,
    })
  }
}
