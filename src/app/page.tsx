'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import Input from '@/components/Input'
import Slider from '@/components/Slider'

const page = () => {
	const [data,setData] =  useState<object | undefined >(undefined);

	return (
		<div className='px-2 md:px-5 py-10 space-y-3 relative shadow-2xl grid grid-cols-1 md:grid-cols-2 w-full justify-center items-center'>
			<div className='flex flex-wrap justify-center items-center px-2 md:px-10 gap-3'>
				<div className='flex items-center'>
					<p>Smart Shopping Starts Here:</p>
					<Image src='/assets/icons/arrow-right.svg' width={20} height={20} alt='image'/>
				</div>
				<h1 className='font-bold text-4xl'>Unlesh the Power of <span className='text-red-600'>Price Wise</span></h1>
				<p>Powerfull and self serve product and growth analytics to help you and convert,engage and retain more</p>
				<Input />
			</div>
			<Slider />
		</div>
	)
}

export default page
