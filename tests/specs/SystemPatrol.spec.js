import Vue from 'vue';
import Hello from '@/views/SystemPatrol';
/* eslint-disable */
describe('SystemPatrol.vue', () => {
  // 每个describe块应该包括一个或多个it块，称为测试用例（test case）
  it('should render correct title', () => {
    const Constructor = Vue.extend(Hello);
    const vm = new Constructor().$mount();
    expect(vm.$el.querySelector('.content .title').textContent)
      .to.equal('健康巡检1')
  })
})
