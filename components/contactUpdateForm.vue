<template>
  <v-form v-model="valid" class="text-right">
    <v-text-field v-model="firstname" :rules="firstnameRules"></v-text-field>
    <v-text-field v-model="lastname" :rules="lastnameRules"></v-text-field>
    <v-text-field v-model="email" :rules="emailRules"></v-text-field>
    <v-text-field v-model="tel" :rules="telRules"></v-text-field>
    <v-btn color="green lighten-2" @click="saveChanges" :disabled="!valid">
      Sauvegarder
      <v-icon>
        mdi-content-save
      </v-icon>
    </v-btn>
  </v-form>
</template>

<script>
import { mapActions } from 'vuex'
import { createHelpers } from 'vuex-map-fields'
const { mapFields } = createHelpers({
  getterType: 'contacts/getField',
  mutationType: 'contacts/updateField'
})
export default {
  computed: {
    ...mapFields([
      'updateContact.firstname',
      'updateContact.lastname',
      'updateContact.email',
      'updateContact.tel'
    ])
  },
  methods: {
    ...mapActions({
      updateContact: 'contacts/updateContact'
    }),
    async saveChanges() {
      await this.updateContact(this.$route.params.id)
      this.$router.replace('/')
    }
  },
  data() {
    return {
      valid: true,
      firstnameRules: [(v) => !!v || 'Le prenom est obligatoire.'],
      lastnameRules: [(v) => !!v || 'Le nom est obligatoire.'],
      emailRules: [
        (v) => !!v || "L'email est obligatoire.",
        (v) => /.+@.+/.test(v) || "L'email n'est pas conforme."
      ],
      telRules: [(v) => !!v || 'Le téléphone est obligatoire.']
    }
  }
}
</script>
