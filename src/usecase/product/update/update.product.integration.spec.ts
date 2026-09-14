import { Sequelize } from "sequelize-typescript";
import Product from "../../../domain/product/entity/product";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import UpdateProductUseCase from "./update.product.usecase";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";

describe("Unit test update product use case", () => {
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

    it("should update a customer", async () => {
        const productRepository = new ProductRepository();
        const productUpdateUseCase = new UpdateProductUseCase(productRepository);

        const product = new Product("123", "Product Test", 10);
        await productRepository.create(product);

        const input = {
            id: product.id,
            name: "Product Test Updated",
            price: 20,
        };

        const output = await productUpdateUseCase.execute(input);
        expect(output).toEqual(input);
    });
});
