export interface IProduct {
    "id": number,
    "name": string,
    "description": string,
    "brand": string,
    "model": string,
    "price": number,
    "image": string,
    "createdAt": string,
};

export interface IGenericProduct {
    "id": number,
    "name": string,
    "description": string,
    "brand": string,
    "model": string,
    "price": number,
    "image": string,
    "createdAt": string,
    "quantity": number,
    "isFavorite": boolean,
};