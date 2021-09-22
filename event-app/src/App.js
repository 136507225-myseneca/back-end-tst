import './App.css'
import Amplify, { API } from 'aws-amplify'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import config from './aws-exports'
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react'
import { Provider } from 'react-redux'
import store from './store'
import DispalyEvents from './screens/DisplayEvents/DispalyEvents'
import EditEvent from './screens/EditEvent/EditEvent'

Amplify.configure(config)
function App() {
  return (
    <Router>
      <Provider store={store}>
        <div className='App'>
          <header className='App-header'>
            <div className='sign-out'>
              {' '}
              <AmplifySignOut />
            </div>
          </header>
          <Route path='/' component={DispalyEvents} exact />

          <Route path='/:id' component={EditEvent} exact />
        </div>
      </Provider>
    </Router>
  )
}

export default withAuthenticator(App)
