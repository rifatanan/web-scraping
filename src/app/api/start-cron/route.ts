import { NextResponse } from 'next/server';
import AfterIntervalEmailCall from '@/utils/AfterIntervalEmailCall';

let cronStarted = false;

export async function GET() {
    if (!cronStarted) {
        console.log('in get method');

        AfterIntervalEmailCall;
        cronStarted = true;
        console.log('Cron job started.');
    }
    return NextResponse.json({
        message: 'Cron job started (if not already running).',
    });
}
