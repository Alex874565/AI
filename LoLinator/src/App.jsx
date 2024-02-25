import React from 'react';
import { BrowserRouter as Router, Routes, Route }
	from 'react-router-dom';
import Home from './pages/Home';
import Lore from './pages/Lore';
import Login from './pages/Login'
import Register from './pages/Register.jsx';
import Stats from './pages/Stats.jsx';
import History from './pages/History.jsx';
import Contact  from './pages/Contact.jsx';

function App() {
	return (
		<Router styles = "{min-height: 100%;}">
			<Routes>
				<Route exact path='/' Component={Login} />
				<Route path='/login' Component={Login} />
				<Route path='/register' Component={Register} />
				<Route path='/home/:username/:email/' Component={Home} />
				<Route path='/lore/:username/:email/' Component={Lore} />
				<Route path='/stats/:username/:email/' Component={Stats} />
				<Route path='/history/:username/:email/' Component={History} />
				<Route path='/history/:username/:email/:keyword/' Component={History} />
				<Route path='/contact/:username/:email/' Component={Contact} />
			</Routes>
		</Router>
	);
}

export default App;
