import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

export async function POST(req: any) {
    try {
        const prisma = new PrismaClient();
        const result = await prisma.user.findMany({});
        return NextResponse.json({
            status: 'success',
            data: { result },
        });
    } catch (e) {
        return NextResponse.json({ status: 'fail', data: e });
    }
}
