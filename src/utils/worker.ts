import { scrapAddStoreProduct } from '@/app/lib/actions';
import { Email } from './email';

// Worker logic
self.onmessage = async e => {
    console.log('Worker received:', e.data);

    const callEmail = Email(e.data.email, e.data.price);
    self.postMessage(`email send`);
};
