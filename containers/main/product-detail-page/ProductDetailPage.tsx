import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import {
	CheckCircle2,
	ArrowRight,
	Package,
	Leaf,
	ShieldCheck,
} from 'lucide-react';
import Image from 'next/image';
import { Product } from '@/@types/product';

type ProductDetailPageProps = Readonly<{
	product: Product;
	relatedProducts: Pick<Product, 'id' | 'name' | 'image' | 'category'>[];
}>;

export default function ProductDetailPage({
	product,
	relatedProducts,
}: ProductDetailPageProps) {
	return (
		<main className='flex-1'>
			{/* Breadcrumb */}
			<section className='border-b border-border bg-muted/30'>
				<div className='container mx-auto px-4 py-4'>
					<nav className='flex items-center gap-2 text-sm text-muted-foreground'>
						<Link href='/' className='hover:text-primary transition-colors'>
							Home
						</Link>
						<span>/</span>
						<Link
							href='/products'
							className='hover:text-primary transition-colors'
						>
							Products
						</Link>
						<span>/</span>
						<span className='text-foreground'>{product.name}</span>
					</nav>
				</div>
			</section>

			{/* Product Details */}
			<section className='py-12'>
				<div className='container mx-auto px-4'>
					<div className='grid gap-8 lg:grid-cols-2 lg:gap-12'>
						{/* Product Images */}
						<div className='space-y-4'>
							<div className='relative aspect-square overflow-hidden rounded-2xl bg-muted'>
								{product.discount && (
									<Badge className='absolute top-4 left-4 z-10 bg-accent text-accent-foreground rounded-full font-semibold text-base px-4 py-1'>
										-{product.discount}%
									</Badge>
								)}
								<Badge className='absolute top-4 right-4 z-10 bg-primary text-primary-foreground rounded-full'>
									{product.tag}
								</Badge>
								<Image
									src={product.image || '/placeholder.svg'}
									alt={product.name}
									width={600}
									height={600}
									className='object-cover w-full h-full'
									priority
								/>
							</div>
						</div>

						{/* Product Info */}
						<div className='space-y-6'>
							<div className='space-y-4'>
								<Badge variant='outline' className='text-sm'>
									{product.category}
								</Badge>
								<h1 className='text-4xl font-serif font-bold tracking-tight text-foreground text-balance'>
									{product.name}
								</h1>
								<p className='text-lg text-muted-foreground leading-relaxed'>
									{product.description}
								</p>
							</div>

							{/* Pricing Block */}
							<Card className='border-2 border-primary/20 bg-primary/5 rounded-2xl'>
								<CardContent className='pt-6 space-y-3'>
									<div className='space-y-2'>
										<div className='flex items-baseline gap-3'>
											<span className='text-4xl font-bold text-primary'>
												{product.discountedPrice.toLocaleString('vi-VN')}₫
											</span>
											<span className='text-xl text-muted-foreground line-through'>
												{product.originalPrice.toLocaleString('vi-VN')}₫
											</span>
										</div>
										<p className='text-sm text-muted-foreground leading-relaxed'>
											Final price may vary based on promotion. Please contact us
											to confirm your order.
										</p>
									</div>
								</CardContent>
							</Card>

							{/* CTA Button */}
							<Button
								asChild
								size='lg'
								className='w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-full'
							>
								<Link href='/contact'>
									Contact to Order <ArrowRight className='ml-2 h-5 w-5' />
								</Link>
							</Button>

							{/* Trust Badges */}
							<div className='flex gap-6 pt-4 border-t border-border'>
								<div className='flex items-center gap-2'>
									<Leaf className='h-5 w-5 text-primary' />
									<span className='text-sm text-muted-foreground'>
										Eco-Friendly
									</span>
								</div>
								<div className='flex items-center gap-2'>
									<ShieldCheck className='h-5 w-5 text-primary' />
									<span className='text-sm text-muted-foreground'>
										Quality Guaranteed
									</span>
								</div>
								<div className='flex items-center gap-2'>
									<Package className='h-5 w-5 text-primary' />
									<span className='text-sm text-muted-foreground'>
										Fast Delivery
									</span>
								</div>
							</div>

							{/* Features */}
							<Card className='border-border'>
								<CardContent className='pt-6 space-y-4'>
									<h3 className='text-lg font-semibold text-foreground'>
										Key Features
									</h3>
									<ul className='space-y-3'>
										{product.features.map((feature, index) => (
											<li key={index} className='flex items-start gap-3'>
												<CheckCircle2 className='h-5 w-5 text-primary flex-shrink-0 mt-0.5' />
												<span className='text-sm text-muted-foreground leading-relaxed'>
													{feature}
												</span>
											</li>
										))}
									</ul>
								</CardContent>
							</Card>

							{/* Specifications */}
							<Card className='border-border'>
								<CardContent className='pt-6 space-y-4'>
									<h3 className='text-lg font-semibold text-foreground'>
										Specifications
									</h3>
									<dl className='space-y-3'>
										{Object.entries(product.specifications).map(
											([key, value]) => (
												<div
													key={key}
													className='flex justify-between text-sm border-b border-border pb-2 last:border-0'
												>
													<dt className='text-muted-foreground'>{key}</dt>
													<dd className='text-foreground font-medium text-right'>
														{value}
													</dd>
												</div>
											),
										)}
									</dl>
								</CardContent>
							</Card>
						</div>
					</div>
				</div>
			</section>

			{/* Related Products */}
			<section className='py-16 bg-muted/30'>
				<div className='container mx-auto px-4'>
					<div className='mb-8 space-y-2'>
						<h2 className='text-3xl font-bold tracking-tight text-foreground text-balance'>
							You May Also Like
						</h2>
						<p className='text-muted-foreground'>
							Check out these similar products
						</p>
					</div>

					<div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
						{relatedProducts.map((relatedProduct) => (
							<Card
								key={relatedProduct.id}
								className='group overflow-hidden hover:shadow-lg transition-shadow'
							>
								<div className='relative aspect-square overflow-hidden'>
									<Image
										src={relatedProduct.image || '/placeholder.svg'}
										alt={relatedProduct.name}
										width={300}
										height={300}
										className='object-cover w-full h-full group-hover:scale-105 transition-transform duration-300'
									/>
								</div>
								<CardContent className='p-4 space-y-3'>
									<Badge variant='outline' className='text-xs'>
										{relatedProduct.category}
									</Badge>
									<h3 className='font-semibold text-lg text-foreground text-balance'>
										{relatedProduct.name}
									</h3>
									<Button
										asChild
										variant='outline'
										className='w-full group bg-transparent'
									>
										<Link href={`/products/${relatedProduct.id}`}>
											View Details
											<ArrowRight className='ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform' />
										</Link>
									</Button>
								</CardContent>
							</Card>
						))}
					</div>
				</div>
			</section>
		</main>
	);
}
