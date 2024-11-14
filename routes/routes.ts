import { Hono } from "hono";
import { bleMetricsData, rangeAnalysisData, powerMetricsData, configStore, FemConfigurationSchema } from "./mock-data";
import { z } from 'zod'
import { zValidator } from "@hono/zod-validator";


export const bleRoutes = new Hono()
    .get("/ble-metrics", c => {
        return c.json(bleMetricsData)
    })
    .get("/range-analysis", c => {
        return c.json(rangeAnalysisData)
    })
    .get("/power-metrics", c => {
        return c.json(powerMetricsData)
    })
    .post("/configurations",
        zValidator('json', FemConfigurationSchema.partial()),
        async (c) => {
            const data = c.req.valid('json')
            const updatedConfig = configStore.updateConfig(data)
            return c.json({
                message: "Configuration updated!",
                configuration: updatedConfig
            }, 200)

        }
    )

