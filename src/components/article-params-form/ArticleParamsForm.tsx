import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Text } from 'src/ui/text';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import styles from './ArticleParamsForm.module.scss';
import { useState, FormEvent, useRef, useEffect } from 'react';
import { clsx } from 'clsx';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';
import {
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
	defaultArticleState,
	ArticleStateType,
	OptionType
} from '../../constants/articleProps'


type ArticleFormProps = {
	onSubmitForm: (value: ArticleStateType) => void;
	onResetForm: (value: ArticleStateType) => void;
};

export const ArticleParamsForm = (props: ArticleFormProps) => {
	const { onSubmitForm, onResetForm } = props;

	const formRef = useRef<ArticleStateType>(defaultArticleState);
	const sideBarRef = useRef<HTMLDivElement | null>(null);

	const [isOpen, setIsOpen] = useState<boolean>(false);
	
	const [fontFamily, setFontFamily] = useState<OptionType>(
		formRef.current.fontFamilyOption
	);

	const [fontColor, setFontColor] = useState<OptionType>(
		formRef.current.fontColor
	);

	const [fontSize, setFontSize] = useState<OptionType>(
		formRef.current.fontSizeOption
	);

	const [contentWidth, setContentWidth] = useState<OptionType>(
		formRef.current.contentWidth
	);

	const [backgroundColor, setBackgroundColor] = useState<OptionType>(
		formRef.current.backgroundColor
	);

	useOutsideClickClose({
		isOpen: isOpen,
		rootRef: sideBarRef,
		onClose: () => setIsOpen(false),
	});

	const toggler = () => {
		setIsOpen((prev) => !prev);
	};

	const handleFontFamily = (param: OptionType) => {
		setFontFamily(param);
	};

	const handleFontSize = (param: OptionType) => {
		setFontSize(param);
	};

	const handleFontColor = (param: OptionType) => {
		setFontColor(param);
	};

	const handleBackgroundColor = (param: OptionType) => {
		setBackgroundColor(param);
	};

	const handleContentWidth = (param: OptionType) => {
		setContentWidth(param);
	};

	const handleParamsSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		onSubmitForm({
			fontFamilyOption: fontFamily,
			fontColor: fontColor,
			backgroundColor: backgroundColor,
			contentWidth: contentWidth,
			fontSizeOption: fontSize
	});
	};

	const handleParamsReset = () => {
		onResetForm(formRef.current);
		setFontFamily(formRef.current.fontFamilyOption);
		setFontSize(formRef.current.fontSizeOption);
		setBackgroundColor(formRef.current.backgroundColor);
		setFontColor(formRef.current.fontColor);
		setContentWidth(formRef.current.contentWidth);
	};
	
	return (
		<div ref={sideBarRef}>
			<ArrowButton isOpen={ isOpen } onClick={ toggler } />
			<aside className={ clsx(styles.container, {[styles.container_open]: isOpen })}>
				<form className={ styles.form }
				  onSubmit={ handleParamsSubmit }
				  onReset={ handleParamsReset }
				>
				<Text children='Задайте параметры' as='h2' size={ 31 } weight={ 800 } uppercase={ true } />
				<Select
				  selected={ fontFamily }
					options ={ fontFamilyOptions }
					title='Шрифт'
					onChange={ handleFontFamily }
				/>
				<RadioGroup
					name='fontSize'
					options={ fontSizeOptions }
					selected={ fontSize }
					title='Размер шрифта'
					onChange={ handleFontSize }
				/>
				<Select
					selected={ fontColor }
					options={ fontColors }
					title='Цвет шрифта'
					onChange={ handleFontColor }
				/>
				<Separator />
				<Select
					selected={ backgroundColor }
					options={ backgroundColors }
					title='Цвет фона'
					onChange={ handleBackgroundColor }
				/>
				<Select
					selected={ contentWidth }
					options={ contentWidthArr }
					title='Ширина контента'
					onChange={ handleContentWidth }
				/>
					<div className={ styles.bottomContainer }>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</div>
	);
};
