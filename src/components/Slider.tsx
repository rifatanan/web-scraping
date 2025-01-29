'use client';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { setInterval } from 'timers';

const heroIcon = [
	{ title: 'hero-1', src: '/assets/images/hero-1.svg' },
	{ title: 'hero-2', src: '/assets/images/hero-2.svg' },
	{ title: 'hero-3', src: '/assets/images/hero-3.svg' },
	{ title: 'hero-4', src: '/assets/images/hero-4.svg' },
	{ title: 'hero-5', src: '/assets/images/hero-5.svg' },
];


const Slider = () => {
	const [currentIndex, setCurrentIndex] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentIndex((prev) =>{
				if(prev === heroIcon.length-1)
					prev=0;
				else
					prev = prev+1;
				return prev;
			}
		)}, 4000);
		clearInterval(interval);
	  }, []);

	return (
		<div className="relative bg-slate-200 rounded-lg">
			<div className="relative">
				<Image
					src={heroIcon[currentIndex].src}
					width={0}
					height={0}
					alt={heroIcon[currentIndex].title}
					className="w-full h-[500px]"
				/>

				<div className="absolute bottom-4 left-0 right-0 flex justify-center gap-4">
				{
					heroIcon.map((_, index) => (
						<button
							key={index}
							onClick={() => setCurrentIndex(index)}
							className={`${index === currentIndex ? 'bg-green-400' : 'bg-white'} px-2 py-2 rounded-full shadow-lg`}
							>
						</button>
					))}
				</div>
			</div>
		</div>
	);
};

export default Slider;
