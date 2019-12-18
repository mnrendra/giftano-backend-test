/**
 * getSort function
 */
const getSort = sortBy => {
  switch (sortBy) {
    // sort by price value
    case 'priceAsc': return { price: 1 }
    case 'priceDes': return { price: -1 }
    // sort by name alphabet
    case 'nameAsc': return { name: 1 }
    case 'nameDes': return { name: -1 }
    // return empty object if not sorted
    default: return {}
  }
}

// export module
module.exports = getSort
