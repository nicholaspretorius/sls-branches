// middy only works on callback
// https://github.com/middyjs/middy/issues/198#issuecomment-442318665
// TODO: Needs test
const promisify = async (handler, event, context) => {
  return new Promise((resolve, reject) => {
    handler(event, context, (err, response) => {
      if (err) {
        reject(err)
      } else {
        resolve(response)
      }
    })
  })
};

export default promisify;