import React from 'react';
import Home from './pages/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MovieDetail from './pages/MovieDetail';
import MyRentals from './pages/MyRentals';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/NotFound';
import ProtectedRoute from './utils/ProtectedRoute';
import Search from './pages/Search';

function App() {
	return (
 		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/movie/:id" element={<MovieDetail />} />
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
				<Route path="/search" element={<Search />} />

				<Route path="/my-rentals" 
					   element={
						<ProtectedRoute>
							<MyRentals />
						</ProtectedRoute>
					} />

				{/*404*/}
				<Route path="*" element={<NotFound />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
