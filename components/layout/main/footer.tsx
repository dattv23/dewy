import Link from 'next/link';
import {
	Facebook,
	Instagram,
	Twitter,
	Mail,
	Phone,
	MapPin,
} from 'lucide-react';

export function Footer() {
	return (
		<footer className='border-t border-border bg-muted/30'>
			<div className='container mx-auto px-4 py-12'>
				<div className='grid gap-8 md:grid-cols-2 lg:grid-cols-4'>
					{/* Company Info */}
					<div className='space-y-4'>
						<h3 className='text-lg font-semibold text-foreground'>Dewy</h3>
						<p className='text-sm text-muted-foreground leading-relaxed'>
							Mỹ phẩm thiên nhiên an toàn cho làn da của bạn. Chất lượng cao và
							đáng tin cậy.
						</p>
					</div>

					{/* Quick Links */}
					<div className='space-y-4'>
						<h3 className='text-lg font-semibold text-foreground'>
							Liên kết nhanh
						</h3>
						<ul className='space-y-2'>
							<li>
								<Link
									href='/products'
									className='text-sm text-muted-foreground hover:text-primary transition-colors'
								>
									Sản phẩm
								</Link>
							</li>
							<li>
								<Link
									href='/about'
									className='text-sm text-muted-foreground hover:text-primary transition-colors'
								>
									Giới thiệu
								</Link>
							</li>
							<li>
								<Link
									href='/faq'
									className='text-sm text-muted-foreground hover:text-primary transition-colors'
								>
									Câu hỏi thường gặp
								</Link>
							</li>
							<li>
								<Link
									href='/contact'
									className='text-sm text-muted-foreground hover:text-primary transition-colors'
								>
									Liên hệ
								</Link>
							</li>
						</ul>
					</div>

					{/* Contact Info */}
					<div className='space-y-4'>
						<h3 className='text-lg font-semibold text-foreground'>
							Liên hệ với chúng tôi
						</h3>
						<ul className='space-y-3'>
							<li className='flex items-center gap-2 text-sm text-muted-foreground'>
								<Mail className='h-4 w-4 text-primary' />
								<a
									href='mailto:info@Dewy.vn'
									className='hover:text-primary transition-colors'
								>
									info@Dewy.vn
								</a>
							</li>
							<li className='flex items-center gap-2 text-sm text-muted-foreground'>
								<Phone className='h-4 w-4 text-primary' />
								<a
									href='tel:+84123456789'
									className='hover:text-primary transition-colors'
								>
									+84 123 456 789
								</a>
							</li>
							<li className='flex items-start gap-2 text-sm text-muted-foreground'>
								<MapPin className='h-4 w-4 text-primary mt-0.5 flex-shrink-0' />
								<span>123 Đường Lê Lợi, Quận 1, TP. Hồ Chí Minh</span>
							</li>
						</ul>
					</div>

					{/* Social Media */}
					<div className='space-y-4'>
						<h3 className='text-lg font-semibold text-foreground'>
							Theo dõi chúng tôi
						</h3>
						<div className='flex gap-4'>
							<a
								href='https://facebook.com'
								target='_blank'
								rel='noopener noreferrer'
								className='flex h-10 w-10 items-center justify-center rounded-lg bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition-colors'
								aria-label='Facebook'
							>
								<Facebook className='h-5 w-5' />
							</a>
							<a
								href='https://instagram.com'
								target='_blank'
								rel='noopener noreferrer'
								className='flex h-10 w-10 items-center justify-center rounded-lg bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition-colors'
								aria-label='Instagram'
							>
								<Instagram className='h-5 w-5' />
							</a>
							<a
								href='https://twitter.com'
								target='_blank'
								rel='noopener noreferrer'
								className='flex h-10 w-10 items-center justify-center rounded-lg bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition-colors'
								aria-label='Twitter'
							>
								<Twitter className='h-5 w-5' />
							</a>
						</div>
					</div>
				</div>

				<div className='mt-12 border-t border-border pt-8 text-center'>
					<p className='text-sm text-muted-foreground'>
						© {new Date().getFullYear()} Dewy. Bản quyền thuộc về chúng tôi.
					</p>
				</div>
			</div>
		</footer>
	);
}
