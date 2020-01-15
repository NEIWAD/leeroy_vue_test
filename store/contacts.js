import { vuexfireMutations, firestoreAction } from 'vuexfire'
import { getField, updateField } from 'vuex-map-fields'
import { db } from './db'

export const state = () => ({
  contact: null,
  updateContact: {
    firstname: null,
    lastname: null,
    email: null,
    tel: null
  },
  contacts: [],
  isLoading: false
})

export const mutations = {
  updateField,
  ...vuexfireMutations,
  SET_CONTACT(state, contact) {
    state.contact = contact
    state.updateContact = contact
  },
  SET_LOADING(state, loading) {
    state.isLoading = loading
  }
}

export const actions = {
  bindContacts: firestoreAction(async ({ bindFirestoreRef, commit }) => {
    commit('SET_LOADING', true)
    await bindFirestoreRef('contacts', db.collection('contacts'))
    commit('SET_LOADING', false)
  }),
  async getContact({ commit }, id) {
    await db
      .collection('contacts')
      .doc(id)
      .get()
      .then((snapshot) => {
        const document = snapshot.data()
        commit('SET_CONTACT', document)
      })
  },
  async addContact({ commit }, contact) {
    await db.collection('contacts').add({
      firstname: contact.firstname,
      lastname: contact.lastname,
      email: contact.email,
      tel: contact.tel
    })
  },
  async updateContact({ state }, id) {
    await db
      .collection('contacts')
      .doc(id)
      .set(state.updateContact)
  },
  async removeContact({ state }, id) {
    await db
      .collection('contacts')
      .doc(id)
      .delete()
  }
}

export const getters = {
  getField,
  contacts: (state) => state.contacts,
  contact: (state) => state.contact,
  isLoading: (state) => state.isLoading
}
