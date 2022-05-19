import React, { useState, useEffect } from "react";
import { commerce } from "./lib/commerce";
import { Products, Navbar, Cart, Checkout } from "./components";
import { Routes, Route } from "react-router-dom";

const DEFAULT_STATE = {
	products: [],
	cart: {},
};

const App = () => {
	const [products, setProduct] = useState(DEFAULT_STATE.products);
	const [cart, setCart] = useState(DEFAULT_STATE.cart);
	const fetchProduct = async () => {
		const { data } = await commerce.products.list();
		if (data) {
			setProduct(data);
		}
	};

	const fetchCart = async () => {
		const response = await commerce.cart.retrieve();
		if (response) {
			setCart(response);
		}
	};

	const handleAddToCart = async (productId, quantity) => {
		const { cart } = await commerce.cart.add(productId, quantity);
		setCart(cart);
	};

	const handleUpdateCartQuantity = async (productId, quantity) => {
		const { cart } = await commerce.cart.update(productId, { quantity });
		setCart(cart);
	};

	const handleRemoveFromCart = async (productId) => {
		const { cart } = await commerce.cart.remove(productId);
		setCart(cart);
	};

	const handleEmptyCart = async () => {
		const { cart } = await commerce.cart.empty();
		setCart(cart);
	};

	useEffect(() => {
		fetchProduct();
		fetchCart();
	}, []);
	return (
		<div>
			<Navbar totalItems={cart.total_items} />
			<Routes>
				<Route
					path="/"
					element={
						<Products products={products} onAddToCart={handleAddToCart} />
					}
				/>
				<Route
					path="/cart"
					element={
						<Cart
							handleUpdateCartQuantity={handleUpdateCartQuantity}
							handleRemoveFromCart={handleRemoveFromCart}
							handleEmptyCart={handleEmptyCart}
							cart={cart}
						/>
					}
				/>
				<Route path="/checkout" element={<Checkout cart={cart} />} />
			</Routes>
		</div>
	);
};

export default App;
