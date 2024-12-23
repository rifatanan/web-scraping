'use server';

import { scrapedAmazonProduct } from '../scraper';

export async function scrapAddStoreProduct(productURL: string) {
    console.log('action index');

    if (!productURL) return;
    try {
        const scrapedProduct = await scrapedAmazonProduct(productURL);
        return scrapedProduct;
    } catch (error: any) {
        throw new Error('Failed to create/update product' + error.message);
    }
}
