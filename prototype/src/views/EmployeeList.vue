<template>
  <v-container>
    <v-layout column class="mb-3">
      <v-flex>
        <h1 class="font-weight-bold mb-3">
          Employees
        </h1>

        <v-layout wrap>
          <v-flex class="search-field" xs12 sm8>
            <v-text-field
              v-model="filterText"
              label="Search employees"
              clearable
              prepend-icon="search"
              :messages="errorMessages"
            ></v-text-field>
          </v-flex>

          <v-flex xs12 sm4>
            <v-select
              :items="filters"
              v-model="filterType"
              label="Filter column"
              clearable
            ></v-select>
          </v-flex>
        </v-layout>
      </v-flex>

      <v-flex class="employee-list">
        <v-progress-linear :indeterminate="true" :active="loading"></v-progress-linear>

        <v-data-table
          :headers="columns"
          :items="filteredEmployees"
          class="elevation-1"
          item-key="index"
        >
          <template v-slot:items="props">
            <td class="employee-name capitalize">
              <v-avatar
                size="32"
                color="primary"
                class="mr-2"
              >
                <img :src="props.item.picture.thumbnail" alt="avatar">
              </v-avatar>

              <span>{{ props.item.name.first }} {{ props.item.name.last }}</span>
            </td>
            <td class="capitalize">{{ props.item.location.name }}</td>
            <td>{{ props.item.email }}</td>
            <td>{{ props.item.status.name }}</td>
            <td class="justify-center layout px-0">
              <v-btn
                small
                @click="viewEmployee(props.item)"
              >
                view
              </v-btn>
            </td>
          </template>
          <template v-slot:no-data>
            <p class="text-xs-center mt-4 mb-4">
              No data to show
            </p>
          </template>
        </v-data-table>
      </v-flex>
    </v-layout>

    <v-btn class="control-reset" color="primary" block :disabled="loading" @click="reset">Reset</v-btn>
    <v-btn class="control-load-more" color="primary" block :disabled="loading" @click="loadEmployees">Load more</v-btn>
    <v-btn class="control-load-huge-amount" color="primary" block :disabled="loading" @click="loadEmployees(true)">Load a huge amount more</v-btn>

    <EmployeeProfileDialog v-model="selectedEmployee" v-if="selectedEmployee" />
  </v-container>
</template>

<script>
  // import HelloWorld from '../components/HelloWorld'
  import { mapState, mapActions } from "vuex"
  import EmployeeProfileDialog from '@/components/EmployeeProfileDialog'

  export default {
    data: () => ({
      filterType: null,
      filterText: null,
      errorMessages: [],
      columns: [
        {
          text: 'Name',
          value: 'name.first',
        },
        {
          text: 'Location',
          value: 'location.name',
        },
        {
          text: 'Email Address',
          value: 'email',
        },
        {
          text: 'Status',
          value: 'status.name',
        },
        {
          text: 'Actions',
          value: 'actions',
          sortable: false,
        },
      ],
      filters: [
        {
          text: 'Name',
          value: 'name',
        },
        {
          text: 'Location',
          value: 'location',
        },
        {
          text: 'Email Address',
          value: 'email',
        },
        {
          text: 'Status',
          value: 'status',
        },
      ],
      selectedEmployee: null,
      loading: false,
    }),
    computed: {
      ...mapState({
        employees: state => state.employees.list,
      }),
      filteredEmployees() {
        let filter = false
        if (this.filterText) {
          /*
           * Create a regex from the search string,
           * allowing for multiple search terms separated by any spacing,
           * filters out any empty search terms, and ignores case.
           */
          filter = new RegExp(this.filterText.split(/\s/).filter(Boolean).reduce((list, piece) => {
            if (list === '') {
              return piece
            }
            return `${list}.*(?=${piece})`
          }, ''), 'gi')
        }

        return this.employees.filter(employee => {
          /*
           * I would normally do this filtering on the back-end
           * to avoid large datasets in the client.
           */
          if (filter) {
            if (this.filterType) {
              // Search only the part of the employee object which relates to the selected column
              return filter.test(JSON.stringify(employee[this.filterType]))
            } else {
              /*
               * Converting the employees into JSON strings means it's easy to
               * filter through them for any matches in their data, but there is
               * a risk of false positives if the search term matches any of the
               * object keys.
               */
              return filter.test(JSON.stringify(employee))
            }
          }
          return true
        })
      },
    },
    components: {
      EmployeeProfileDialog,
    },
    created() {
      if (this.employees.length < 1) {
        this.loadEmployees()
      }
    },
    methods: {
      ...mapActions(['getEmployees', 'resetEmployees']),
      reset() {
        this.loading = true

        this.resetEmployees().then(() => {
          this.loading = false
        })
      },
      viewEmployee(employee) {
        this.selectedEmployee = employee
      },
      loadEmployees(hugeAmount) {
        this.loading = true

        this.getEmployees(hugeAmount).then(() => {
          this.loading = false
        })
      },
    },
  }
</script>

<style lang="stylus" scoped>
  @import '~vuetify/src/stylus/settings/_variables'

  .search-field
    @media $display-breakpoints.sm-and-up
      padding-right 16px

  .employee-list
    position relative

  .v-progress-linear
    margin 0
    position absolute

  .v-btn--block
    @media $display-breakpoints.sm-and-up
      display inline-block
      width auto
      margin 0px 8px
</style>