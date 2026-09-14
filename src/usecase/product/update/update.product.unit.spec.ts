import ProductFactory from "../../../domain/product/factory/product.factory";
import UpdateProductUseCase from "./update.product.usecase";

const product = ProductFactory.create(
    "a", "Product Test", 10
);

const input = {
    id: product.id,
    name: "Product Test Updated",
    price: 20,
};

const MockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(product)),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
    }
}

describe("Unit test update product use case", () => {
    it("should update a customer", async () => {
        const productRepository = MockRepository();
        const productUpdateUseCase = new UpdateProductUseCase(productRepository);

        const output = await productUpdateUseCase.execute(input);
        expect(output).toEqual(input);
    });
});
