import cron from 'node-cron';
import { Email } from './email';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

interface Item {
    url: string;
    price: number;
    email: string;
}

const AfterIntervalEmailCall = () => {
    cron.schedule('*/20 * * * *', async () => {
        //run everyday at 8am code is: '0 8 * * *'
        console.log('Cron job running...');
        try {
            console.log('corn here1');
            const response = await fetch(`${baseUrl}/api/getAllInformation/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log('corn here2');

            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }

            const data: { result: Item[] } = await response.json();

            if (Array.isArray(data.result)) {
                for (const item of data.result) {
                    const res = await fetch(`${baseUrl}/api/productData/`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            inputData: item.url,
                        }),
                    });

                    const resJson = await res.json();
                    const currentPrice: number = Math.floor(
                        Number(
                            resJson.data.currentPrice.replace(/[^0-9.]/g, ''),
                        ),
                    );

                    if (item.price < currentPrice) {
                        console.log(`Sending email to ${item.email}...`);
                        Email(item.email, currentPrice);
                    }
                }
            }
        } catch (error) {
            console.error(
                'Failed to fetch information:',
                (error as Error).message,
            );
        }
    });
};

export default AfterIntervalEmailCall();
