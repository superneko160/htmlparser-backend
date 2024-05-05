import app from './../src/index'

describe('index', () => {
    it('GET /', async () => {
        const res = await app.request('/')
        expect(res.status).toBe(200)
    })
})
