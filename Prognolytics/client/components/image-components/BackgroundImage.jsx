import styles from '@/styles';
import Image from 'next/image';
import React from 'react';

const BackgroundImage = ({ ImageUrl, alt }) => {
	return (
		<Image
			src={ImageUrl}
			alt={alt}
			width={3840}
			height={2160}
			priority
			className={`absolute inset-0 h-screen w-screen object-cover opacity-50 lg:opacity-100`}
		/>
	);
};

export default BackgroundImage;
