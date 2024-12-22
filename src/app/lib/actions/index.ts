'use server';

import { scrapeAmazonProduct } from '../scraper';

export async function scrapAddStoreProduct(productURL: string) {
    console.log('action index');

    if (!productURL) return;
    try {
        const scrapedProduct = await scrapeAmazonProduct(productURL);
    } catch (error: any) {
        throw new Error('Failed to create/update product' + error.message);
    }
}
