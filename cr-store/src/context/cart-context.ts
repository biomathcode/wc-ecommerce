import { createContext } from '@lit/context';


export interface Product {
    id: number;
    title: string;
    description: string;
    image: string;
    price: number;
    category: string;
}



export interface CartType {
    items: Product[];
    cartItems: Product[];
    addItem: (item: Product) => void;
    removeItem: (id: number) => void;
}

export class Cart implements CartType {
    items: Product[] = [];

    cartItems: Product[] = [];


    addCartItems(itemId: number) {
        console.log('Adding item to cart', itemId);
        const item = this.items.find(i => i.id === itemId);
        if (item) {
            this.cartItems = [...this.cartItems, item]; // Ensures reactivity
        }
        console.log('Adding item to cart', itemId, this.cartItems);
    }

    addItem(item: Product) {
        this.items.push(item);
    }

    removeItem(id: number) {
        this.items = this.items.filter(i => i.id !== id);
    }
}




export const CartContext = createContext<Cart>('cart');