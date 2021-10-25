const app = require('./src/app')
const PORT = process.env.PORT || 5000

const listener = app.listen(PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port)
})
