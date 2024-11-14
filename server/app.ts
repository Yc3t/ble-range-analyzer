import { Hono } from 'hono'
import {logger} from 'hono/logger'
import { bleRoutes } from './routes/routes'
const app = new Hono()
app.use('*',logger())
app.get("/ble", c => {
    return c.json({"ble": "activated"})
})
app.route("/api", bleRoutes)

export default app 