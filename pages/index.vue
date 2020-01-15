<template>
  <div>
    <v-container v-if="!isLoading">
      <v-row>
        <v-col class="d-flex justify-space-between align-center">
          <h1>Contacts</h1>
          <addContact />
        </v-col>
      </v-row>
      <v-row>
        <v-col v-if="contacts.length > 0">
          <v-slide-x-transition appear group>
            <contactCard
              v-for="(contact, index) in contacts"
              :key="`contact_${index}`"
              :contact="contact"
            />
          </v-slide-x-transition>
        </v-col>
        <v-col v-else>
          <h3>Il n'y a pas de contact pour l'instant...</h3>
        </v-col>
      </v-row>
    </v-container>
    <loader v-else />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import addContact from '../components/addContact'
import contactCard from '../components/contactCard'
import loader from '../components/common/Loader'
export default {
  computed: {
    ...mapGetters({
      isLoading: 'contacts/isLoading',
      contacts: 'contacts/contacts'
    })
  },
  created() {
    if (this.contacts.length === 0) {
      this.$store.dispatch('contacts/bindContacts')
    }
  },
  components: {
    addContact,
    contactCard,
    loader
  }
}
</script>
