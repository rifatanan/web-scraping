import { mailOptions, trasporter } from '@/config/nodemailer';
import { NextResponse } from 'next/server';

export async function POST(req: any, res: any) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    const body = await req.json();
    const { subject, text, html, email, price } = body;
    console.log('api catch email:', email);

    try {
        trasporter.sendMail({
            ...mailOptions,
            to: email,
            subject,
            text,
            html,
        });

        return NextResponse.json({ status: 'success', data: 'hi' });
    } catch (e) {
        return NextResponse.json({ status: 'fail', data: e });
    }
}
