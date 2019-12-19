## Giftano Backend Take Home Assignement
This is my [Giftano](https://giftano.com) take home assignment based on [Giftano-Backend-Test](https://github.com/mnrendra/giftano-backend-test/blob/master/Backend-Developer-Take-Home-Assignment.pdf) requirements.

### Assginment
This is backend RESTful API for CRUD products and categories databse wich cluster on `MongoDB Atalas`

### API Documentations
| Query      | Default   | Description                                                                            | Example                                                                                                                       |
|------------|-----------|----------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------|
| `limit`    |       `3` | limit of documents per request                                                         | `GET /products?limi=10` will return 10 documents per request                                                                  |
| `page`     |       `0` | page number (start from 0)                                                             | `GET /products?page=1` will return page number two                                                                            |
| `minPrice` |       `0` | minimal price filter query                                                             | `GET /products?minPrice=100` will return documents where price value is more than 100 SGD (if currency set as SGD)            |
| `maxPrice` | `1000000` | maximum price filter query                                                             | `GET /products?maxPrice=1000` will return documents where price value is less than 1000 SGD (if currency set as SGD)          |
| `sortBy`   |           | sorting documents result by option value: `priceAsc`, `priceDes`, `nameAsc`, `nameDes` | `GET /products?sortBy=priceAsc` will return documents sort by price in ascending                                              |
| `ageRange` |           | filter by age range                                                                    | `GET /products?ageRange=20to30years` will return documents where age range only has value `20to30years`                       |
| `brand`    |           | filter by brand                                                                        | `GET /products?brand=1-Altitude` will return documents where brand only has value `1-Altitude`                                |
| `category` |           | filter by category                                                                     | `GET /products?category=Popular Gifts` will return documents where category only has value `Popular Gifts`                    |
| `delivOpt` |           | filter by delivery option                                                              | `GET /products?delivOpt=Send by E-Gift Card` will return documents where delivery option only has value `Send by E-Gift Card` |
| `occasion` |           | filter by occasion                                                                     | `GET /products?occasion=Christmas Gifts` will return documents where occasion only has value `Christmas Gifts`                |
| `toWhom`   |           | filter by to whom                                                                      | `GET /products?toWhom=Gifts For Dad` will return documents where to whom only has value `Gifts For Dad`                       |
#### Examples
#### `GET /products?limit=5&page=0&minPrice=500&maxPrice=1000&toWhom=Gifts For Mum&sortBy=priceDes`
```json

  "status": 200,
  "total": 3,
  "limit": 5,
  "page": 0,
  "data": [
    {
      "id": "5dfb1ba2483624089b63c0fd",
      "name": "Ninth Product",
      "description": "this is 9th product",
      "price": 901.23,
      "ageRange": "40to50years",
      "brand": "Alma by Juan Amador | Eurasian Michelin-star Dining",
      "category": "Best Experience Gifts in Singapore",
      "delivOpt": "Send by Email",
      "occasion": "Anniversary Gifts",
      "toWhom": "Gifts For Mum"
    },
    {
      "id": "5dfb1b85483624089b63c0fc",
      "name": "Eighth Product",
      "description": "this is 8th product",
      "price": 890.12,
      "ageRange": "40to50years",
      "brand": "AJ Hackett Singapore: Bungy Jumping",
      "category": "Best Experience Gifts in Singapore",
      "delivOpt": "Send by Email",
      "occasion": "Anniversary Gifts",
      "toWhom": "Gifts For Mum"
    },
    {
      "id": "5dfb1b5e483624089b63c0fb",
      "name": "Seventh Product",
      "description": "this is 7th product",
      "price": 789.01,
      "ageRange": "30to40years",
      "brand": "AJ Hackett Singapore: Bungy Jumping",
      "category": "Best Experience Gifts in Singapore",
      "delivOpt": "Send by Email",
      "occasion": "Anniversary Gifts",
      "toWhom": "Gifts For Mum"
    }
  ]
}
```