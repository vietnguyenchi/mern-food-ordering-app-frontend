export interface User {
	_id: string;
	email: string;
	name: string;
	addressLine1: string;
	city: string;
	country: string;
}

export interface MenuItem {
	_id: string;
	name: string;
	price: number;
}
export interface Restaurant {
	_id: string;
	restaurantName: string;
	city: string;
	country: string;
	deliveryPrice: number;
	estimatedDeliveryTime: number;
	cuisines: string[];
	menuItems: MenuItem[];
	imageUrl: string;
}

export type OrderStatus =
	| 'placed'
	| 'paid'
	| 'inProgress'
	| 'outForDelivery'
	| 'delivered';

export interface Order {
	_id: string;
	restaurant: Restaurant;
	user: User;
	cartItems: {
		menuItemId: string;
		name: string;
		quantity: string;
	}[];
	deliveryDetails: {
		email: string;
		name: string;
		addressLine1: string;
		city: string;
		country: string;
	};
	totalAmount: number;
	status: OrderStatus;
	createdAt: string;
	restaurantId: string;
}

export interface RestaurantSearchResponse {
	data: Restaurant[];
	pagination: {
		tolal: number;
		page: number;
		pages: number;
	};
}
