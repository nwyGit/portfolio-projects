import Image from 'next/image';
import React from 'react';

const BackgroundImage = ({ ImageUrl, alt }) => {
	return (
		<Image
			src={ImageUrl}
			alt={alt}
			width={3840}
			height={2160}
			unoptimized
			priority
			className={`fixed top-0 left-0 min-h-[100%] w-auto`}
		/>
	);
};

export default BackgroundImage;
