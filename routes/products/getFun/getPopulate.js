const getPopulate = doc => {
  return new Promise((resolve, reject) => {
    doc
      .populate('age')
      .populate('brand')
      .populate('category')
      .populate({ path: 'price.currency', model: 'Currency' })
      .populate('deliveryOption')
      .populate('occasion')
      .populate('toWhom')
      .execPopulate()
      .then(({ _id, name, description, price, age, brand, category, deliveryOption, occasion, toWhom }) => {
        resolve({
          id: _id,
          name,
          description,
          price: {
            currency: price.currency.name,
            value: price.value
          },
          age: age.name,
          brand: brand.name,
          category: category.name,
          deliveryOption: deliveryOption.name,
          occasion: occasion.name,
          toWhom: toWhom.name
        })
      })
      .catch(e => reject(e))
  })
}

module.exports = getPopulate
