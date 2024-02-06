export class Product {

    id?: string;
    code?: string;
    name?: string;
    description?: string;
    price?: number;
    quantity?: number;
    inventoryStatus?: string;
    category?: string;
    image?: string;
    rating?: number;

    constructor(id: string, code: string, name: string, description: string, image: string, price: number, category: string, quantity: number, inventoryStatus: string, rating: number) {
            this.id = id
            this.code = code
            this.name = name
            this.description = description
            this.image = image
            this.price = price
            this.category = category
            this.quantity = quantity
            this.inventoryStatus = inventoryStatus
            this.rating = rating
    }

    // TODO: Add product logic
}