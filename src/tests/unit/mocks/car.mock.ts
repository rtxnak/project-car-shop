export const newCar = {
  model: 'Ford',
  year: 2015,
  color: 'white',
  status: true,
  buyValue: 35000,
  doorsQty: 4,
  seatsQty: 4,
};

export const newCarResponse = {
  model: 'Ford',
  year: 2015,
  color: 'white',
  status: true,
  buyValue: 35000,
  doorsQty: 4,
  seatsQty: 4,
  _id: '2eb6e8e8e9b6f4194e000009',
};

export const newCarInvalid = {
  model: 'Ford',
  year: "2015",
  color: 'white',
  status: "true",
  buyValue: "35000",
  doorsQty: "4",
  seatsQty: "4",
}

export const newCarInvalidResponse = {
  error: {
    issues: [
      {
        code: "invalid_type",
        expected: "number",
        received: "string",
        path: [
          "year"
        ],
        message: "Expected number, received string"
      },
      {
        code: "invalid_type",
        expected: "boolean",
        received: "string",
        path: [
          "status"
        ],
        message: "Expected boolean, received string"
      },
      {
        code: "invalid_type",
        expected: "number",
        received: "string",
        path: [
          "buyValue"
        ],
        message: "Expected number, received string"
      },
      {
        code: "invalid_type",
        expected: "number",
        received: "string",
        path: [
          "doorsQty"
        ],
        message: "Expected number, received string"
      },
      {
        code: "invalid_type",
        expected: "number",
        received: "string",
        path: [
          "seatsQty"
        ],
        message: "Expected number, received string"
      }
    ],
    name: "ZodError"
  }
}