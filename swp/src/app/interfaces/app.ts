import { CartItem } from "./cart";
import { Collection } from "./collection";
import { PrintItem } from "./printItem";

export interface AppState {
    products: PrintItem[];
    collections: Collection[];
    cart: CartItem[];
    isCartVisible?: boolean;
    loading: boolean;
    error: string | null;
}