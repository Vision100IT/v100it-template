import React from 'react';
import styles from './Collapse.scss';

const Collapse = props => (
	<div className={props.isOpened	? `${styles.toggle}  ${styles.visible}`	: styles.toggle}>
		{props.children}
	</div>
);

Collapse.propTypes = {
	children: React.PropTypes.node,
	isOpened: React.PropTypes.bool
};

export default Collapse;
