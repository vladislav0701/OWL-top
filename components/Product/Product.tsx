import cn from 'classnames';
import Image from 'next/image';


import { ProductProps } from './Product.props';
import { Card } from '../Card/Card';
import { Rating } from '../Rating/Rating';
import { Tag } from '../Tag/Tag';
import { Htag } from '../Htag/Htag';
import { Button } from '../Button/Button';
import { P } from '../P/P';
import { Divider } from '../Divider/Divider';
import { declOfNum, priceRu } from '../../helpers/helpers';
import styles from './Product.module.css';

export const Product = ({ product, className, ...props }: ProductProps): JSX.Element => {
	return (
		<Card className={cn(className, styles.product)}>

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
					{priceRu(product.price)}
					{product.oldPrice && <Tag color='green' className={styles.oldPrice}>{priceRu(product.price - product.oldPrice)}</Tag>}
				</div>
				<div className={styles.credit}>
					{priceRu(product.credit)}
					<span>/мес</span>
				</div>
				<div className={styles.rating}><Rating rating={product.reviewAvg ?? product.initialRating} /></div>
				<div className={styles.priceTitle}>цена</div>
				<div className={styles.creditTitle}>в кредит</div>
				<div className={styles.rateTitle}>{product.reviewCount} {declOfNum(product.reviewCount, ['отзыв', 'отзыва', 'отзывов'])}</div>
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
				<Button appearance='ghost' arrow={'right'} className={styles.reviewButton}>Читать отзывы</Button>
			</div>

		</Card>
	);
};