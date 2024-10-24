import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
	title: string;
	imgUrl: string;
	description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
	{
		title: 'Easy Syntax',
		imgUrl: 'img/markdown_location.png',
		description: <>Easy code-block syntax to define locations and links to other notes.</>,
	},
	{
		title: 'Global Configuration',
		imgUrl: 'img/settings.png',
		description: <>A lot of global and per-block configurations are possible.</>,
	},
	{
		title: 'Nice Maps',
		imgUrl: 'img/map.png',
		description: <>Brings beautiful map images inline in your notes.</>,
	},
];

function Feature({ title, imgUrl, description }: FeatureItem) {
	return (
		<div className={clsx('col col--4')}>
			<div className={styles.containerImg + ' text--center'}>
				<img className={styles.featureSvg} role="img" src={imgUrl} />
			</div>
			<div className="text--center padding-horiz--md">
				<Heading as="h3">{title}</Heading>
				<p>{description}</p>
			</div>
		</div>
	);
}

export default function HomepageFeatures(): JSX.Element {
	return (
		<section className={styles.features}>
			<div className="container">
				<div className="row">
					{FeatureList.map((props, idx) => (
						<Feature key={idx} {...props} />
					))}
				</div>
			</div>
		</section>
	);
}
