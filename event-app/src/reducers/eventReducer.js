import {
  EVENT_CREATE_FAIL,
  EVENT_CREATE_REQUEST,
  EVENT_CREATE_SUCCESS,
  FETCH_EVENTS_REQUEST,
  FETCH_EVENTS_FAIL,
  FETCH_EVENTS_SUCCES,
  EVENT_EDIT_FAIL,
  EVENT_EDIT_SUCCESS,
  EVENT_EDIT_REQUEST,
  EVENT_DELETE_SUCCESS,
  EVENT_DELETE_REQUEST,
  EVENT_DELETE_FAIL,
} from '../actions/types'

const initialState = {
  event: {},
  events: [],
}

export const event = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_EVENTS_REQUEST:
      return { ...state, loading: true }
    case FETCH_EVENTS_SUCCES:
      return {
        ...state,
        events: action.payload,
        error: null,
        loading: false,
      }
    case FETCH_EVENTS_FAIL:
      return { ...state, loading: false, error: action.payload }

    case EVENT_CREATE_REQUEST:
      return { ...state, loading: true, error: null }
    case EVENT_CREATE_SUCCESS:
      return {
        ...state,
        event: action.payload,
        events: [action.payload, ...state.events],
        error: null,
        loading: false,
      }
    case EVENT_CREATE_FAIL:
      return { ...state, loading: false, error: action.payload }
    case EVENT_EDIT_REQUEST:
      return { ...state, loading: true }
    case EVENT_EDIT_SUCCESS:
      return { ...state, loading: false, event: action.payload }
    case EVENT_EDIT_FAIL:
      return { ...state, loading: false, error: action.payload }

    case EVENT_DELETE_REQUEST:
      return { ...state, loading: true }
    case EVENT_DELETE_SUCCESS:
      return {
        ...state,
        events: state.events.filter((x) => x.id !== action.payload),
        loading: false,
        error: null,
      }
    case EVENT_DELETE_FAIL:
      return { ...state, loading: false, error: action.payload }

    default:
      return state
  }
}
