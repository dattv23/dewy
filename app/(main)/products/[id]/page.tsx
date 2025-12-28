import { Header } from '@/components/layout/main/header';
import { Footer } from '@/components/layout/main/footer';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import type { Metadata } from 'next';
import { ProductDetailPage } from '@/containers/main/product-detail-page';

const productsData = {
	'1': {
		id: 1,
		name: 'Vitamin C Brightening Serum',
		description:
			'This powerful serum is formulated with 15% pure Vitamin C to brighten and even your skin tone. The lightweight formula absorbs quickly, delivering potent antioxidants deep into your skin. Perfect for all skin types, it helps reduce dark spots and promotes a radiant, youthful glow.',
		image: '/vitamin-c-serum.jpg',
		category: 'Skincare',
		tag: 'Best Seller',
		originalPrice: 850000,
		discountedPrice: 680000,
		discount: 20,
		features: [
			'15% Pure Vitamin C for maximum effectiveness',
			'Brightens and evens skin tone naturally',
			'Reduces appearance of dark spots and hyperpigmentation',
			'Lightweight, fast-absorbing formula',
			'Suitable for all skin types including sensitive skin',
		],
		specifications: {
			'Key Ingredients': 'Vitamin C, Hyaluronic Acid, Vitamin E',
			Volume: '30ml',
			'Skin Type': 'All skin types',
			'How to Use': 'Apply 2-3 drops to clean face morning and evening',
		},
	},
	'2': {
		id: 2,
		name: 'Hydrating Rose Face Cream',
		description:
			'Indulge your skin with this luxurious face cream infused with organic rose extract. The rich, creamy formula provides deep hydration while soothing and nourishing dry skin. Wake up to plump, dewy, and radiant skin every morning.',
		image: '/rose-face-cream.jpg',
		category: 'Skincare',
		tag: 'New',
		originalPrice: 1200000,
		discountedPrice: 960000,
		discount: 20,
		features: [
			'Infused with organic Damascus rose extract',
			'Provides 24-hour deep hydration',
			'Nourishes and softens dry skin',
			'Anti-aging properties reduce fine lines',
			'Delicate natural rose scent',
		],
		specifications: {
			'Key Ingredients': 'Rose Extract, Shea Butter, Jojoba Oil',
			Volume: '50ml',
			'Skin Type': 'Dry and mature skin',
			'How to Use': 'Apply to clean face morning and night',
		},
	},
	'3': {
		id: 3,
		name: 'Gentle Cleansing Foam',
		description:
			"Start your skincare routine with this gentle cleansing foam that purifies your skin without stripping its natural oils. The soft, creamy lather removes makeup, dirt, and impurities while maintaining your skin's moisture balance.",
		image: '/cleansing-foam.jpg',
		category: 'Skincare',
		tag: 'Popular',
		originalPrice: 450000,
		discountedPrice: 360000,
		discount: 20,
		features: [
			'Gentle formula for sensitive skin',
			'Removes makeup and impurities effectively',
			"Maintains skin's natural moisture balance",
			'Contains soothing chamomile extract',
			'pH-balanced for healthy skin',
		],
		specifications: {
			'Key Ingredients': 'Chamomile, Aloe Vera, Glycerin',
			Volume: '150ml',
			'Skin Type': 'Sensitive and normal skin',
			'How to Use': 'Massage onto damp face, rinse thoroughly',
		},
	},
	'4': {
		id: 4,
		name: 'Natural Glow Lip Tint',
		description:
			'Achieve the perfect natural lip look with this nourishing lip tint. The lightweight formula provides a subtle wash of color while keeping your lips soft and hydrated throughout the day. Made with organic ingredients for guilt-free beauty.',
		image: '/lip-tint.jpg',
		category: 'Makeup',
		tag: 'Organic',
		originalPrice: 320000,
		discountedPrice: 256000,
		discount: 20,
		features: [
			'Subtle, buildable color for natural look',
			'Infused with nourishing plant oils',
			'Long-lasting hydration',
			'100% organic and vegan ingredients',
			'Available in 4 flattering shades',
		],
		specifications: {
			'Key Ingredients': 'Jojoba Oil, Vitamin E, Natural Pigments',
			Volume: '4g',
			'Skin Type': 'All types',
			'How to Use': 'Apply directly to lips, build for more intensity',
		},
	},
};

// Mock related products
const relatedProducts = [
	{
		id: 5,
		name: 'Beeswax Food Wraps',
		image: '/beeswax-food-wraps.jpg',
		category: 'Kitchen',
	},
	{
		id: 6,
		name: 'Hemp Canvas Backpack',
		image: '/hemp-backpack.png',
		category: 'Bags',
	},
	{
		id: 7,
		name: 'Bamboo Toothbrush Pack',
		image: '/bamboo-toothbrush-set.jpg',
		category: 'Personal Care',
	},
];

export async function generateMetadata({
	params,
}: {
	params: Promise<{ id: string }>;
}): Promise<Metadata> {
	const { id } = await params;
	const product = productsData[id as keyof typeof productsData];

	if (!product) {
		return {
			title: 'Product Not Found',
		};
	}

	return {
		title: `${product.name} - EcoShop`,
		description: product.description,
	};
}

export default async function page({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;
	const product = productsData[id as keyof typeof productsData];

	if (!product) {
		return (
			<div className='flex min-h-screen flex-col'>
				<Header />
				<main className='flex-1 flex items-center justify-center'>
					<div className='text-center space-y-4 py-16 px-4'>
						<h1 className='text-3xl font-bold text-foreground'>
							Product Not Found
						</h1>
						<p className='text-muted-foreground'>
							The product you're looking for doesn't exist.
						</p>
						<Button asChild variant='outline'>
							<Link href='/products'>Back to Products</Link>
						</Button>
					</div>
				</main>
				<Footer />
			</div>
		);
	}

	return (
		<ProductDetailPage product={product} relatedProducts={relatedProducts} />
	);
}
