<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="500">
      <template v-slot:activator="{ on }">
        <v-btn color="green lighten-2" dark v-on="on" icon>
          <v-icon>
            mdi-plus
          </v-icon>
        </v-btn>
      </template>

      <v-card>
        <v-card-title class="headline red lighten-2" primary-title>
          Ajouter un contact
        </v-card-title>

        <v-card-text>
          <v-form ref="form" class="pa-4">
            <v-text-field
              v-model="contact.firstname"
              label="Prénom"
              :rules="firstnameRules"
              required
            ></v-text-field>
            <v-text-field
              v-model="contact.lastname"
              label="Nom"
              :rules="lastnameRules"
              required
            ></v-text-field>
            <v-text-field
              v-model="contact.email"
              label="Email"
              :rules="emailRules"
              required
            ></v-text-field>
            <v-text-field
              v-model="contact.tel"
              label="Téléphone"
              :rules="telRules"
              required
            ></v-text-field>
          </v-form>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="createContact">
            Ajouter
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data() {
    return {
      dialog: false,
      contact: {
        firstname: null,
        lastname: null,
        email: null,
        tel: null
      },
      firstnameRules: [(v) => !!v || 'Le prenom est obligatoire.'],
      lastnameRules: [(v) => !!v || 'Le nom est obligatoire.'],
      emailRules: [
        (v) => !!v || "L'email est obligatoire.",
        (v) => /.+@.+/.test(v) || "L'email n'est pas conforme."
      ],
      telRules: [(v) => !!v || 'Le téléphone est obligatoire.']
    }
  },
  methods: {
    ...mapActions({
      addContact: 'contacts/addContact'
    }),
    createContact() {
      if (this.$refs.form.validate()) {
        this.addContact(this.contact)
        this.dialog = false
        this.$refs.form.reset()
      }
    }
  }
}
</script>
