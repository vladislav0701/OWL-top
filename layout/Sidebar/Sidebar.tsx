import cn from 'classnames';

import { SidebarProps } from './Sidebar.props';
import { Menu } from '../Menu/Menu';

import styles from './Sidebar.module.css';
import Logo from '../logo.svg';
import { Search } from '../../components';

export const Sidebar = ({ className, ...props }: SidebarProps): JSX.Element => {
	return (
		<div className={cn(className, styles.sidebar)} {...props}>
			<Logo className={styles.logo} />
			<Search />
			<div>Поиск</div>
			<Menu />
		</div>
	);
};