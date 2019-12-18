// require isValid from mongoose ObjectId Types
const { isValid } = require('mongoose').Types.ObjectId
// destructuring keys and values from Object
const { keys, values } = Object

/**
 * getId function
 */
const getId = (Model, query) => {
  // get query key
  const qKey = keys(query)[0]
  // get query value
  const qVal = values(query)[0]

  // return false if undefined query value
  if (!qVal) return

  // return result in new promise
  return new Promise((resolve, reject) => {
    // set find filter as id if query value is valid id or as name is query value is not valid id
    const _query = isValid(qVal) ? { _id: qVal } : { value: qVal }
    // find product property document
    Model
      .findOne(_query)
      .then(doc => {
        // return id if document found
        if (doc) {
          query[qKey] = doc._id
          resolve(query)
          // return empty if document not found
        } else resolve()
      }).catch(e => reject(e))
  })
}

// export module
module.exports = getId
