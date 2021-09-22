import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import {
  fetchEvents,
  createEvent,
  deleteEvent,
} from '../../actions/eventActions'
import Header from '../../componets/Header'
import AddEvent from '../AddEvent/addEvent'
import Events from '../../componets/Events'
import 'react-toastify/dist/ReactToastify.css'
import { useHistory } from 'react-router-dom'

const DispalyEvents = () => {
  const [showAddEvent, setShowAddEvent] = useState(false)

  const history = useHistory()

  const dispatch = useDispatch()
  const events = useSelector((state) => state.event.events)
  useEffect(() => {
    dispatch(fetchEvents())
  }, [dispatch])

  const addEvent = async (event) => {
    dispatch(createEvent(event))
    console.log(event)
  }
  const onEdit = async (event) => {
    history.push(`/${event.id}`, { state: event })
  }

  const deleteTask = async (id) => {
    let response = window.confirm('Are you sure you wish to delete this item?')
    if (response == true) {
      dispatch(deleteEvent(id))
    } else {
      return
    }
  }

  return (
    <div className='container'>
      <ToastContainer />
      <Header
        onAdd={() => setShowAddEvent(!showAddEvent)}
        showAdd={showAddEvent}
      />
      {showAddEvent && <AddEvent onAdd={addEvent} />}
      {events.length > 0 ? (
        <Events events={events} onDelete={deleteTask} onEdit={onEdit} />
      ) : (
        'No Event Currently Add Events'
      )}
    </div>
  )
}

export default DispalyEvents
