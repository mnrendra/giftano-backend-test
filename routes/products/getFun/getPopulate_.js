const getPopulate = (doc, { populates, unpopulates }) => {
  const populateDoc = {}
  const unpopulateDoc = {}

  const populated = populates.map(key => {
    return doc
      .populate(key)
      .execPopulate()
      .then(doc => {
        if (key.path) {
          const keys = key.path.split('.')
          let _key = {}
          let _val = {}
          keys.map(key => {
            console.log('asda', key)
            _key = _key[key]
            _val = _val[key]
          })
          console.log('_key', _key)
          console.log('_val', _val)
          populateDoc.price.currency = doc.price.currency.name
          return
        }
        populateDoc[key] = doc[key].name
      })
      .catch(e => {
        throw new Error(e)
      })
  })

  unpopulates.map(key => {
    unpopulateDoc[key] = doc[key]
  })

  return Promise
    .all(populated)
    .then(() => {
      console.log('populateDoc', populateDoc)
      console.log('unpopulateDoc', unpopulateDoc)
      const abc = { ...unpopulateDoc, ...populateDoc }
      console.log('abc', abc)
    })
    .catch(e => {
      throw new Error(e)
    })
}

module.exports = getPopulate
