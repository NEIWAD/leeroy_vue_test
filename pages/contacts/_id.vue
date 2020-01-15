<template>
  <div>
    <v-container v-if="!isLoading">
      <v-row>
        <v-col class="d-flex align-center justify-space-between">
          <div class="d-flex align-center">
            <v-btn to="/" icon class="mr-4">
              <v-icon>
                mdi-arrow-left
              </v-icon>
            </v-btn>
            <h1>{{ contact.firstname }} {{ contact.lastname }}</h1>
          </div>
          <div class="d-flex align-center">
            <v-btn
              v-if="!edit"
              icon
              color="orange lighten-2"
              @click="edit = true"
            >
              <v-icon>
                mdi-pencil
              </v-icon>
            </v-btn>
            <v-btn
              v-if="edit"
              icon
              color="red lighten-2"
              @click="deleteContact"
            >
              <v-icon>
                mdi-delete
              </v-icon>
            </v-btn>
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-card v-if="!edit" class="pa-4">
            <ul>
              <li>Email : {{ contact.email }}</li>
              <li>Tel : {{ contact.tel }}</li>
            </ul>
          </v-card>
          <v-card v-if="edit" class="pa-4">
            <contactUpdateForm />
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <loader v-else></loader>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import loader from '../../components/common/Loader'
import contactUpdateForm from '../../components/contactUpdateForm'
export default {
  data() {
    return {
      isLoading: true,
      edit: false
    }
  },
  components: {
    loader,
    contactUpdateForm
  },
  computed: {
    ...mapGetters({
      contact: 'contacts/contact'
    })
  },
  created() {
    const id = this.$route.params.id
    this.fetchContact(id)
  },
  methods: {
    ...mapActions({
      getContact: 'contacts/getContact',
      updateContact: 'contacts/updateContact',
      removeContact: 'contacts/removeContact'
    }),
    async fetchContact(id) {
      try {
        await this.getContact(id)
        this.isLoading = false
      } catch (e) {
        this.$router.replace('/')
      }
    },
    async deleteContact() {
      await this.removeContact(this.$route.params.id)
      this.$router.replace('/')
    }
  }
}
</script>
