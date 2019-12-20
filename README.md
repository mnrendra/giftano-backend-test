# Giftano Backend Take Home Assignement
This is my [Giftano](https://giftano.com) take home assignment based on [Giftano-Backend-Test](https://github.com/mnrendra/giftano-backend-test/blob/master/Backend-Developer-Take-Home-Assignment.pdf) document.<br/>
This assignment is to create Backend RESTful API for CRUD product and the category.<br/>
This assignment was built using:<br/>
`NodeJs` for the runtime,<br/>
`ExpressJs` for the RESTful framework,<br/>
`MongoDB` for the databse,<br/>
and several NodeJs frameworks for the utilities.
<br/>
And the results have been deploy in [AWS](http://54.179.136.16/giftano-backend) and [Digitalocean](http://178.128.88.151/giftano-backend).<br/>
The database cloud on `MongoDB Atlas`.
Below is the API documentation:

# API Documentations

## `/products` endpoint
### `GET /products`
Get all products from database.<br/>
This API has query parameters and some of them have default values.<br/>
Below is the query parameters and the default values.

| Query | Default Value | Description | Example |
|---|---|---|---|
| `limit` | `3` | Limitation of products number per request. This is intended for pagination. | `GET /products?limi=10` will return 10 products per request |
| `page` | `0` | Page request number *start from 0. This is combined with `limit` for pagination. | `GET /products?page=1` will return page number two |
| `minPrice` | `0` | Filter products that only have a price above the `minPrice` value. | `GET /products?minPrice=100` will return products where price value is more than 100 |
| `maxPrice` | `1000000` | Filter products that only have a price below the `minPrice` value. | `GET /products?maxPrice=1000` will return products where price value is less than 1000 |
| `sortBy` || Sort products based on parameter value.<br/><i>Below is the parameter value options:</i><br/>`priceAsc` sort by price in ascending order,<br/>`priceDes` sort by price in descending order,<br/>`nameAsc` sort by name in ascending order,<br/>`nameDes` sort by name in decending order. | `GET /products?sortBy=priceAsc` will return products sort by price in ascending order. |
| `ageRange` || Filter products by age range | `GET /products?ageRange=20to30years` will only return products that age range has value `20to30years` |
| `brand` || Filter products by brand | `GET /products?brand=1-Altitude` will only return products that brand has value `1-Altitude` |
| `category` || Filter products by category | `GET /products?category=Popular Gifts` will only return products that category has value `Popular Gifts` |
| `delivOpt` || Filter products by delivery option | `GET /products?delivOpt=Send by E-Gift Card` will only return products that delivery option has value `Send by E-Gift Card` |
| `occasion` || Filter products by occasion | `GET /products?occasion=Christmas Gifts` will only return products that occasion has value `Christmas Gifts` |
| `toWhom` || Filter products by to whom | `GET /products?toWhom=Gifts For Dad` will only return products that to whom has value `Gifts For Dad` |

*This default value can be changed in `/config/default.josn` file.

#### Example:

request:
#### `GET /products?limit=2&page=0&minPrice=500&maxPrice=1000&toWhom=Gifts For Mum&sortBy=priceDes`

response:
```json
{
  "status": 200,
  "total": 3,
  "limit": 2,
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
    }
  ]
}
```

<hr/>

### `GET /products/:id`
Get product by product-id.

#### Example:

request:
#### `GET /products/5dfb1b85483624089b63c0fc`

response:
```json
{
  "status": 200,
  "data": {
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
  }
}
```

<hr/>

### `POST /products`
Post new product.<br/>
This API require data to post as new product.<br/>
Below is data requirements:

| Field | Type | Specification |
|---|---|---|
| `name` | `String` | minimum length is 3 characters and maximum length is 63 characters |
| `description` | `String` | minimum length is 12 characters and maximum length is 255 characters |
| `price` | `Number` | minimum value is 0.01 and maximum length is 999999.99 characters |
| `ageRangeId` | `ObjectId` | The value should be an ageRange-id that get from `GET /ageranges` |
| `brandId` | `ObjectId` | The value should be a brand-id that get from `GET /brands` |
| `categoryId` | `ObjectId` | The value should be a category-id that get from `GET /categories` |
| `delivOptId` | `ObjectId` | The value should be a delivOpt-id that get from `GET /delivOpts` |
| `occasionId` | `ObjectId` | The value should be an occasion-id that get from `GET /occasions` |
| `toWhomId` | `ObjectId` | The value should be a toWhom-id that get from `GET /towhoms` |

*This specification can be changed in `/config/default.josn` file.

#### Example:

request:
#### `POST /products`

data:
```json
{
  "name": "First Product",
  "description": "this is 1st product",
  "price": 123.45,
  "ageRangeId": "5dfb14f0483624089b63c0e0",
  "brandId": "5dfb1553483624089b63c0e3",
  "categoryId": "5dfb1591483624089b63c0e6",
  "delivOptId": "5dfb15dc483624089b63c0e9",
  "occasionId": "5dfb170c483624089b63c0f2",
  "toWhomId": "5dfb1668483624089b63c0ef"
}
```
response:
```json

{
  "status": 200,
  "success": {
    "message" : "successfully create new product!"
  }
}
```
<hr/>

### `PUT /products/:id`
Update product data.<br/>
This API require product-id that will be updated.<br>
And this API require data option for update the data.

#### Example:

request:
#### `PUT /products/5dfb18af483624089b63c0f5`

data:
```json
{
  "price": 543.21
}
```
response:
```json
{
  "status": 200,
  "success": {
    "message": "successfully update product."
  }
}
```
<hr/>

### `DELETE /products/:id`
Delete product document.<br/>
This API require product-id that will be deleted.

#### Example:

request:
#### `DELETE /products/5dfb18af483624089b63c0f5`

response:
```json
{
  "status": 200,
  "success": {
    "message": "successfully delete product."
  }
}
```
<hr/>

## `/ageranges` endpoint

### `GET /ageranges`
Get all ageRanges.
#### Example:
request:
#### `GET /ageranges`
response:
```json
{
  "status": 200,
  "data": [
    {
      "id": "5dfb14f0483624089b63c0e0",
      "value": "20to30years"
    }
  ]
}
```

### `GET /ageranges/:id`
Get ageRanges by ageRange-id.
#### Example:
request:
#### `GET /ageranges/5dfb14f0483624089b63c0e0`
response:
```json
{
  "status": 200,
  "data": {
    "id": "5dfb14f0483624089b63c0e0",
    "value": "20to30years"
  }
}
```

### `POST /ageranges`
Post new ageRange.<br>
Require `value` data to post as new ageRange.
#### Example:
request:
#### `POST /ageranges`
data:
```json
{
  "value": "20to30years"
}
```
response:
```json
{
  "status": 200,
  "success": {
    "message": "Successfully creating new agerange"
  }
}
```

### `PUT /ageranges/:id`
Update agaRange data.<br/>
Require ageRange-id that will be updated.<br/>
And require value data for which to be updated.
#### Example:
request:
#### `PUT /ageranges/5dfb14f0483624089b63c0e0`
data:
```json
{
  "value": "30to40years"
}
```
response:
```json
{
  "status": 200,
  "success": {
    "message": "Successfully update agerange"
  }
}
```

### `DELETE /ageranges/:id`
Delete agaRange document.<br/>
Require ageRange-id that will be deleted.
#### Example:
request:
#### `DELETE /ageranges/5dfb14f0483624089b63c0e0`
response:
```json
{
  "status": 200,
  "success": {
    "message": "Successfully delete agerange"
  }
}
```

<hr/>

## `/brands` endpoint

### `GET /brands`
Get all brands.
#### Example:
request:
#### `GET /brands`
response:
```json
{
  "status": 200,
  "data": [
    {
      "id": "5dfb14f0483624089b63c0e0",
      "value": "20to30years"
    }
  ]
}
```

### `GET /brands/:id`
Get brands by brand-id.
#### Example:
request:
#### `GET /brands/5dfb14f0483624089b63c0e0`
response:
```json
{
  "status": 200,
  "data": {
    "id": "5dfb14f0483624089b63c0e0",
    "value": "20to30years"
  }
}
```

### `POST /brands`
Post new brand.<br>
Require `value` data to post as new brand.
#### Example:
request:
#### `POST /brands`
data:
```json
{
  "value": "20to30years"
}
```
response:
```json
{
  "status": 200,
  "success": {
    "message": "Successfully creating new brand"
  }
}
```

### `PUT /brands/:id`
Update agaRange data.<br/>
Require brand-id that will be updated.<br/>
And require value data for which to be updated.
#### Example:
request:
#### `PUT /brands/5dfb14f0483624089b63c0e0`
data:
```json
{
  "value": "30to40years"
}
```
response:
```json
{
  "status": 200,
  "success": {
    "message": "Successfully update brand"
  }
}
```

### `DELETE /brands/:id`
Delete agaRange document.<br/>
Require brand-id that will be deleted.
#### Example:
request:
#### `DELETE /brands/5dfb14f0483624089b63c0e0`
response:
```json
{
  "status": 200,
  "success": {
    "message": "Successfully delete brand"
  }
}
```

<hr/>

## `/categories` endpoint

### `GET /categories`
Get all categories.
#### Example:
request:
#### `GET /categories`
response:
```json
{
  "status": 200,
  "data": [
    {
      "id": "5dfb14f0483624089b63c0e0",
      "value": "20to30years"
    }
  ]
}
```

### `GET /categories/:id`
Get categories by category-id.
#### Example:
request:
#### `GET /categories/5dfb14f0483624089b63c0e0`
response:
```json
{
  "status": 200,
  "data": {
    "id": "5dfb14f0483624089b63c0e0",
    "value": "20to30years"
  }
}
```

### `POST /categories`
Post new category.<br>
Require `value` data to post as new category.
#### Example:
request:
#### `POST /categories`
data:
```json
{
  "value": "20to30years"
}
```
response:
```json
{
  "status": 200,
  "success": {
    "message": "Successfully creating new category"
  }
}
```

### `PUT /categories/:id`
Update agaRange data.<br/>
Require category-id that will be updated.<br/>
And require value data for which to be updated.
#### Example:
request:
#### `PUT /categories/5dfb14f0483624089b63c0e0`
data:
```json
{
  "value": "30to40years"
}
```
response:
```json
{
  "status": 200,
  "success": {
    "message": "Successfully update category"
  }
}
```

### `DELETE /categories/:id`
Delete agaRange document.<br/>
Require category-id that will be deleted.
#### Example:
request:
#### `DELETE /categories/5dfb14f0483624089b63c0e0`
response:
```json
{
  "status": 200,
  "success": {
    "message": "Successfully delete category"
  }
}
```

<hr/>

## `/delivopts` endpoint

### `GET /delivopts`
Get all delivopts.
#### Example:
request:
#### `GET /delivopts`
response:
```json
{
  "status": 200,
  "data": [
    {
      "id": "5dfb14f0483624089b63c0e0",
      "value": "20to30years"
    }
  ]
}
```

### `GET /delivopts/:id`
Get delivopts by delivopt-id.
#### Example:
request:
#### `GET /delivopts/5dfb14f0483624089b63c0e0`
response:
```json
{
  "status": 200,
  "data": {
    "id": "5dfb14f0483624089b63c0e0",
    "value": "20to30years"
  }
}
```

### `POST /delivopts`
Post new delivopt.<br>
Require `value` data to post as new delivopt.
#### Example:
request:
#### `POST /delivopts`
data:
```json
{
  "value": "20to30years"
}
```
response:
```json
{
  "status": 200,
  "success": {
    "message": "Successfully creating new delivopt"
  }
}
```

### `PUT /delivopts/:id`
Update agaRange data.<br/>
Require delivopt-id that will be updated.<br/>
And require value data for which to be updated.
#### Example:
request:
#### `PUT /delivopts/5dfb14f0483624089b63c0e0`
data:
```json
{
  "value": "30to40years"
}
```
response:
```json
{
  "status": 200,
  "success": {
    "message": "Successfully update delivopt"
  }
}
```

### `DELETE /delivopts/:id`
Delete agaRange document.<br/>
Require delivopt-id that will be deleted.
#### Example:
request:
#### `DELETE /delivopts/5dfb14f0483624089b63c0e0`
response:
```json
{
  "status": 200,
  "success": {
    "message": "Successfully delete delivopt"
  }
}
```

<hr/>

## `/occasions` endpoint

### `GET /occasions`
Get all occasions.
#### Example:
request:
#### `GET /occasions`
response:
```json
{
  "status": 200,
  "data": [
    {
      "id": "5dfb14f0483624089b63c0e0",
      "value": "20to30years"
    }
  ]
}
```

### `GET /occasions/:id`
Get occasions by occasion-id.
#### Example:
request:
#### `GET /occasions/5dfb14f0483624089b63c0e0`
response:
```json
{
  "status": 200,
  "data": {
    "id": "5dfb14f0483624089b63c0e0",
    "value": "20to30years"
  }
}
```

### `POST /occasions`
Post new occasion.<br>
Require `value` data to post as new occasion.
#### Example:
request:
#### `POST /occasions`
data:
```json
{
  "value": "20to30years"
}
```
response:
```json
{
  "status": 200,
  "success": {
    "message": "Successfully creating new occasion"
  }
}
```

### `PUT /occasions/:id`
Update agaRange data.<br/>
Require occasion-id that will be updated.<br/>
And require value data for which to be updated.
#### Example:
request:
#### `PUT /occasions/5dfb14f0483624089b63c0e0`
data:
```json
{
  "value": "30to40years"
}
```
response:
```json
{
  "status": 200,
  "success": {
    "message": "Successfully update occasion"
  }
}
```

### `DELETE /occasions/:id`
Delete agaRange document.<br/>
Require occasion-id that will be deleted.
#### Example:
request:
#### `DELETE /occasions/5dfb14f0483624089b63c0e0`
response:
```json
{
  "status": 200,
  "success": {
    "message": "Successfully delete occasion"
  }
}
```

<hr/>

## `/towhoms` endpoint

### `GET /towhoms`
Get all towhoms.
#### Example:
request:
#### `GET /towhoms`
response:
```json
{
  "status": 200,
  "data": [
    {
      "id": "5dfb14f0483624089b63c0e0",
      "value": "20to30years"
    }
  ]
}
```

### `GET /towhoms/:id`
Get towhoms by towhom-id.
#### Example:
request:
#### `GET /towhoms/5dfb14f0483624089b63c0e0`
response:
```json
{
  "status": 200,
  "data": {
    "id": "5dfb14f0483624089b63c0e0",
    "value": "20to30years"
  }
}
```

### `POST /towhoms`
Post new towhom.<br>
Require `value` data to post as new towhom.
#### Example:
request:
#### `POST /towhoms`
data:
```json
{
  "value": "20to30years"
}
```
response:
```json
{
  "status": 200,
  "success": {
    "message": "Successfully creating new towhom"
  }
}
```

### `PUT /towhoms/:id`
Update agaRange data.<br/>
Require towhom-id that will be updated.<br/>
And require value data for which to be updated.
#### Example:
request:
#### `PUT /towhoms/5dfb14f0483624089b63c0e0`
data:
```json
{
  "value": "30to40years"
}
```
response:
```json
{
  "status": 200,
  "success": {
    "message": "Successfully update towhom"
  }
}
```

### `DELETE /towhoms/:id`
Delete agaRange document.<br/>
Require towhom-id that will be deleted.
#### Example:
request:
#### `DELETE /towhoms/5dfb14f0483624089b63c0e0`
response:
```json
{
  "status": 200,
  "success": {
    "message": "Successfully delete towhom"
  }
}
```