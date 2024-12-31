'use client';
import { useRouter, useSearchParams } from 'next/navigation'; 
import { useEffect, useState } from 'react';
import Image from 'next/image';

type DescriptionItem = {
    description: string;
};

type dataType = {
    url: string;
    currency: string;
    image: string;
    title: string;
    currentPrice: string;
    orginalPrice: string;
    discountRate: string;
    category: string;
    reviewCount: number;
    availableStock: string;
    description: Array<DescriptionItem>;
    lowestPrice: string;
    heighestPrice: string;
    average: string;
};

const ProductPage = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [data, setData] = useState<dataType | null>(null);

    useEffect(() => {
        const getParamsData = searchParams.get('data');

        if (getParamsData) {
            try {
                const parsedData: dataType = JSON.parse(getParamsData);
                console.log('Parsed Description:', parsedData.description);
                setData(parsedData);
            } catch (error) {
                console.error('Error parsing JSON:', error);
            }
        } else {
            console.warn('No data found in search params');
        }
    }, [searchParams]);

    return (
        <div className='space-y-10 p-3'>
			<div className='shadow-md rounded-sm flex flex-col md:flex-row lg:flex-row gap-4 p-5'>
				<div className='flex items-center bg-red-300 w-[1000px]' >
					<Image 
						src={data?.image || '/Images/image.png'} 
						alt='Product Image' 
						width={700} 
						height={800}
						priority
						objectFit="cover"
						placeholder="blur"
						blurDataURL="/placeholder-blur.png"
					/>
				</div>
				<div className='gap-5 flex flex-col'>
					<h1 className='font-bold'>{data?.title}</h1>
					<p>{data?.currentPrice}</p>
					<div className='grid grid-flow-col grid-rows-2 gap-2 '>
						<div className='p-1 bg-slate-200 rounded-sm'>
							<h1>Current Price</h1>
							<p>{data?.currentPrice}</p>
						</div>
						<div className='p-1 bg-slate-200 rounded-sm'>
							<h1>Avarage Price</h1>
							<p>{data?.currentPrice}</p>
						</div>
						<div className='p-1 bg-slate-200 rounded-sm'>
							<h1>Highest Price</h1>
							<p>{data?.heighestPrice}</p>
						</div>
						<div className='p-1 bg-slate-200 rounded-sm'>
							<h1>Lowest Price</h1>
							<p>{data?.lowestPrice}</p>
						</div>
					</div>
					<button className='bg-red-400 p-2 rounded-full'>Track</button>
				</div>
			</div>
			<div>
				<h1 className='font-bold'>Product Description</h1>
				{data?.description.map((item,index)=>(
					<div key={index} className='p-2'>
						<h1>{item.description}</h1>
					</div>
				))}
			</div>
		</div>
    );
};

export default ProductPage;
