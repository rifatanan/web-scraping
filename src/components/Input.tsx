'use client'
import { scrapAddStoreProduct } from '@/app/lib/actions';
import { useRouter } from 'next/navigation'

import React, { FormEvent, useState } from 'react';

const isValidAmazonProductURL = (value:string) =>{
	try{
		const parseURL = new URL(value);
		const hostName = parseURL.hostname;
		if(hostName.includes('amazon.com') || hostName.includes('amazon.') || hostName.endsWith('amazon')){
			return true;
		}
	}
	catch(error){
		return false;
	}
}

type inputType ={
	data:object | undefined,
	//setData: React.Dispatch<React.SetStateAction<object | undefined | string>>; 
}

const Input:React.FC<inputType> = ({data}) => {
	const [searchInput, setSearchInput] = useState('');
	const [isLoading,setIsLoading] = useState(false);
	const router = useRouter();

	let a;
	console.log('a',a);
		
		a='4'

	const handleClick = async(event:FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const  validLink = isValidAmazonProductURL(searchInput)
		if(!validLink)alert('Please Provide Vlid Link');
		try{
			setIsLoading(true);
			console.log(isLoading);
			
			const returnData =  await scrapAddStoreProduct(searchInput);
			//setData(returnData);
			console.log("return :",returnData);
			
			const serializedData = encodeURIComponent(JSON.stringify(returnData));
        	router.push(`/products/1?data=${serializedData}`);
		}
		catch(error){
			console.log(error);
		}finally{
			setIsLoading(false);
		}
	}

	return (
		<form onSubmit={handleClick} className='w-full flex items-center gap-2'>
			<input type="text"
				value={searchInput}
				onChange={(e)=>setSearchInput(e.target.value)}
				className='p-2 w-[94%] outline-none rounded-md bg-slate-100'/>
			<button
				className='p-2 bg-green-300 rounded-md'
				disabled={searchInput === '' || isLoading}>
					{isLoading?'Seaching...':'Search'}
			</button>
		</form>
	)
}

export default Input
