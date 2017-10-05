import Vue from 'vue';
import {
    mount,
} from 'avoriaz';
import VueI18n from 'vue-i18n';
import Hello from '@/components/Hello';
import store from '@/store';
import router from '@/router';
import messages from '@/internationalization';

Vue.use(VueI18n);

describe('Hello.vue', () => {
    /* eslint-disable no-new */
  const i18n = new VueI18n({
    locale: 'cs', // set locale
    messages, // set locale messages
  });
  it('should render correct contents', () => {
    // const Constructor = Vue.extend(Hello);
    const vm = mount(Hello, { i18n, store, router });
    // const vm = new Constructor().$mount();
    expect(vm.find('h1')[0].text()).to.contain(messages.cs.message.hello);
    expect(vm.find('h2')[1].text()).to.contain('Essential Links');
    /* expect(vm.$el.querySelector('.hello h2').textContent)
      .to.equal('Essential Links'); */
  });
});
