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

export interface ICart {
    "product": IProduct,
    "quantity": number,
}