import supertest, { SuperTest } from "supertest";
import app from "../src/app";
import fruits from "../src/data/fruits";
import { create2Fruits, createApple } from "./factories/fruit.factory";

const server = supertest(app);

beforeEach(() => {
  fruits.length = 0;
});

describe("Inserting fruits on the db", () => {
  it("POST NEW FRUIT SUCCESFULLY", async () => {
    const fruit = {
      name: "maçã",
      price: 3,
    };

    const result = await server.post("/fruits").send(fruit);
    expect(result.status).toBe(201);
  });

  it("POST FRUIT ALREADY EXISTS 409", async () => {
    createApple();
    const fruit = {
      name: "maçã",
      price: 3,
    };

    const result = await server.post("/fruits").send(fruit);
    expect(result.status).toBe(409);
  });

  it("POST FRUIT WITH DATA MISSING", async () => {
    const fruit = {
      name: "maçã",
    };

    const result = await server.post("/fruits").send(fruit);
    expect(result.status).toBe(422);
  });

  it("GET ALL FRUITS SUCCESFULLY", async () => {
    create2Fruits();

    const result = await server.get("/fruits");
    expect(result.body.length).toEqual(2);
  });

  it("GET FRUIT ID SUCCESFULLY", async () => {
    createApple();

    const result = await server.get("/fruits/1");
    expect(result.body).toEqual({
      id: 1,
      name: "maçã",
      price: 3,
    });
  });

  it("GET FRUIT ID NOT VALID", async () => {
    createApple();

    const result = await server.get("/fruits/0");
    expect(result.status).toBe(400);
  });

  it("GET NON EXISTING FRUIT", async () => {
    const result = await server.get("/fruits/1");
    expect(result.status).toBe(404);
  });
});
