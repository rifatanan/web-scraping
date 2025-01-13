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

interface Errors {
	price: boolean;
	email: boolean;
  }

const ProductPage = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [data, setData] = useState<dataType | null>(null);
	const [email, setEmail] = useState<string>('');
	const [price, setPrice] = useState<number | null>(null);
	const [isValidEmail, setIsValidEmail] = useState<boolean>(false);
	const [errors, setErrors] = useState<Errors>({ price: false, email: false });

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

	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

	const validateEmail = (value: string) => {
		setIsValidEmail(emailRegex.test(value));
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		validateEmail(value);
		console.log('email:',value);
		
	};

	const handleTrace = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log('Send email Call');
	
		const payload = {
			subject: 'Track Request',
			text: 'User requested to track the product.',
			html: `<h1>Track Request</h1>
			<p>Email: ${email}</p>
			<p>Price: ${price}</p>`,
		};
	
		try {
			const sendMail = await fetch('/api/', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(payload),
			});
	
			const response = await sendMail.json();
			
			if (sendMail.ok) {
				console.log('Mail sent successfully:', response);
			} else {
				console.error('Mail sending failed:', response);
			}
		} catch (error) {
			console.log('Error in sending mail:', error);
		}
	};
	console.log('input Price:',data?.currentPrice);
	

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
								price === null || price <= 0 || price > Number(data?.currentPrice)
								? 'border-red-300' : 'border-blue-300'}`}
							placeholder='Price'
							onChange={(e)=>setPrice(Number(e.target.value))}
						/>
						{
							price === null || price <= 0 || price >= Number(data?.currentPrice)?(<p className='text-red-500'>Price Must Be greater than zero and less than price</p>):''
						}
						<input
							type="text"
							className={`appearance-none focus:outline-none border-2 p-1 ${isValidEmail === true? 'border-blue-300': 'border-red-300'}`}
							placeholder='Email'
							onChange={(e)=>handleChange(e)}
						/>
						{
							isValidEmail === false?(<p className='text-red-500'>Must be Valid Email</p>):''
						}
						<button
							className='bg-red-400 p-2 rounded-full w-full cursor-pointer'
							type='submit'
							disabled={price === null || price === 0 ||  price<Number(data?.currentPrice) || !isValidEmail}
						>
							Track
						</button>
					</form>
				</div>
			</div>
			<div>
				<h1 className='font-bold'>Product Description</h1>
				{data?.description.map((item, index) => (
					<div key={index} className='p-2'>
						<h1>{item.description}</h1>
					</div>
				))}
			</div>
		</div>
    );
};

export default ProductPage;
