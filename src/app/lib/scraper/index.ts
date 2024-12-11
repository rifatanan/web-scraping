import axios from 'axios';
import * as cheerio from 'cheerio';
import { extractPrice } from '../utils';

export async function scrapedAmazonProduct(url: string) {
    console.log('scrapper index');

    if (!url) return;

    const userName = String(process.env.BRIGHT_DATA_USERNAME);
    const password = String(process.env.BRIGHT_DATA_PASSWORD);
    const port = 33335;
    const session_id = (100000 * Math.random()) | 0;

    const options = {
        auth: {
            username: `${userName}-session-${session_id}`,
            password,
        },
        host: 'brd.superproxy.io',
        port,
        rejectUnauthorized: false,
    };

    try {
        const response = await axios.get(url, options);
        const $ = cheerio.load(response.data);
        const title = $('#productTitle').text().trim();
        const currentPrice = extractPrice(
            $(
                'span.a-price.a-text-price.a-size-medium.apexPriceToPay.a-price-whole',
            ),
            $('span.a-offscreen'),
        );

        const orginalPrice = extractPrice($('.a-size-base.a-color-secondary'));

        const availableStock = $(
            '#availability span.a-size-medium.a-color-success',
        )
            .text()
            .trim();

        console.log(
            'title:',
            title +
                '\ncurrentPrice:' +
                currentPrice +
                '\noriginalPrice:' +
                orginalPrice,
            '\navailableStock:' + availableStock,
        );
    } catch (error) {
        console.error('Error fetching product page:', error);
    }
}
