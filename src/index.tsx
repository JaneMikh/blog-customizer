import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties } from 'react';
import clsx from 'clsx';
import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import { defaultArticleState } from './constants/articleProps';
import { useState } from 'react';
import './styles/index.scss';
import styles from './styles/index.module.scss';
import { ArticleStateType } from './constants/articleProps';
const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const [articleState, setArticleState] = useState<ArticleStateType>(defaultArticleState);;
	const onSubmit = (props: ArticleStateType) => setArticleState(props);
	const onReset = (props: ArticleStateType) => setArticleState(props);

	return (
		<main
			className={ clsx(styles.main) }
			style={
				{
					'--font-family': articleState.fontFamilyOption.value,
					'--font-size': articleState.fontSizeOption.value,
					'--font-color': articleState.fontColor.value,
					'--container-width': articleState.contentWidth.value,
					'--bg-color': articleState.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm 
			  onSubmitForm={ onSubmit }
				onResetForm={ onReset }
			/>
			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
