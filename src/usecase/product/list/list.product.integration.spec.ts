import { Sequelize } from "sequelize-typescript";
import Product from "../../../domain/product/entity/product";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import ListProductUseCase from "./list.product.usecase";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";

describe("Integration test list product use case", () => {
    let sequelize: Sequelize;
    
    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });

        sequelize.addModels([ProductModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should list products", async () => {
        const productRepository = new ProductRepository();
        const useCase = new ListProductUseCase(productRepository);

        const product = new Product("123", "Product Test", 10);
        await productRepository.create(product);

        const productB = new Product("345", "Product Test", 10);
        await productRepository.create(productB);

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
