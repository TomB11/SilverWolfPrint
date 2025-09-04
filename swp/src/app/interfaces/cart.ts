export interface CartItem {
    productId: string;
    name: string
    price: number;
    image: string | null;
    quantity: number;
}