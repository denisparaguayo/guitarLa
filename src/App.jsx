import Header from './components/Header';
import Gitar from './components/Gitar';
import { db } from './data/db';
import { useState, useEffect } from 'react';

function App() {
	const initialCart = () => {
		const localStorageCart = localStorage.getItem('cart');
		return localStorageCart ? JSON.parse(localStorageCart) : [];
	};

	const [data, setData] = useState(db);
	const [cart, setCart] = useState(initialCart);
	const MAX_ITEM = 5;
	const MIN_ITEM = 1;
	useEffect(() => {
		localStorage.setItem('cart', JSON.stringify(cart));
	}, [cart]);
	function addToCart(item) {
		const itemExist = cart.findIndex((guitar) => guitar.id === item.id);
		if (itemExist >= 0) {
			if ([cart[itemExist].quantity >= MAX_ITEM]) return;
			const updateCart = [...cart];
			updateCart[itemExist].quantity++;
			setCart(updateCart);
		} else {
			item.quantity = 1;
			setCart([...cart, item]);
		}
	}
	function removeFrontCart(id) {
		setCart((prevCart) => prevCart.filter((guitar) => guitar.id !== id));
	}

	function increaseQuantity(id) {
		const updateCart = cart.map((item) => {
			if (item.id === id && item.quantity < MAX_ITEM) {
				return {
					...item,
					quantity: item.quantity + 1,
				};
			}
			return item;
		});
		setCart(updateCart);
	}

	function decrementQuantity(id) {
		const updateCart = cart.map((item) => {
			if (item.id === id && item.quantity > MIN_ITEM) {
				return {
					...item,
					quantity: item.quantity - 1,
				};
			}
			return item;
		});
		setCart(updateCart);
	}

	function clearCart() {
		setCart([]);
	}

	return (
		<>
			<Header
				decrementQuantity={decrementQuantity}
				increaseQuantity={increaseQuantity}
				removeFrontCart={removeFrontCart}
				cart={cart}
				clearCart={clearCart}
			/>
			<main className="container-xl mt-5">
				<h2 className="text-center">Nuestra Colección</h2>
				<div className="row mt-5">
					{data.map((guitar) => (
						<Gitar
							cart={cart}
							setCart={setCart}
							key={guitar.id}
							guitar={guitar}
							addToCart={addToCart}
						/>
					))}
				</div>
			</main>
			<footer className="bg-dark mt-5 py-5">
				<div className="container-xl">
					<p className="text-white text-center fs-4 mt-4 m-md-0">
						GuitarLA - Todos los derechos Reservados
					</p>
				</div>
			</footer>
		</>
	);
}

export default App;
