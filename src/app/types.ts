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