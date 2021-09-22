import Event from './Event'

const Events = ({ events, onDelete, onEdit }) => {
  return (
    <>
      {events.map((event, index) => (
        <Event key={index} event={event} onDelete={onDelete} onEdit={onEdit} />
      ))}
    </>
  )
}

export default Events
