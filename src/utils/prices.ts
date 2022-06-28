import { ProductVariant } from "@medusajs/medusa";

/* Convert price */
export function formatPrice(item: ProductVariant): string {
    const locale = "uk";

    return new Intl.NumberFormat(locale, {
        style: "currency",
        currency: item.prices[0].currency_code,
        minimumFractionDigits: 2,
    }).format(item.prices[0].amount / 100);
}

/* Return price if you have only one price */
export function formatSinglePrice(price: number): string {
    const locale = "uk";

    return new Intl.NumberFormat(locale, {
        style: "currency",
        currency: "EUR",
        minimumFractionDigits: 2,
    }).format(price / 100);
}

/* Get smallest price from product variants */
export function getSmallestVariantPrice(variants: ProductVariant[]): string {
    const smallestPrice = variants.reduce((acc, curr) =>
        acc.prices[0].amount < curr.prices[0].amount ? acc : curr,
    );

    return formatPrice(smallestPrice);
}
