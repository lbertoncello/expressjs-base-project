export const MongooseHelper = {
  map(document) {
    const { _id, __v, ...documentWithoutId } = document;

    return Object.assign({}, documentWithoutId, { id: _id });
  },
};
