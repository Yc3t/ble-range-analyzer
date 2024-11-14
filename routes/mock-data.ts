export const bleMetricsData = {
    connectionStatus: "connected",
    rssi: -67,
    txPower: 8,
    currentMode: "extended_range",
    deviceAddress: "E4:5F:01:2B:3A:8D",
    mtu: 247,
    connectionInterval: 7.5,
    phyMode: "2M",
    timestamp: new Date().toISOString()
}

export const rangeAnalysisData = {
    measurements: [
        {
            distance: 1,
            rssi: -45,
            txPower: 8,
            packetLoss: 0.02
        },
        {
            distance: 5,
            rssi: -67,
            txPower: 8,
            packetLoss: 0.05
        },
        {
            distance: 10,
            rssi: -82,
            txPower: 8,
            packetLoss: 0.15
        }
    ],
    environmentalFactors: {
        interference: "low",
        obstacles: ["walls", "furniture"],
        noiseFloor: -95
    }
}

export const powerMetricsData = {
    currentGainSetting: 20,
    powerAmplification: {
        mode: "high_gain",
        currentGain: 20,
        maxGain: 22,
        efficiency: 0.85
    },
    powerConsumption: {
        current: 25,
        voltage: 3.3,
        totalPower: 82.5
    },
    temperatureStatus: {
        die: 45.2,
        ambient: 25.6
    },
    batteryStatus: {
        level: 85,
        voltage: 3.1,
        estimatedRuntime: 14400
    }
}

export interface FemConfiguration {
    txPower: number;          // dBm (-40 to +20)
    mode: "normal" | "extended_range";
    gainSetting: number;      // dB (0-22)
    antenna: 1 | 2;           // Antenna selection
    phyMode: "1M" | "2M" | "LR";
}

// Create a store object to hold the mutable state
export const configStore = {
    current: {
        txPower: 8,
        mode: "normal",
        gainSetting: 20,
        antenna: 1,
        phyMode: "2M"
    } as FemConfiguration,
    
    // Method to update configuration
    updateConfig(newConfig: Partial<FemConfiguration>) {
        this.current = {
            ...this.current,
            ...newConfig
        };
        return this.current;
    }
};