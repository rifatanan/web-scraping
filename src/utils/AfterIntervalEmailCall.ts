'use client';
import { useEffect } from 'react';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

const AfterIntervalEmailCall = () => {
    useEffect(() => {
        const intervalId = setInterval(async () => {
            try {
                const response = await fetch(
                    `${baseUrl}/api/getAllInformation/`,
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    },
                );

                if (!response.ok) {
                    throw new Error(`Error: ${response.status}`);
                }

                const data = await response.json();

                //console.log(data);
                if (Array.isArray(data.result)) {
                    for (const item of data.result) {
                        const res = await fetch('/api/productData/', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                inputData:
                                    'https://www.amazon.com/Apple-MacBook-13-inch-Storage-Renewed/dp/B09BK21GFW/ref=sr_1_1?crid=2H08ZHDMP35ZA&dib=eyJ2IjoiMSJ9.oPSiK65gxw8E3B_Rj6OOf_ieVJsnjgS376Bfh5mkZZiigTMKIQIT8IKlioymokssx60FU6VBbHplA-e_9n78fk5rKUBrKv7sYE-gYC0JvjgOJsGSfch6si2A_-OdG91x4mwA7GmNMCK2JAPCwbv449JXW_Ayo8FcAyKfuiMrKStYXbQBjSX1u98lS13d13QWjPxxwKkF1YQEvcU7uYafqSHYLY6AfNWI6HeMn_x5oLY.iBsnjFi3wqX_3A3ekFzNzDJpmouwJnXY-eiP_KlOtCg&dib_tag=se&keywords=macbook%2Bair&qid=1733840214&sprefix=macboo%2Caps%2C394&sr=8-1&th=1',
                            }),
                        });
                        const resJson = await res.json();
                        console.log(resJson);
                    }
                } else {
                    console.error('data.result is not an array:', data.result);
                }

                console.log('Fetched Data12:', data.result);
            } catch (error) {
                console.error('Failed to fetch information:', error);
            }
        }, 10000);

        //return () => clearInterval(intervalId); // Cleanup the interval on unmount
    }, []);

    return null; // This component doesn't render anything
};

export default AfterIntervalEmailCall;
