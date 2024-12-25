'use client';
import { useRouter } from 'next/navigation'; // Use 'next/navigation' in the App Router
import { useEffect, useState } from 'react';

const ProductPage = () => {
    const router = useRouter();
    const [productData, setProductData] = useState<string>('');

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const data:string|null = urlParams.get('data');
		
		//setProductData(data);

		console.log('data:',data);

        // if (data) {
        //     const parsedData = JSON.parse(decodeURIComponent(data));
        //     setProductData(parsedData);
        // }
    }, []);

    return (
        <div>
            <h1>Page</h1>
            <p>{productData }</p>
        </div>
    );
};

export default ProductPage;
