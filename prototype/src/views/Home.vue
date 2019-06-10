<template>
  <v-container>
    <v-layout
      wrap
    >
      <v-flex mb-4>
        <h1 class="font-weight-bold mb-3">
          Welcome to my response to the Deputy Frontend Challenge!
        </h1>
        <p class="subheading font-weight-regular">
          Check out the source code at <a href="https://github.com/tamm/deputyfrontendchallenge" target="_blank">Github</a>
        </p>
      </v-flex>

      <v-flex xs12 mb-4>
        <v-btn class="navigate-to-employee-list" :to="{name:'EmployeeList'}">Go to Employee List</v-btn>
      </v-flex>

      <v-flex xs12 mb-4>
        <p class="subheading font-weight-regular">
          Here is a simple visualisation of the data in this application
        </p>
      </v-flex>

      <v-layout row wrap align-center justify-center>
        <v-flex xs8 sm3>
          <v-card dark>
            <v-card-text>
              <h4>Locations</h4>
              <ul>
                <li>name: String</li>
                <li>id: String</li>
              </ul>
            </v-card-text>
          </v-card>
        </v-flex>

        <v-flex xs12 sm1 text-xs-center class="arrows">
          <v-icon>compare_arrows</v-icon>
        </v-flex>

        <v-flex xs9 sm4>
          <v-card dark color="primary">
            <v-card-text>
              <h4>Employees</h4>
              <ul>
                <li>address: Object</li>
                <li>cell: String</li>
                <li>dob: Object</li>
                <li>email: String</li>
                <li>extraFields: Array</li>
                <li>id: Number</li>
                <li>location: Location</li>
                <li>name: Object</li>
                <li>phone: String</li>
                <li>picture: Object</li>
                <li>status: Status</li>
              </ul>
            </v-card-text>
          </v-card>
        </v-flex>

        <v-flex xs12 sm1 text-xs-center class="arrows">
          <v-icon>compare_arrows</v-icon>
        </v-flex>

        <v-flex xs8 sm3>
          <v-card dark>
            <v-card-text>
              <h4>Status</h4>
              <ul>
                <li>name: String</li>
                <li>id: String</li>
              </ul>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-layout>
  </v-container>
</template>

<style lang="stylus" scoped>
  @import '~vuetify/src/stylus/settings/_variables'

  .arrows
    transform rotate(90deg)
    margin 16px

    @media $display-breakpoints.sm-and-up
      transform none
      margin 0
</style>