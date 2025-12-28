export type Product = {
	id: number;
	name: string;
	description: string;
	image: string;
	category: string;
	tag: string;
	originalPrice: number;
	discountedPrice: number;
	discount: number;
	features: string[];
	specifications: {
		'Key Ingredients': string;
		Volume: string;
		'Skin Type': string;
		'How to Use': string;
	};
};
