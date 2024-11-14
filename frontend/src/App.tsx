import { useState, useEffect } from 'react'
import './App.css'
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card'
import { Badge } from './components/ui/badge'

interface BleMetrics {
  connectionInterval: number
  connectionStatus: string
  currentMode: string
  deviceAddress: string
  mtu: number
  phyMode: string
  rssi: number
  timestamp: string
  txPower: number
}

function App() {
  const [metrics, setMetrics] = useState<BleMetrics | null>(null)
  
  useEffect(() => {
    fetch("/api/ble-metrics")
      .then(res => res.json())
      .then(data => setMetrics(data))
      .catch(err => console.error(err))
  }, [])
  
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {metrics && (
        <Card className="max-w-3xl mx-auto">
          <CardHeader className="space-y-1">
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl font-bold">BLE Device Metrics</CardTitle>
              <Badge 
                variant={metrics.connectionStatus === 'connected' ? 'success' : 'destructive'}
                className="text-sm px-4 py-1"
              >
                {metrics.connectionStatus}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              Device: {metrics.deviceAddress}
            </p>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Primary Metrics */}
            <div className="grid grid-cols-3 gap-6">
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Signal Strength</p>
                <p className="text-2xl font-bold">{metrics.rssi} dBm</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">TX Power</p>
                <p className="text-2xl font-bold">{metrics.txPower} dBm</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">MTU Size</p>
                <p className="text-2xl font-bold">{metrics.mtu} bytes</p>
              </div>
            </div>

            {/* Divider */}
            <div className="h-px bg-border" />

            {/* Secondary Metrics */}
            <div className="grid grid-cols-2 gap-x-12 gap-y-6">
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Operating Mode</p>
                <p className="text-lg font-semibold">{metrics.currentMode}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">PHY Mode</p>
                <p className="text-lg font-semibold">{metrics.phyMode}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Connection Interval</p>
                <p className="text-lg font-semibold">{metrics.connectionInterval} ms</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Last Updated</p>
                <p className="text-lg font-semibold">
                  {new Date(metrics.timestamp).toLocaleString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

export default App
