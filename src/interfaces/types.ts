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

export interface RestaurantSearchResponse {
	data: Restaurant[];
	pagination: {
		tolal: number;
		page: number;
		pages: number;
	};
}
