const { isValid } = require('mongoose').Types.ObjectId
const { keys, values } = Object

const getId = (Model, query) => {
  const qKey = keys(query)[0]
  const qVal = values(query)[0]

  if (!qVal) return

  return new Promise((resolve, reject) => {
    const _query = isValid(qVal) ? { _id: qVal } : { name: qVal }

    Model
      .findOne(_query)
      .then(doc => {
        if (doc) {
          query[qKey] = doc._id
          resolve(query)
        } else resolve()
      })
      .catch(e => reject(e))
  })
}

module.exports = getId
