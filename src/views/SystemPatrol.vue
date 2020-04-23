<!--
 * @Author: 朱文芳
 * @Description: 系统巡检设置
 * @Date: 2020-04-08 14:05:32
 * @LastEditTime : 2020-04-08 16:09:13
 * @LastEditors  : 朱文芳
 * @UpdateLogs: 系统巡检设置
 -->
 
<template>
    <div class="PortBindingVpc DeviceStyleWrap system-patrol" ref="wrap">
        <Card :bordered="false">
            <BreadLink />
        </Card>
        <div class="content" :style="{'height': `${contentHeight}px`}">
            <h2 class="title">健康巡检</h2>
            <Alert class="alert-header" closable show-icon>
                <Icon custom="iconfont icon-xiangqing1" size="16" slot="icon" style="color:#24c677;"></Icon>
                <span slot="desc">上次巡检设置时间：{{time}}</span>
            </Alert>
            <div style="margin: 50px auto 0; width: 55%;">
                <Form :model="formItem" :label-width="160">
                    <FormItem label="是否启用：">
                        <i-switch v-model="formItem.enable" size="large">
                            <span slot="open">启用</span>
                            <span slot="close">禁用</span>
                        </i-switch>
                        <!-- <span>
                            <Icon custom="iconfont icon-xiangqing1" size="12" slot="icon" style="margin-left: 5px; color:#c4cdda;"></Icon>
                            <span style="color: #626D80;">点击“启用”开关进行流量监控配置，“关闭”不能进行配置</span>
                        </span> -->
                    </FormItem>
                    <FormItem label="巡检周期：">
                        <Select v-model="formItem.day" placeholder="/天" style="width:140px">
                            <Option v-for="item in generateList(2)" :value="item.value" :key="item.value">{{ item.value }}天</Option>
                        </Select>
                        <Select v-model="formItem.hour" placeholder="/小时" style="width:140px">
                            <Option v-for="item in generateList(25)" :value="item.value" :key="item.value">{{ item.value }}小时</Option>
                        </Select>
                        <Select v-model="formItem.minute" placeholder="/分钟" style="width:140px">
                            <Option v-for="item in generateList(61)" :value="item.value" :key="item.value">{{ item.value }}分钟</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="巡检数据保存时间：">
                        <Select v-model="formItem.holdtime" placeholder="/天" style="width:430px">
                            <Option v-for="item in generateList(31, 'day')" :value="item.value" :key="item.value">{{ item.value }}天</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="下载表格：">
                        <div :class="[isCurrentLoading ? 'download loading' : 'download']" @click="downloadCurrent">
                            <div class="top">
                                <img src="~@/assets/image/systemPatrol/current.png" width="22">
                                <span class="name">inspection.zip</span>
                            </div>
                            <p class="des">下载当前表格</p>
                        </div>
                        <div :class="[isHistoryLoading ? 'download loading' : 'download']" @click="downloadHistory">
                            <div class="top">
                                <img src="~@/assets/image/systemPatrol/history.png" width="22">
                                <span class="name">inspection.zip</span>
                            </div>
                            <p class="des">下载历史表格</p>
                        </div>
                    </FormItem>
                </Form>
            </div>
            <div class="btn-area">
                <Button :loading="isLoading" @click="submit" type="primary" >提交</Button>
            </div>
        </div>
    </div>
</template>
<script>
import { apiCover } from '@/api/index';
import BrowserBuffer from '@alanchenchen/browserbuffer';
import DateFormat from '@/utils/DateFormat.js';
import { formatSecond, tranformToSecond } from '@/utils/FormatSecond';

export default {
    name: 'SystemPatrol',
    data () {
        return {
            wrapDOM: null,
            source: 'create', // 默认为创建
            isLoading: false,
            isCurrentLoading: false, // 当前表格下载是否正在加载中
            isHistoryLoading: false, // 历史表格下载是否正在加载中
            formItem: {
                enable: false,
                holdtime: 7, // 巡检数据保存时间
                day: 0,
                hour: 0,
                minute: 30
            },
            time: ''
        };
    },
    created () {
        this.getMonitorInfo();
    },
    computed: {
        contentHeight () {
            return this.wrapDOM ? Number.parseFloat(getComputedStyle(this.wrapDOM)['height']) - 50 : 0;
        },
        generateList () {
            return (num, type) => {
                const arr = [];
                for (let i = 0; i < num; i++) {
                    if (type === 'day' && i === 0) continue;
                    arr.push({
                        value: i
                    });
                }
                return arr;
            };
        }
    },
    methods: {
        getMonitorInfo () {
            this.isLoading = true;
            apiCover({
                url: 'QueryMonitorInfo'
            })
            .then(res => {
                this.isLoading = false;
                const resData = res.data;
                if (res.type === 'success') {
                    let cycle = resData.cycle;
                    if (cycle) cycle = formatSecond(parseInt(cycle));
                    if (resData.holdtime) {
                        this.source = 'update';
                        this.formItem.enable = resData.enable;
                        this.formItem.holdtime = resData.holdtime;
                        this.formItem.day = cycle.day;
                        this.formItem.hour = cycle.hour;
                        this.formItem.minute = cycle.minute;
                        this.time = resData.createtime;
                    }
                }
            })
            .catch(() => {
                this.isLoading = false;
            });
        },
        // 提交数据
        submit () {
            const cycle = tranformToSecond({
                day: this.formItem.day,
                hour: this.formItem.hour,
                minute: this.formItem.minute
            });
            if (!this.formItem.holdtime || !cycle) {
                this.$Message.warning({
                    content: '请填入完整的信息'
                });
                return;
            }
            if (cycle < 300) {
                this.$Message.warning({
                    content: '巡检周期不能小于5分钟'
                });
                return;
            }
            this.isLoading = true;
            apiCover({
                url: this.source === 'create' ? 'SaveInspect' : 'UpdateInspect',
                tips: '健康巡检设置',
                data: {
                    enable: this.formItem.enable,
                    holdtime: this.formItem.holdtime,
                    cycle,
                    time: DateFormat('yyyy-MM-dd HH:mm:ss', new Date())
                }
            })
            .then(res => {
                this.isLoading = false;
                if (res.type === 'success') {
                    this.getMonitorInfo();
                }
            })
            .catch(() => {
                this.isLoading = false;
            });
        },
        // 下载当前文件
        downloadCurrent () {
            if (this.isCurrentLoading) return;
            this.isCurrentLoading = true;
            apiCover({
                url: 'GetCurrentInspectionZip'
            })
            .then((res) => {
                this.isCurrentLoading = false;
                this.downloadZipFile(res.data);
            })
            .catch(() => {
                this.isCurrentLoading = false;
            });
        },
        // 下载历史文件
        downloadHistory () {
            if (this.isHistoryLoading) return;
            this.isHistoryLoading = true;
            apiCover({
                url: 'GetAllInspectionZip'
            })
            .then((res) => {
                this.isHistoryLoading = false;
                this.downloadZipFile(res.data);
            })
            .catch(() => {
                this.isHistoryLoading = false;
            });
        },
        // 下载文件至本地
        downloadZipFile (dataStr) {
            if (!dataStr || dataStr === '' || dataStr.trim() === '') {
                console.error('接口返回数据格式有误');
                return;
            }
            const browserBuffer = new BrowserBuffer();
            browserBuffer.from(dataStr, 'base64').then(data => {
                const blob = new Blob([data], {type: 'text/plain'});
                const link = document.createElement('a');
                link.href = URL.createObjectURL(blob);
                link.download = 'inspection.zip';
                link.click();
                URL.revokeObjectURL(link.href);
            });
        }
    },
    mounted () {
        this.wrapDOM = this.$refs.wrap;
    }
};
</script>
<style lang="less" scoped>
    .system-patrol {
        .title {
            padding-left: 0;
            font-size: 18px;
            border-bottom: 1px solid #EAEDF3;
        }
        .alert-header {
            margin-top: 20px;
            padding: 10px 10px 10px 50px;
            background: #F8FCFF;
            border-radius: 4px;
            border-width: 0;
        }
        .btn-area {
            position: absolute;
            left: 15px;
            right: 15px;
            bottom: 20px;
            padding-top: 20px;
            border-top: 1px solid #EAEDF3;
        }
        .download {
            display: inline-block;
            width: 207px;
            color: #626D80;
            cursor: pointer;
            border: 1px dotted #E2E8F0;
            border-radius: 4px;
            .top {
                padding: 25px 30px 15px;
                .name {
                    vertical-align: 8px;
                    margin-left: 2px;
                }
            }
            .des {
                padding: 7px;
                text-align: center;
                border-top: 1px dotted #E2E8F0;
            }
            &.loading{
                cursor: progress;
            }
        }
    }
</style>
<style>
    .system-patrol .ivu-form-item-content{
        font-size: 14px;
    }
    .system-patrol .ivu-alert-close .ivu-icon-ios-close {
        font-size: 28px;
    }
    .system-patrol .ivu-alert-desc {
        font-size: 14px;
        color: #8C94A5;
    }
    .system-patrol .ivu-form .ivu-form-item-label {
        font-size: 14px;
    }
    .system-patrol .ivu-form-item-content {
        text-align: left;
    }
    .system-patrol .ivu-select-single .ivu-select-selection .ivu-select-placeholder {
        font-size: 14px;
    }
</style>