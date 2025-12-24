'use client';

import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { Search, Filter, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

const allProducts = [
	{
		id: 1,
		name: 'Bamboo Utensil Set',
		description:
			'Eco-friendly reusable utensils for sustainable dining on the go',
		image: '/bamboo-utensils-set.jpg',
		category: 'Kitchen',
		tag: 'Best Seller',
	},
	{
		id: 2,
		name: 'Organic Cotton Tote Bag',
		description: 'Durable and stylish bag made from 100% organic cotton',
		image: '/organic-cotton-tote-bag.png',
		category: 'Bags',
		tag: 'New',
	},
	{
		id: 3,
		name: 'Reusable Water Bottle',
		description: 'Stainless steel bottle keeps drinks cold for 24 hours',
		image: '/stainless-steel-bottle.png',
		category: 'Drinkware',
		tag: 'Popular',
	},
	{
		id: 4,
		name: 'Natural Soap Bar Set',
		description:
			'Handcrafted soaps with organic ingredients and essential oils',
		image: '/natural-soap-bars.jpg',
		category: 'Personal Care',
		tag: 'Eco-Friendly',
	},
	{
		id: 5,
		name: 'Beeswax Food Wraps',
		description: 'Reusable alternative to plastic wrap for food storage',
		image: '/beeswax-food-wraps.jpg',
		category: 'Kitchen',
		tag: 'Eco-Friendly',
	},
	{
		id: 6,
		name: 'Hemp Canvas Backpack',
		description: 'Spacious and durable backpack made from sustainable hemp',
		image: '/hemp-backpack.png',
		category: 'Bags',
		tag: 'New',
	},
	{
		id: 7,
		name: 'Bamboo Toothbrush Pack',
		description: 'Biodegradable toothbrushes with soft charcoal bristles',
		image: '/bamboo-toothbrush-set.jpg',
		category: 'Personal Care',
		tag: 'Best Seller',
	},
	{
		id: 8,
		name: 'Stainless Steel Straws',
		description: 'Reusable straws with cleaning brush - set of 4',
		image: '/stainless-steel-straws.png',
		category: 'Drinkware',
		tag: 'Popular',
	},
	{
		id: 9,
		name: 'Organic Linen Napkins',
		description: 'Set of 6 soft and absorbent cloth napkins',
		image: '/linen-napkins.jpg',
		category: 'Kitchen',
		tag: 'Eco-Friendly',
	},
	{
		id: 10,
		name: 'Coconut Bowl Set',
		description: 'Handcrafted bowls made from reclaimed coconut shells',
		image: '/coconut-bowls.png',
		category: 'Kitchen',
		tag: 'New',
	},
	{
		id: 11,
		name: 'Natural Deodorant',
		description: 'Aluminum-free deodorant with organic ingredients',
		image: '/natural-deodorant.jpg',
		category: 'Personal Care',
		tag: 'Best Seller',
	},
	{
		id: 12,
		name: 'Reusable Coffee Cup',
		description: 'Insulated travel cup with silicone lid and sleeve',
		image: '/reusable-coffee-cup.png',
		category: 'Drinkware',
		tag: 'Popular',
	},
	{
		id: 13,
		name: 'Vitamin C Brightening Serum',
		description: 'Illuminates and evens skin tone naturally',
		image: '/vitamin-c-serum.jpg',
		category: 'Skincare',
		tag: 'Best Seller',
		originalPrice: 850000,
		discountedPrice: 680000,
		discount: 20,
	},
	{
		id: 14,
		name: 'Hydrating Rose Face Cream',
		description: 'Deep moisture with organic rose extract',
		image: '/rose-face-cream.jpg',
		category: 'Skincare',
		tag: 'New',
		originalPrice: 1200000,
		discountedPrice: 960000,
		discount: 20,
	},
	{
		id: 15,
		name: 'Gentle Cleansing Foam',
		description: 'Purifies without stripping natural oils',
		image: '/cleansing-foam.jpg',
		category: 'Skincare',
		tag: 'Popular',
		originalPrice: 450000,
		discountedPrice: 360000,
		discount: 20,
	},
	{
		id: 16,
		name: 'Natural Glow Lip Tint',
		description: 'Subtle color with nourishing ingredients',
		image: '/lip-tint.jpg',
		category: 'Makeup',
		tag: 'Organic',
		originalPrice: 320000,
		discountedPrice: 256000,
		discount: 20,
	},
	{
		id: 17,
		name: 'Nourishing Body Butter',
		description: 'Rich hydration for soft, smooth skin',
		image: '/body-butter.jpg',
		category: 'Body Care',
		tag: 'Best Seller',
		originalPrice: 550000,
		discountedPrice: 440000,
		discount: 20,
	},
	{
		id: 18,
		name: 'Mineral Sunscreen SPF 50',
		description: 'Lightweight protection with natural minerals',
		image: '/sunscreen.jpg',
		category: 'Skincare',
		tag: 'New',
		originalPrice: 680000,
		discountedPrice: 544000,
		discount: 20,
	},
	{
		id: 19,
		name: 'Charcoal Face Mask',
		description: 'Deeply cleanses and detoxifies pores',
		image: '/face-mask.jpg',
		category: 'Skincare',
		tag: 'Popular',
		originalPrice: 420000,
		discountedPrice: 336000,
		discount: 20,
	},
	{
		id: 20,
		name: 'Organic Mascara',
		description: 'Lengthens and volumizes naturally',
		image: '/mascara.jpg',
		category: 'Makeup',
		tag: 'Vegan',
		originalPrice: 380000,
		discountedPrice: 304000,
		discount: 20,
	},
	{
		id: 21,
		name: 'Exfoliating Body Scrub',
		description: 'Gently buffs away dead skin cells',
		image: '/body-scrub.jpg',
		category: 'Body Care',
		tag: 'Popular',
		originalPrice: 480000,
		discountedPrice: 384000,
		discount: 20,
	},
	{
		id: 22,
		name: 'Rejuvenating Eye Cream',
		description: 'Reduces dark circles and fine lines',
		image: '/eye-cream.jpg',
		category: 'Skincare',
		tag: 'New',
		originalPrice: 920000,
		discountedPrice: 736000,
		discount: 20,
	},
	{
		id: 23,
		name: 'Natural Blush Palette',
		description: 'Soft, buildable color for a healthy glow',
		image: '/blush-palette.jpg',
		category: 'Makeup',
		tag: 'Best Seller',
		originalPrice: 560000,
		discountedPrice: 448000,
		discount: 20,
	},
	{
		id: 24,
		name: 'Aromatherapy Body Oil',
		description: 'Luxurious oil with calming essential oils',
		image: '/body-oil.jpg',
		category: 'Body Care',
		tag: 'Organic',
		originalPrice: 720000,
		discountedPrice: 576000,
		discount: 20,
	},
];

const categories = [
	'All',
	'Kitchen',
	'Bags',
	'Drinkware',
	'Personal Care',
	'Skincare',
	'Makeup',
	'Body Care',
];

export default function ProductsPage() {
	const [searchQuery, setSearchQuery] = useState('');
	const [selectedCategory, setSelectedCategory] = useState('All');

	const filteredProducts = allProducts.filter((product) => {
		const matchesSearch =
			product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
			product.description.toLowerCase().includes(searchQuery.toLowerCase());
		const matchesCategory =
			selectedCategory === 'All' || product.category === selectedCategory;
		return matchesSearch && matchesCategory;
	});

	return (
		<div className='flex min-h-screen flex-col'>
			<Header />

			<main className='flex-1'>
				{/* Page Header */}
				<section className='border-b border-border bg-muted/30'>
					<div className='container mx-auto px-4 py-12'>
						<div className='max-w-3xl mx-auto text-center space-y-4'>
							<h1 className='text-4xl font-bold tracking-tight text-foreground md:text-5xl text-balance'>
								Our Products
							</h1>
							<p className='text-lg text-muted-foreground leading-relaxed text-pretty'>
								Explore our full collection of eco-friendly and sustainable
								products
							</p>
						</div>
					</div>
				</section>

				{/* Filters and Search */}
				<section className='py-8 border-b border-border'>
					<div className='container mx-auto px-4'>
						<div className='flex flex-col gap-4 md:flex-row md:items-center md:justify-between'>
							{/* Search Bar */}
							<div className='relative flex-1 max-w-md'>
								<Search className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground' />
								<Input
									type='text'
									placeholder='Search products...'
									value={searchQuery}
									onChange={(e) => setSearchQuery(e.target.value)}
									className='pl-10'
								/>
							</div>

							{/* Category Filter */}
							<div className='flex items-center gap-2 overflow-x-auto pb-2 md:pb-0'>
								<Filter className='h-5 w-5 text-muted-foreground flex-shrink-0' />
								<div className='flex gap-2'>
									{categories.map((category) => (
										<Button
											key={category}
											variant={
												selectedCategory === category ? 'default' : 'outline'
											}
											size='sm'
											onClick={() => setSelectedCategory(category)}
											className={
												selectedCategory === category
													? 'bg-primary text-primary-foreground hover:bg-primary/90'
													: ''
											}
										>
											{category}
										</Button>
									))}
								</div>
							</div>
						</div>
					</div>
				</section>

				{/* Product Grid */}
				<section className='py-12'>
					<div className='container mx-auto px-4'>
						{filteredProducts.length > 0 ? (
							<>
								<p className='text-sm text-muted-foreground mb-6'>
									Showing {filteredProducts.length}{' '}
									{filteredProducts.length === 1 ? 'product' : 'products'}
								</p>
								<div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
									{filteredProducts.map((product) => (
										<Card
											key={product.id}
											className='group overflow-hidden hover:shadow-xl transition-all rounded-2xl border-none shadow-md'
										>
											<div className='relative aspect-square overflow-hidden'>
												{product.discount && (
													<Badge className='absolute top-3 left-3 z-10 bg-accent text-accent-foreground rounded-full font-semibold'>
														-{product.discount}%
													</Badge>
												)}
												<Badge className='absolute top-3 right-3 z-10 bg-primary text-primary-foreground rounded-full'>
													{product.tag}
												</Badge>
												<Image
													src={product.image || '/placeholder.svg'}
													alt={product.name}
													width={300}
													height={300}
													className='object-cover w-full h-full group-hover:scale-105 transition-transform duration-300'
												/>
											</div>
											<CardContent className='p-5 space-y-3'>
												<div className='flex items-center justify-between'>
													<Badge variant='outline' className='text-xs'>
														{product.category}
													</Badge>
												</div>
												<h3 className='font-semibold text-lg text-foreground text-balance'>
													{product.name}
												</h3>
												<p className='text-sm text-muted-foreground leading-relaxed line-clamp-2'>
													{product.description}
												</p>

												<div className='space-y-1 pt-2'>
													{product.discountedPrice && product.originalPrice ? (
														<div className='flex items-baseline gap-2'>
															<span className='text-2xl font-bold text-primary'>
																{product.discountedPrice.toLocaleString(
																	'vi-VN',
																)}
																₫
															</span>
															<span className='text-sm text-muted-foreground line-through'>
																{product.originalPrice.toLocaleString('vi-VN')}₫
															</span>
														</div>
													) : (
														<span className='text-sm font-medium text-muted-foreground italic'>
															Liên hệ để biết thông tin về giá
														</span>
													)}
												</div>

												<Button
													asChild
													variant='outline'
													className='w-full group bg-transparent rounded-full hover:bg-primary hover:text-primary-foreground'
												>
													<Link href={`/products/${product.id}`}>
														View Details
														<ArrowRight className='ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform' />
													</Link>
												</Button>
											</CardContent>
										</Card>
									))}
								</div>
							</>
						) : (
							<div className='text-center py-12 space-y-4'>
								<p className='text-lg text-muted-foreground'>
									No products found matching your criteria.
								</p>
								<Button
									variant='outline'
									onClick={() => {
										setSearchQuery('');
										setSelectedCategory('All');
									}}
								>
									Clear Filters
								</Button>
							</div>
						)}
					</div>
				</section>

				{/* CTA Section */}
				<section className='py-16 bg-gradient-to-br from-primary/10 via-background to-accent/20'>
					<div className='container mx-auto px-4 text-center'>
						<div className='mx-auto max-w-2xl space-y-6'>
							<h2 className='text-3xl font-bold tracking-tight text-foreground md:text-4xl text-balance'>
								Found What You're Looking For?
							</h2>
							<p className='text-lg text-muted-foreground leading-relaxed text-pretty'>
								Contact us to place your order and we'll respond with
								confirmation details
							</p>
							<Button
								asChild
								size='lg'
								className='bg-primary text-primary-foreground hover:bg-primary/90'
							>
								<Link href='/contact'>
									Contact to Order <ArrowRight className='ml-2 h-5 w-5' />
								</Link>
							</Button>
						</div>
					</div>
				</section>
			</main>

			<Footer />
		</div>
	);
}
