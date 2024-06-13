import { Restaurant, RestaurantSearchResponse } from '@/interfaces/types';
import { SearchState } from '@/pages/SearchPage';
import { useQuery } from 'react-query';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useGetRestaurant = (restaurantId?: string) => {
	const getMyRestaurantByIdRequest = async (): Promise<Restaurant> => {
		const response = await fetch(
			`${API_BASE_URL}/api/restaurant/${restaurantId}`
		);

		if (!response.ok) {
			throw new Error('Failed to fetch restaurant');
		}

		return response.json();
	};

	const { data: restaurant, isLoading } = useQuery(
		'fetchRestaurant',
		getMyRestaurantByIdRequest,
		{
			enabled: !!restaurantId, // Only fetch the restaurant if the restaurantId is provided
		}
	);

	return { restaurant, isLoading };
};

export const useSearchRestaurants = (
	searchState: SearchState,
	city?: string
) => {
	const createSearchRequest = async (): Promise<RestaurantSearchResponse> => {
		const params = new URLSearchParams();
		params.set('searchQuery', searchState.searchQuery);
		params.set('page', searchState.page.toString());
		params.set('selectedCuisines', searchState.selectedCuisines.join(','));
		params.set('sortOption', searchState.sortOption);

		const response = await fetch(
			`${API_BASE_URL}/api/restaurant/search/${city}?${params.toString()}`
		);

		if (!response.ok) {
			throw new Error('Failed to fetch restaurants');
		}

		return response.json();
	};

	const { data: results, isLoading } = useQuery(
		['searchRestaurants', searchState],
		createSearchRequest,
		{ enabled: !!city }
	);

	return { results, isLoading };
};
