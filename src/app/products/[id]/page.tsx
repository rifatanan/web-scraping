'use client';
import { useRouter, useSearchParams } from 'next/navigation'; 
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Email } from '@/utils/email';


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

type emailPriceType = {
	email:string,
	price:number|null
}

const ProductPage = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [data, setData] = useState<dataType | null>(null);
	const [email, setEmail] = useState<string>('');
	const [price, setPrice] = useState<number | null>(null);
	const [isValidEmail, setIsValidEmail] = useState<boolean>(false);
	const [inputData, setInputData] = useState<string | null>(null);

    // const callWorker = async(data:emailPriceType) => {
		
	// 	if (typeof window !== 'undefined') {
	// 		const worker = new Worker(new URL('../../../utils/worker.ts', import.meta.url), {
	// 			type: 'module',
	// 		});

	// 		console.log('inputData',inputData);
			
	// 		setInterval(() => {
	// 			worker.postMessage(data);

	// 		}, 10000);
			
	// 		worker.onmessage = (e: any) => {
	// 			console.log('Message from worker:', e.data);
	// 		};

	// 		return () => worker.terminate();
	// 	}
	// };
	
	  useEffect(() => {
		const getParamsData = searchParams.get('data');
		const getParamsInputData = searchParams.get('input');

		if (getParamsData) {
			try {
				const parsedData = JSON.parse(decodeURIComponent(getParamsData));
				console.log('Parsed Description:', parsedData.description);
				console.log('Search Input:', getParamsInputData);
				setData(parsedData);
				setInputData(getParamsInputData);
			} catch (error) {
				console.log('Error parsing JSON:', error);
			}
		} else {
		  console.log('No data found in search params');
		}
	  }, [searchParams]);
	
	  const newPrice: number = Math.floor(Number(data?.currentPrice.replace(/[^0-9.]/g, "")));
	  console.log('newPrice: ',newPrice);
	  
	
	  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	
	  const validateEmail = (value: string) => {
		setIsValidEmail(emailRegex.test(value));
	  };
	
	  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
			const value = e.target.value;
			validateEmail(value);
			setEmail(value);
	  };
	
	  const handleTrace = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log('Send email Call');

		if (inputData !== null) {
			try{
				const sendMail = await fetch('/api/productData/', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({inputData}),
				});

				const createUserInformation = await fetch('/api/create/', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({email,price}),
				});

				const getAllInformation = await fetch('/api/getAllInformation/', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({}),
				});
				const sendMailResponse = await sendMail.json();
				const createUserInformationResponse = await createUserInformation.json();
				const getAllInformationResponse = await getAllInformation.json();

				console.log(createUserInformationResponse);

				if (price !== null && Math.floor(Number(sendMailResponse.data.currentPrice.replace(/[^0-9.]/g, ""))) > price) {
					const intervalVariable = setInterval(() => {
						try {
							console.log("Calling Email function...");
							Email(email, price);
						} catch (err) {
							console.error("Error in Email function:", err);
						}
					}, 10000);
				} else {
					console.warn("Condition not met. Interval not started.");
				}
			}
			catch(error){
				throw error;
			}
		}
		
	  };

    return (
        <div className='space-y-10 p-3'>
			<div className='shadow-md rounded-sm flex flex-col md:flex-row lg:flex-row gap-4 p-5'>
				<div className='flex items-center w-[1000px]' >
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
							<h1>Average Price</h1>
							<p>{data?.average}</p>
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
					<form onSubmit={handleTrace} className='flex flex-col gap-3'>
						<input
							type="number"
							className={`border-2 p-1 appearance-none focus:outline-none ${
								price === null || price <= 0 || price >= newPrice
								? 'border-red-300' : 'border-blue-300'}`}
							placeholder='Price'
							onChange={(e)=>setPrice(Number(e.target.value))}
						/>
						{
							price === null || price <= 0 || price >= newPrice
							?(<p className='text-red-500'>Price Must Be greater than zero and less than current price</p>)
							:''
						}
						<input
							type="text"
							className={`appearance-none focus:outline-none border-2 p-1 ${isValidEmail === true? 'border-blue-300': 'border-red-300'}`}
							placeholder='Email'
							onChange={(e)=>handleChange(e)}
						/>
						{
							isValidEmail === false?(<p className='text-red-500'>rifatanan01719@gmail.com</p>):''
						}
						<button
							className='bg-red-400 p-2 rounded-full w-full cursor-pointer'
							type='submit'
							disabled={price === null || price === 0 ||  price >= newPrice || !isValidEmail}
						>
							Track
						</button>
					</form>
				</div>
			</div>
			<div>
				<h1 className='font-bold'>Product Description</h1>
				{
					data?.description.map((item, index) => (
						<div key={index} className='p-2'>
							<h1>{item.description}</h1>
						</div>
					))
				}
			</div>
		</div>
    );
};

export default ProductPage;
