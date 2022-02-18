import { ForwardedRef, forwardRef, useRef, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

import { ProductProps } from './Product.props';
import { Card } from '../Card/Card';
import { Rating } from '../Rating/Rating';
import { Tag } from '../Tag/Tag';
import { Htag } from '../Htag/Htag';
import { Button } from '../Button/Button';
import { P } from '../P/P';
import { Divider } from '../Divider/Divider';
import { declOfNum, priceRu } from '../../helpers/helpers';
import { Review } from '../Review/Review';
import { ReviewForm } from '../ReviewForm/ReviewForm';

import styles from './Product.module.css';

export const Product = motion(forwardRef(({ product, className, ...props }: ProductProps, ref: ForwardedRef<HTMLDivElement>): JSX.Element => {
	const [isReviewOpened, setIsReviewOpened] = useState<boolean>(false);
	const reviewRef = useRef<HTMLDivElement>(null);

	const scrollToReview = () => {
		setIsReviewOpened(true);
		reviewRef.current?.scrollIntoView({
			behavior: 'smooth',
			block: 'start'
		});
		reviewRef.current?.focus();
	};

	const variants = {
		visible: {
			opacity: 1,
			height: 'auto',
		},
		hidden: {
			opacity: 0,
			height: 0
		}
	};

	return (
		<div className={className} ref={ref} {...props}>
			<Card className={styles.product}>
				<div className={styles.left}>
					<div className={styles.logo}>
						<Image
							src={process.env.NEXT_PUBLIC_DOMAIN + product.image}
							alt={product.title}
							width={70}
							height={70}
						/>
					</div>
					<div className={styles.title}><Htag tag='h3'>{product.title}</Htag></div>
					<div className={styles.tags}>{product.categories.map(c => <Tag key={c} color='ghost' className={styles.tag}>{c}</Tag>)}</div>
				</div>
				<div className={styles.right}>
					<div className={styles.price}>
						<span className='visualyHidden'>цена</span>{priceRu(product.price)}
						{product.oldPrice && <Tag color='green' className={styles.oldPrice}>
							<span className='visualyHidden'>скидка</span>
							{priceRu(product.price - product.oldPrice)}
						</Tag>}
					</div>
					<div className={styles.credit}>
						<span className='visualyHidden'>кредит</span>
						{priceRu(product.credit)}
						<span>/мес</span>
					</div>
					<div className={styles.rating}>
						<span className='visualyHidden'>{'рейтинг' + product.reviewAvg ?? product.initialRating}</span>
						<Rating rating={product.reviewAvg ?? product.initialRating} />
					</div>
					<div className={styles.priceTitle} aria-hidden={true}>цена</div>
					<div className={styles.creditTitle} aria-hidden={true}>в кредит</div>
					<div className={styles.rateTitle}>
						<a href="#ref" onClick={scrollToReview}>
							{product.reviewCount} {declOfNum(product.reviewCount, ['отзыв', 'отзыва', 'отзывов'])}
						</a>
					</div>
				</div>
				<Divider className={styles.hr} />
				<P size='m' className={styles.description}>{product.description}</P>
				<div className={styles.feature}>
					{product.characteristics.map(c => (
						<div className={styles.characteristics} key={c.name}>
							<span className={styles.characteristicsName}>{c.name}</span>
							<span className={styles.characteristicsDots}></span>
							<span className={styles.characteristicsValue}>{c.value}</span>
						</div>
					))}
				</div>
				<div className={styles.advBlock}>
					{product.advantages && <div className={styles.advantages}>
						<div className={styles.advTitle}>Преимущества</div>
						<div>{product.advantages}</div>
					</div>}
					{product.disadvantages && <div className={styles.disadvantages}>
						<div className={styles.advTitle}>Недостатки</div>
						<div>{product.disadvantages}</div>
					</div>}
				</div>
				<Divider className={styles.hr} />
				<div className={styles.actions}>
					<Button appearance='primary'>Узнать подробнее</Button>
					<Button
						onClick={() => setIsReviewOpened(!isReviewOpened)}
						appearance='ghost'
						arrow={isReviewOpened ? 'down' : 'right'}
						className={styles.reviewButton}
						aria-expanded={isReviewOpened}
					>
						Читать отзывы
					</Button>
				</div>

			</Card>
			<motion.div
				layout
				variants={variants}
				initial={'hidden'}
				animate={isReviewOpened ? 'visible' : 'hidden'}>
				<Card color='blue'
					className={styles.reviews}
					ref={reviewRef}
					tabIndex={isReviewOpened ? 0 : -1}
				>
					<>
						{product.reviews.map(r => (
							<div key={r._id} >
								<Review review={r} />
								<Divider />
							</div>
						))}
						<ReviewForm isOpened={isReviewOpened} productId={product._id} />
					</>
				</Card>
			</motion.div>

		</div>
	);
}));