// require isValid from mongoose ObjectId Types
const { isValid } = require('mongoose').Types.ObjectId
// require GET_PRODUCT_QUERY config
const { MIN_PRICE, MAX_PRICE, LIMIT, PAGE } = require('config').GET_PRODUCT_QUERY
// require requirement modals
const { Product, AgeRange, Brand, Category, DelivOpt, Occasion, ToWhom } = require('../../models')
// require getFun module
const { getId, getSort, getPopulate } = require('./getFun')
// require errors module
const { invalidId, notFoundId } = require('../../errors')

/**
 * getProducts function
 */
const getProducts = ({ query }, res, next) => {
  // destructuring filter queries
  const { ageRange, brand, category, delivOpt, occasion, toWhom, sortBy, minPrice, maxPrice, limit, page } = query
  // create new queries
  let queries = {}

  // get id of filter queries
  Promise.all([
    getId(AgeRange, { ageRange }),
    getId(Brand, { brand }),
    getId(Category, { category }),
    getId(DelivOpt, { delivOpt }),
    getId(Occasion, { occasion }),
    getId(ToWhom, { toWhom })
  ]).then(_queries => {
    // assign new queries with id values
    _queries.map(_query => {
      queries = { ...queries, ..._query }
    })
    // set price queries with min and max price
    queries.price = {
      $gt: Number(minPrice) || MIN_PRICE,
      $lt: Number(maxPrice) || MAX_PRICE
    }
    // get sort
    const sort = getSort(sortBy)

    // find products based on filter queries
    Product
      .find(queries, null, { sort })
      .then(products => {
        // get product number
        const total = products.length

        // set limit per page and set page index for pagination
        const _limit = Number(limit) || LIMIT
        const _page = Number(page) || PAGE
        const startPage = _page * _limit
        const endPage = startPage + _limit

        // slice product array based on limit and page index for pagination
        const _products = products.slice(startPage, endPage)

        // populating product properties
        const docs = _products.map(async product => {
          return getPopulate(product)
            .then(doc => doc)
            .catch(e => { throw new Error(e) })
        })

        // promise all docs
        Promise
          .all(docs)
          .then(data => {
            // send back data result
            res.status(200).json({
              status: 200,
              total,
              limit: _limit,
              page: _page,
              data
            })
          }).catch(next)
      }).catch(next)
  }).catch(next)
}

/**
 * getProductsById function
 */
const getProductsById = ({ params }, res, next) => {
  // destructuring id paramter
  const { id } = params
  // return false if id invalid
  if (!isValid(id)) {
    invalidId(res, id)
    return
  }
  // find product by id
  Product
    .findOne({ _id: id })
    .then(product => {
      // return false if product not found
      if (!product) {
        notFoundId(res, id)
        return
      }
      // populating product document
      getPopulate(product)
        .then(data => {
          res.status(200).json({
            status: 200,
            data
          })
        }).catch(next)
    }).catch(next)
}

// export module
module.exports = { getProducts, getProductsById }
