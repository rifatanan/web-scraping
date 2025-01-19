import { scrapAddStoreProduct } from '@/app/lib/actions';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    const { inputData } = await req.json();
    try {
        const result = await scrapAddStoreProduct(inputData);
        return NextResponse.json({ success: true, data: result });
    } catch (error) {
        return NextResponse.json({
            success: false,
            error: 'Error processing request',
        });
    }
}
