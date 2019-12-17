const { isValid } = require('mongoose').Types.ObjectId
const { FILTER } = require('config').get('GET_PRODUCTS')
const { Product, AgeRange, Brand, Category, DelivOpt, Occasion, ToWhom } = require('../../models')
const { getId, getSort, getPopulate } = require('./getFun')
const { idInvalid, idNotFound } = require('../errors')

const getProducts = ({ query }, res, next) => {
  const { age, brand, category, delivOpt, occasion, toWhom, sortBy, minPrice, maxPrice, limit, page } = query
  let queries = {}

  Promise.all([
    getId(AgeRange, { age }),
    getId(Brand, { brand }),
    getId(Category, { category }),
    getId(DelivOpt, { delivOpt }),
    getId(Occasion, { occasion }),
    getId(ToWhom, { toWhom })
  ]).then(_queries => {
    _queries.map(_query => {
      queries = { ...queries, ..._query }
    })

    queries['price.value'] = {
      $gt: Number(minPrice) || FILTER.MIN_PRICE,
      $lt: Number(maxPrice) || FILTER.MAX_PRICE
    }

    const sort = getSort(sortBy)

    Product
      .find(queries, null, { sort })
      .then(products => {
        const total = products.length

        const _limit = Number(limit) || FILTER.LIMIT
        const _page = Number(page) || FILTER.PAGE
        const startPage = _page * _limit
        const endPage = startPage + _limit

        const _products = products.slice(startPage, endPage)

        const docs = _products.map(async product => {
          return getPopulate(product)
            .then(doc => doc)
            .catch(e => {
              throw new Error(e)
            })
        })

        Promise
          .all(docs)
          .then(data => {
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

const getProductsById = ({ params }, res, next) => {
  const { _id } = params

  if (!isValid(_id)) {
    idInvalid(_id, res)
    return
  }

  Product
    .findOne({ _id })
    .then(product => {
      if (!product) {
        idNotFound(_id, res)
        return
      }

      getPopulate(product)
        .then(data => {
          res.status(200).json({
            status: 200,
            data: data
          })
        })
        .catch(next)
    })
    .catch(next)
}

module.exports = { getProducts, getProductsById }
