import fruits from "../../src/data/fruits";

export function createApple() {
  return fruits.push({
    id: 1,
    name: "maçã",
    price: 3,
  });
}

export function create2Fruits() {
  return fruits.push(
    {
      id: 1,
      name: "maçã",
      price: 3,
    },
    {
      id: 2,
      name: "pera",
      price: 2,
    }
  );
}
