import { useGetRestaurant } from '@/api/RestaurantApi';
import CheckoutButton from '@/components/CheckoutButton';
import MenuItem from '@/components/MenuItem';
import OrderSummary from '@/components/OrderSummary';
import RestaurantInfo from '@/components/RestaurantInfo';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Card, CardFooter } from '@/components/ui/card';
import { UserFormData } from '@/forms/user-profile-form/UserProfileForm';
import { MenuItem as MenuItemType } from '@/interfaces/types';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

export type CartItem = {
	_id: string;
	name: string;
	price: number;
	quantity: number;
};

export default function DetailPage() {
	const { restaurantId } = useParams();
	const { restaurant, isLoading } = useGetRestaurant(restaurantId);

	const [cartItems, setCartItems] = useState<CartItem[]>(() => {
		const cartItems = sessionStorage.getItem(`cartItems-${restaurantId}`);

		return cartItems ? JSON.parse(cartItems) : [];
	});

	const addToCart = (memuItem: MenuItemType) => {
		setCartItems((prev) => {
			const existingCartItem = prev.find(
				(item) => item._id === memuItem._id
			);

			if (existingCartItem) {
				return prev.map((item) =>
					item._id === memuItem._id
						? { ...item, quantity: item.quantity + 1 }
						: item
				);
			}

			sessionStorage.setItem(
				`cartItems-${restaurantId}`,
				JSON.stringify([...prev, { ...memuItem, quantity: 1 }])
			);

			return [...prev, { ...memuItem, quantity: 1 }];
		});
	};

	const removeFromCart = (cartItem: CartItem) => {
		setCartItems((prev) => {
			const updatedCartItems = prev.filter(
				(item) => item._id !== cartItem._id
			);

			return updatedCartItems;
		});
	};

	const onCheckout = (userFormData: UserFormData) => {
		console.log('userFormData', userFormData);
	};

	if (isLoading || !restaurant) {
		return <div>Loading...</div>;
	}

	return (
		<div className="flex flex-col gap-10">
			<AspectRatio ratio={16 / 4}>
				<img
					className="rounded-md object-cover h-full w-full"
					src={restaurant.imageUrl}
				/>
			</AspectRatio>
			<div className="grid md:grid-cols-[4fr_2fr] gap-5 md:px-32">
				<div className="flex flex-col gap-4">
					<RestaurantInfo restaurant={restaurant} />
					<span className="text-2xl font-bold tracking-tight">Menu</span>
					{restaurant.menuItems.map((menuItem) => (
						<MenuItem
							menuItem={menuItem}
							addToCart={() => addToCart(menuItem)}
						/>
					))}
				</div>

				<div>
					<Card>
						<OrderSummary
							restaurant={restaurant}
							cartItems={cartItems}
							removeFromCart={removeFromCart}
						/>
						<CardFooter>
							<CheckoutButton
								disabled={cartItems.length === 0}
								onCheckout={onCheckout}
							/>
						</CardFooter>
					</Card>
				</div>
			</div>
		</div>
	);
}
