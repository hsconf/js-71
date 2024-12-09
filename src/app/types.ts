export interface Dish {
    title: string;
    price: string;
    image: string;
}

export interface Dishes extends Dish {
    id: string;
}

export interface IDish {
    [id: string]: Dish;
}

export interface Order {
    [id: string]: number;
}

export interface ApiOrder {
    dishes: Order
}
