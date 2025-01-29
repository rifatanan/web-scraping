import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

export async function POST(req: any) {
    const { email, price, inputData } = await req.json();
    try {
        const prisma = new PrismaClient();
        const result = await prisma.user.create({
            data: {
                email: email,
                price: price,
                url: inputData,
            },
        });
        return NextResponse.json({
            status: 'success',
            data: { result },
        });
    } catch (e) {
        return NextResponse.json({ status: 'fail', data: e });
    }
}
