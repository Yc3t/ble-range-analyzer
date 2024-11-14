import { Hono } from "hono";
import { bleMetricsData, rangeAnalysisData, powerMetricsData, configStore, type FemConfiguration } from "./mock-data";

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
.post("/configurations", async (c) => {
    try {
        const body = await c.req.json() as Partial<FemConfiguration>;
        
        // Validate required fields and ranges
        if (body.txPower !== undefined && (body.txPower < -40 || body.txPower > 20)) {
            return c.json({ error: "txPower must be between -40 and +20 dBm" }, 400);
        }
        
        if (body.gainSetting !== undefined && (body.gainSetting < 0 || body.gainSetting > 22)) {
            return c.json({ error: "gainSetting must be between 0 and 22 dB" }, 400);
        }

        // Update configuration using the store method
        const updatedConfig = configStore.updateConfig(body);

        return c.json({
            message: "Configuration updated successfully",
            configuration: updatedConfig
        }, 200);
    } catch (error) {
        return c.json({ error: "Invalid request body" }, 400);
    }
})



