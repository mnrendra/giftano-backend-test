/**
 * getPopulate function
 */
const getPopulate = doc => {
  // return populated document in new promise
  return new Promise((resolve, reject) => {
    // populating product properties
    doc
      .populate('ageRange')
      .populate('brand')
      .populate('category')
      .populate('delivOpt')
      .populate('occasion')
      .populate('toWhom')
      .execPopulate()
      .then(({ _id, name, description, price, ageRange, brand, category, delivOpt, occasion, toWhom }) => {
        resolve({
          id: _id,
          name,
          description,
          price,
          ageRange: ageRange.value,
          brand: brand.value,
          category: category.value,
          delivOpt: delivOpt.value,
          occasion: occasion.value,
          toWhom: toWhom.value
        })
      }).catch(e => reject(e))
  })
}

// export module
module.exports = getPopulate
