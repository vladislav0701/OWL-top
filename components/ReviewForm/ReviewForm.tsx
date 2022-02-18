import { useState } from 'react';
import axios from 'axios';
import { useForm, Controller } from 'react-hook-form';
import cn from 'classnames';

import { IReviewForm, IReviewSentResponse } from './ReviewForm.interface';
import { ReviewFormProps } from './ReviewForm.props';
import { API } from '../../helpers/api';
import { Input } from '../Input/Input';
import { Rating } from '../Rating/Rating';
import { Textarea } from '../Textarea/Textarea';
import { Button } from '../Button/Button';

import styles from './ReviewForm.module.css';
import CloseIcon from './close.svg';

export const ReviewForm = ({ productId, isOpened, className, ...props }: ReviewFormProps): JSX.Element => {
	const { register, control, handleSubmit, formState: { errors }, reset, clearErrors } = useForm<IReviewForm>();
	const [isSuccess, setIsSuccess] = useState<boolean>(false);
	const [error, setError] = useState<string>();

	const onSubmit = async (formData: IReviewForm) => {
		try {
			const { data } = await axios.post<IReviewSentResponse>(API.review.createDemo, { ...formData, productId });
			if (data.message) {
				setIsSuccess(true);
				reset();
			} else {
				setError('Что-то пошло не так');
			}
		} catch (e) {
			setError(e.message);
		}
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className={cn(styles.reviewForm, className)}
				{...props}>
				<Input
					{...register('name', { required: { value: true, message: 'Заполните имя' } })}
					placeholder='Имя'
					error={errors.name}
					tabIndex={isOpened ? 0 : -1}
					aria-invalid={errors.name ? true : false}
				/>
				<Input
					{...register('title', { required: { value: true, message: 'Заполните заголовок' } })}
					placeholder='Заголовок отзыва'
					error={errors.title}
					tabIndex={isOpened ? 0 : -1}
					aria-invalid={errors.title ? true : false}
				/>
				<div className={styles.rating}>
					<span>Оценка:</span>
					<Controller
						control={control}
						rules={{ required: { value: true, message: 'Укажите рейтинг' } }}
						name='rating'
						render={({ field }) => (
							<Rating
								isEditable
								rating={field.value}
								ref={field.ref}
								setRating={field.onChange}
								error={errors.rating}
								tabIndex={isOpened ? 0 : -1} />
						)} />
				</div>
				<Textarea
					{...register('description', { required: { value: true, message: 'Введите текст' } })}
					className={styles.description}
					placeholder='Текст отзыва'
					error={errors.description}
					tabIndex={isOpened ? 0 : -1}
					aria-label='Текст отзыва'
					aria-invalid={errors.description ? true : false}
				/>
				<div className={styles.submit}>
					<Button appearance='primary' tabIndex={isOpened ? 0 : -1} onClick={() => clearErrors()}>Отправить</Button>
					<span className={styles.info}>* Перед публикацией отзыв пройдет предварительную модерацию и проверку</span>
				</div>
			</div>
			{isSuccess && <div className={styles.success} role='alert'>
				<div className={styles.successTitle}>
					Ваш отзыв отправлен
				</div>
				<div>
					Спасибо, ваш отзыв будет опубликован после проверки.
				</div>
				<button
					className={styles.close}
					aria-label='Закрыть оповещение'
					onClick={() => setIsSuccess(false)}
				>
					<CloseIcon />
				</button>
			</div>}
			{error && <div className={styles.error} role='alert'>
				Что-то пошло не так, попробуйте обновить страницу
				<button
					className={styles.close}
					aria-label='Закрыть оповещение'
					onClick={() => setError(undefined)}
				>
					<CloseIcon />
				</button>
			</div>}
		</form>

	);
};