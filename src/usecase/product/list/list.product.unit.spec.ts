import Product from "../../../domain/product/entity/product";
import ProductB from "../../../domain/product/entity/product-b";
import ListProductUseCase from "./list.product.usecase";

const product = new Product("123", "Product Test", 10);
const productB = new ProductB("123", "Product Test", 10);

const MockRepository = () => {
    return {
        find: jest.fn(),
        findAll: jest.fn().mockReturnValue(Promise.resolve([product, productB])),
        create: jest.fn(),
        update: jest.fn(),
    }
}

describe("Unit test list product use case", () => {
    it("should list products", async () => {
        const productRepository = MockRepository();
        const useCase = new ListProductUseCase(productRepository);

        const output = await useCase.execute({});
        expect(output.products.length).toBe(2)
        expect(output.products[0]!.id).toBe(product.id)
        expect(output.products[0]!.name).toBe(product.name)
        expect(output.products[0]!.price).toBe(product.price)
        expect(output.products[1]!.id).toBe(productB.id)
        expect(output.products[1]!.name).toBe(productB.name)
        expect(output.products[1]!.price).toBe(productB.price)
    });
});
