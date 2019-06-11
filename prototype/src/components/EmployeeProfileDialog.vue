<template>
  <v-dialog v-model="show" scrollable>
    <v-card class="profile" v-if="localEmployee">
      <v-toolbar dark color="primary">
        <v-toolbar-title>Employee Details</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-icon flat @click.stop="show=null">close</v-icon>
      </v-toolbar>

      <v-layout wrap class="profile-content">
        <v-flex class="profile-left-column text-xs-center">
          <v-card-text>
            <v-avatar
              size="128"
              color="primary"
              class="mb-3"
            >
              <img :src="localEmployee.picture.large" alt="avatar">
            </v-avatar>

            <h3 class="employee-name capitalize">{{ localEmployee.name.first }} {{ localEmployee.name.last }}</h3>
            <p class="employee-status">{{ localEmployee.status.name }}</p>
          </v-card-text>
        </v-flex>
        <v-flex>
          <v-card-text>
            <v-form
              ref="employee-form"
              v-model="valid"
              lazy-validation
            >
              <v-text-field
                type="email"
                name="email"
                label="Email"
                v-model="localEmployee.email"
                @keyup.native.stop.enter="saveEmployee"
                :rules="emailRules"
                required
              ></v-text-field>

              <v-text-field
                type="cell"
                name="cell"
                label="Mobile"
                v-model="localEmployee.cell"
                @keyup.native.stop.enter="saveEmployee"
                :rules="phoneNumberRules"
              ></v-text-field>

              <v-text-field
                type="phone"
                name="phone"
                label="Phone"
                v-model="localEmployee.phone"
                @keyup.native.stop.enter="saveEmployee"
                :rules="phoneNumberRules"
              ></v-text-field>

              <v-select
                :items="locations"
                v-model="localEmployee.location"
                item-key="id"
                item-text="name"
                label="Location"
                name="location"
                return-object
                :rules="requiredRules"
                required
              ></v-select>

              <v-menu
                class="dob"
                ref="datePickerMenu"
                v-model="datePickerMenu"
                :close-on-content-click="false"
                :nudge-right="40"
                :return-value.sync="localEmployee.dob.date"
                lazy
                transition="scale-transition"
                offset-y
                full-width
                min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    name="dob"
                    v-model="localEmployee.dob.date"
                    label="Date of birth"
                    prepend-icon="event"
                    readonly
                    v-on="on"
                    :rules="requiredRules"
                    required
                  ></v-text-field>
                </template>
                <v-date-picker v-model="localEmployee.dob.date" no-title scrollable>
                  <v-spacer></v-spacer>
                  <v-btn flat color="primary" @click="datePickerMenu = false">Cancel</v-btn>
                  <v-btn flat color="primary" @click="$refs.datePickerMenu.save(localEmployee.dob.date)">OK</v-btn>
                </v-date-picker>
              </v-menu>

              <h4>Address</h4>
              <v-text-field
                name="street"
                label="Street"
                v-model="localEmployee.address.street"
                @keyup.native.stop.enter="saveEmployee"
              ></v-text-field>
              <v-text-field
                name="city"
                label="City"
                v-model="localEmployee.address.city"
                @keyup.native.stop.enter="saveEmployee"
              ></v-text-field>
              <v-text-field
                name="state"
                label="State"
                v-model="localEmployee.address.state"
                @keyup.native.stop.enter="saveEmployee"
              ></v-text-field>
              <v-text-field
                name="postcode"
                label="Postcode"
                v-model="localEmployee.address.postcode"
                @keyup.native.stop.enter="saveEmployee"
              ></v-text-field>

              <div v-if="localEmployee.extraFields && localEmployee.extraFields.length > 0">
                <h4>Extra fields</h4>
                <v-layout v-for="(field, index) in localEmployee.extraFields" :key="index">
                  <v-text-field
                    class="mr-3"
                    :name="field.name"
                    :label="field.name"
                    v-model="field.value"
                    @keyup.native.stop.enter="saveEmployee"
                  ></v-text-field>
                  <v-text-field
                    label="Label"
                    v-model="field.name"
                    @keyup.native.stop.enter="saveEmployee"
                  ></v-text-field>
                </v-layout>
              </div>

              <v-btn flat color="primary" @click="addExtraField">Add field</v-btn>
            </v-form>
          </v-card-text>
        </v-flex>
      </v-layout>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn class="save-button" color="primary" :disabled="saving" @click.native="saveEmployee">Save</v-btn>
      </v-card-actions>

      <v-snackbar
        v-model="saving"
        :timeout="6000"
        absolute
      >
        Saving

        <v-btn
          flat
          @click="saving = false"
        >
          Close
        </v-btn>
      </v-snackbar>
    </v-card>
  </v-dialog>
</template>

<script>
  import { mapState, mapActions } from "vuex"

  export default {
    props: ['value'],
    data() {
      return {
        datePickerMenu: false,
        saving: false,
        valid: true,
        localEmployee: JSON.parse(JSON.stringify(this.value)),
        emailRules: [
          v => !!v || 'E-mail is required',
          v => /.+@.+/.test(v) || 'E-mail must be valid',
        ],
        phoneNumberRules: [
          v => !v || /^[\W\d]+$/.test(v) || 'Only use numbers and formatting',
        ],
        requiredRules: [
          v => !!v || 'This field is required',
        ],
      }
    },
    computed: {
      ...mapState({
        locations: state => state.locations.list,
      }),
      employee: {
        get () {
          return this.value
        },
        set (value) {
          this.$emit('input', value)
        },
      },
      show: {
        get () {
          return !!this.value
        },
        set (value) {
           this.employee = value
        },
      },
    },
    methods: {
      ...mapActions(['updateEmployee']),
      addExtraField() {
        if (!this.localEmployee.extraFields) {this.localEmployee.extraFields = []}
        this.localEmployee.extraFields.push({
          name: 'Extra field',
          value: '',
        })
      },
      saveEmployee() {
        if (this.valid) {
          this.saving = true

          this.updateEmployee(this.localEmployee)
        }
      },
    },
  }
</script>

<style lang="stylus" scoped>
  @import '~vuetify/src/stylus/settings/_variables'

  .profile-content
    overflow-y auto

  .profile-left-column
    @media $display-breakpoints.sm-and-up
      flex-grow 0
      flex-shrink 1
</style>