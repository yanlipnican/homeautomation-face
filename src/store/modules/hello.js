import * as actionTypes from '../actionTypes';
import * as getterNames from '../getterNames';
import * as mutationTypes from '../mutationTypes';

const state = {
  hello: 'world',
};

const getters = {
  /* eslint-disable no-unused-vars */
  // [getterNames.helloWorld]: (state, getters) => (
  //   state.hello
  // ),
};

const actions = {
  /* eslint-disable no-unused-vars */
  // async [actionTypes.HELLO_WORLD]({ commit, getters, state }) {
  //   commit(mutationTypes.HELLO, '...loading...');
  //   commit(mutationTypes.HELLO, await api.getWorld());
  // },
};

const mutations = {
  // [mutationTypes.HELLO](state, world) {
  //   state.hello = world;
  // },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
