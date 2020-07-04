import { mount } from '../node_modules/@vue/test-utils'
import Index from '../pages/index.vue'

describe('Index', () => {
  test('index principal', () => {
    const wrapper = mount(Index)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
})
