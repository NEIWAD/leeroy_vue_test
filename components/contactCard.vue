<template>
  <v-card class="mb-4" @click="openDetails(contact.id)">
    <v-card-title>
      <v-row>
        <v-col cols="10">
          <h3 class="title">{{ contact.firstname }} {{ contact.lastname }}</h3>
        </v-col>
        <v-col cols="2" class="text-right">
          <v-btn
            icon
            color="red lighten-2"
            @click.stop="deleteContact(contact.id)"
          >
            <v-icon>
              mdi-delete
            </v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-card-title>
  </v-card>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  props: {
    contact: {
      type: Object
    }
  },
  methods: {
    ...mapActions({
      removeContact: 'contacts/removeContact'
    }),
    openDetails(contactId) {
      this.$router.push('contacts/' + contactId)
    },
    deleteContact(contactId) {
      this.removeContact(contactId)
    }
  }
}
</script>
