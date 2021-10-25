const request = require('supertest')
const app = require('./src/app')

describe('Time endpoint /api/', () => {
  it('returns 200 when no params are given', async () => {
    const res = await request(app).get('/api/')
    expect(res.status).toBe(200)
  })
  it('returns object with unix key and utc key', async () => {
    const res = await request(app).get('/api/')
    expect(res.body).toHaveProperty('unix')
    expect(res.body).toHaveProperty('utc')
  })
})

describe('Time endpoint /api/:date', () => {
  it('returns 200 when no params are given', async () => {
    const res = await request(app).get('/api/date')
    expect(res.status).toBe(200)
  })
  it('returns error object when date is invalid ', async () => {
    const res = await request(app).get('/api/abc')
    expect(res.body).toHaveProperty('error')
  })
  it('returns Invalid Date error message,  when date is invalid ', async () => {
    const res = await request(app).get('/api/abc')
    expect(res.body.error).toEqual('Invalid Date')
  })
  it('returns object with unix key and utc key when valid date is given', async () => {
    const res = await request(app).get('/api/1451001600000')
    expect(res.body).toHaveProperty('unix')
    expect(res.body).toHaveProperty('utc')
  })

  it.each`
    value              | unix             | utc
    ${'1451001600000'} | ${1451001600000} | ${'Fri, 25 Dec 2015 00:00:00 GMT'}
    ${1451001600000}   | ${1451001600000} | ${'Fri, 25 Dec 2015 00:00:00 GMT'}
    ${'2015-12-25'}    | ${1451001600000} | ${'Fri, 25 Dec 2015 00:00:00 GMT'}
  `('returns $utc and $unix when $value is given', async ({ value, unix, utc }) => {
    const res = await request(app).get(`/api/${value}`)
    expect(res.body.utc).toEqual(utc)
    expect(res.body.unix).toEqual(unix)
  })
})
