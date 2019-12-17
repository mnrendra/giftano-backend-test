const getSort = sortBy => {
  switch (sortBy) {
    case 'priceAsc': return { 'price.value': 1 }
    case 'priceDes': return { 'price.value': -1 }
    case 'nameAsc': return { name: 1 }
    case 'nameDes': return { name: -1 }
    default: return {}
  }
}

module.exports = getSort
