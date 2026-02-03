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
import { allProducts } from '@/lib/products';

const categories = [
	'All',
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
