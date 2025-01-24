import styles from './styles.module.css';

export default function DevWarning() {
	return (
		<div className={styles.warningContainer}>
			<p>
				This documentation is under development and references v2 of the plugin which is (not yet)
				available!
			</p>
		</div>
	);
}
