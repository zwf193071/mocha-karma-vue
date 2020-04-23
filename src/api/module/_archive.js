/**
 * @description 归档接口，ICE功能
 */
export default {
    // 设备面板图
    GetTopoPic: {
        url: 'topology/getPanelInfo'
    },
    // 交换机监控周期设置
    GetAllMonitorCycleData: {
        url: 'monitor/getSWCycleMonitorData'
    },
    // eslint-disable-next-line no-tabs
    GetMonitorCycleConfig: {
        url: 'monitor/getSWCycleMonitor'
    },
    SetMonitorCycleConfig: {
        url: 'monitor/setSWCycleMonitor'
    },
    DeleteMonitorCycleConfig: {
        url: 'monitor/deleteSWCycleMonitor'
    },
    // 端口统计
    GetPortSummary: {
        url: 'devicePort/getPortTrafficTop5'
    },
    // 服务器监控
    GetServerIP: {
        url: 'monitor/getServerInfoIPandName'
    },
    GetAllServerInfo: {
        url: 'monitor/getServerInfoByAll'
    },
    GetServerInfo: {
        url: 'monitor/getServerInfoByIp'
    },
    // 端口限速
    GetAllPortSpeedLimit: {
        url: 'ifConfig/queryBandWidth'
    },
    AddPortSpeedLimit: {
        url: 'ifConfig/createBandwidth'
    },
    DeletePortSpeedLimit: {
        url: 'ifConfig/deleteBandwidth'
    },
    // 告警统计
    GetTrapSummary: {
        url: 'trapconfig/trapStatics'
    }
};