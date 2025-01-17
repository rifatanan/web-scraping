import { Email } from './email';

// Worker logic
self.onmessage = e => {
    console.log('Worker received:', e.data);
    setInterval(() => {
        const callEmail = Email(e.data.email, e.data.price);
        self.postMessage(`Worker response after delay: ${e.data}`);
    }, 60000);
};
