'use client';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation'; 
import { useEffect, useState } from 'react';

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
    const [s, setS] = useState<dataType | null>(null);

    useEffect(() => {
        const d = searchParams.get('data');

        if (d) {
            try {
                const parsedData: dataType = JSON.parse(d);
                console.log('Parsed Description:', parsedData.description);
                setS(parsedData);
            } catch (error) {
                console.error('Error parsing JSON:', error);
            }
        } else {
            console.warn('No data found in search params');
        }
    }, [searchParams]);

    return (
        <div>
            <h1>Product Page</h1>
            {s ? (
                <div>
                    <p><strong>Title:</strong> {s.title}</p>
                    <p><strong>Category:</strong> {s.category}</p>
					<Link href={s.image} target="_blank"><strong>Image:</strong> {s.image}</Link>
                    <p><strong>Current Price:</strong> {s.currentPrice}</p>
                    <div>
                        <strong>Description:</strong>
                        <ul>
                            {s.description.map((item, index) => (
                                <li key={index}><strong>Index{index+1} Description</strong>:{item.description}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            ) : (
                <p>Loading product data...</p>
            )}
        </div>
    );
};

export default ProductPage;
