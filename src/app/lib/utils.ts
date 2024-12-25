export function extractPrice(...elements: any) {
    for (const element of elements) {
        const priceText = element.text().trim('');
        if (priceText) {
            const match = priceText.match(/\$\d+(\.\d{2})?/);
            if (match) {
                return match[0];
            }
        }
    }
    return '';
}
