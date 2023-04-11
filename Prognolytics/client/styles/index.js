const styles = {
	flexCenter: 'flex justify-center items-center',

	blurOverlay: 'backdrop-blur-sm fixed top-0 left-0 w-full h-full',
	sideBar: 'hidden sm:block h-screen fade-in-left',

	elementCenter:
		'flex justify-center items-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2',
	form: 'p-10 flex-col min-w-max h-[80%] max-h-[90vh] drop-shadow-2xl',
	logRegForm: 'p-4 flex-col drop-shadow-2xl',
	expenseForm: 'p-6 flex-col min-w-max h-[80%] max-h-[80vh] drop-shadow-2xl',
	formIcon: 'absolute inset-y-0 flex items-center pl-4',
	formInput: 'rounded-2xl p-4 pl-14 w-full text-background-color',
	formInputPos: 'relative mt-4 px-4 w-full',

	cardSize: 'md:mx-10 w-[100%]',

	button:
		'border-2 text-black bg-secondary-contrast-text hover:bg-primary-contrast-text hover:text-white rounded-full',
};

export default styles;
