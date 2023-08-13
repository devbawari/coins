import React from 'react'
import {BrowserRouter as Router,Route,Routes,Link} from "react-router-dom"
import Header from './components/Header.jsx'
import Home from './components/Home'
import Coin from './components/Coin'
import Coindetails from './components/Coindetails'
import  Exchanges  from './components/Exchanges'
import Footer from './components/Footer.jsx'
const App = () => {
  return (
<Router>
<Header/>
<Routes>
<Route path='/' element={<Home/>} />
<Route path='/coins' element={<Coin/>} />
<Route path='/exchanges' element={<Exchanges/>} />
<Route path='/coins/:id' element={<Coindetails/>} />
</Routes>
<Footer/>
</Router>

  )
}

export default App