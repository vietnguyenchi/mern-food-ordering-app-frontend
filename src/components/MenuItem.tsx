import type { MenuItem as MenuItemType } from '@/interfaces/types';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

type Props = {
	menuItem: MenuItemType;
	addToCart: () => void;
};

const MenuItem = ({ menuItem, addToCart }: Props) => {
	return (
		<Card className="cursor-pointer" onClick={addToCart}>
			<CardHeader>
				<CardTitle>{menuItem.name}</CardTitle>
			</CardHeader>
			<CardContent className="font-bold">
				{(menuItem.price / 1000).toFixed(3)}₫
			</CardContent>
		</Card>
	);
};

export default MenuItem;
