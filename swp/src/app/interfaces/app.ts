import { CartItem } from "./cart";
import { PrintItem } from "./printItem";

export interface AppState {
    products: PrintItem[];
    cart: CartItem[];
    isCartVisible?: boolean;
    loading: boolean;
    error: string | null;
}