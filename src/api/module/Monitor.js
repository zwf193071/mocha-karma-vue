export default {
    // 创建健康巡检
    SaveInspect: {
        url: 'api/inspection/v1/inspection/saveInspect',
        method: 'POST'
    },
    // 更新健康巡检
    UpdateInspect: {
        url: 'api/inspection/v1/inspection/updateInspect',
        method: 'POST'
    },
    // 查询健康巡检
    QueryMonitorInfo: {
        url: 'api/inspection/v1/inspection/queryMonitorInfo'
    },
    // 下载历史巡检报告
    GetAllInspectionZip: {
        url: 'api/inspection/v1/inspection/getAllInspectionZip'
    },
    // 下载当前巡检报告
    GetCurrentInspectionZip: {
        url: 'api/inspection/v1/inspection/getCurrentInspectionZip'
    }
};
