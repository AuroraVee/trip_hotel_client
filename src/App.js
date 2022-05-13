// import './App.css';
import 'antd/dist/antd.min.css'
import { Switch, Route, Redirect } from 'react-router-dom'
import Home from './pages/Home'
import Order from './pages/Order'

function App() {
  return (
    <Switch>
      <Route path="/home" component={Home}></Route>
      <Route path="/order" component={Order}></Route>
      <Redirect to="/home"></Redirect>
    </Switch>
  )
}

export default App
