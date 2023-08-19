import { ApiConstant } from "@/constants/apiConstant";
import { NetworkManager } from "@/utils/network/networkManager";

export class ProductService {

    static async getProducts() {
        try {
            let response = await NetworkManager.get(ApiConstant.productsUrl);

            console.log("response", response);

            return response;
        } catch (error) {
            return Promise.reject(error);
        }
    }

}   