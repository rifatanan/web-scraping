export const Email = async (email: any, price: any) => {
    console.log('log from email.js....email:' + email + '\n price:' + price);

    const payload = {
        subject: 'Track Request',
        text: 'User requested to track the product.',
        html: `<h1>Track Request</h1>
				<p>Email: ${email}</p>
				<p>Price: ${price}</p>`,
        email: email,
    };

    try {
        const sendMail = await fetch('/api/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        const response = await sendMail.json();

        if (sendMail.ok) {
            console.log('Mail sent successfully:', response);
            return;
        } else {
            console.error('Mail sending failed:', response);
        }
    } catch (error) {
        console.log('Error in sending mail:', error);
    }
};
