import { useState } from 'react';
import cn from 'classnames';
import { useRouter } from 'next/router';

import { Input } from '../Input/Input';
import { Button } from '../Button/Button';
import { SearchProps } from './Search.props';

import styles from './Search.module.css';
import SearchIcon from './search.svg';

export const Search = ({ className, ...props }: SearchProps): JSX.Element => {
	const [search, setSearch] = useState<string>('');
	const router = useRouter();

	const goToSearch = () => {
		router.push({
			pathname: '/search',
			query: {
				q: search
			}
		});
	};

	const handleKeyDown = (e: KeyboardEvent) => {
		if (e.key == 'Enter') {
			goToSearch();
		}
	};

	return (
		<form className={cn(className, styles.search)} {...props} role='search'>
			<Input
				className={styles.input}
				placeholder='Поиск...'
				value={search}
				onChange={(e) => setSearch(e.target.value)}
				onKeyDown={handleKeyDown}
			/>
			<Button
				appearance='primary'
				className={styles.button}
				onClick={goToSearch}
				aria-label='Искать по сайту'
			>
				<SearchIcon />
			</Button>
		</form>
	);
};