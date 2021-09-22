import { FaTimes } from 'react-icons/fa'
import { FiEdit } from 'react-icons/fi'

const Event = ({ event, onDelete, onEdit }) => {
  return (
    <div className={`task  reminder`}>
      <h3>
        {event.eventName}{' '}
        <div>
          {' '}
          <FaTimes
            style={{ color: 'red', cursor: 'pointer' }}
            onClick={() => onDelete(event.id)}
          />
          <FiEdit
            style={{ color: 'green', cursor: 'pointer', marginLeft: '10px' }}
            onClick={() => onEdit(event)}
          />
        </div>
      </h3>
      <p>{event.date}</p>
      <p>{event.eventLocation}</p>
      <p>{event.weather}</p>
    </div>
  )
}

export default Event
