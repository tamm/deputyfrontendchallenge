# My response to the Deputy Frontend Challenge
I have built a small demo in Vue, using Vue CLI and Vuetify.

## Install instructions
1. Make sure you have node installed on your system. If you do, skip to step 4
2. If you are on a Mac you can install it using homebrew!
  Open up a terminal and type in:
  `/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"`
3. Then run this command to install node:
  `brew install node git`
3. Install Yarn
  `npm install -g yarn`
4. Clone the project to your computer.
  `git clone git@github.com:tamm/deputyfrontendchallenge.git`
5. Navigate into the folder.
  `cd deputyfrontendchallenge`
6. Run the setup.
  `yarn setup`
7. Start the Vue CLI UI, if you want, it's neat.
  `yarn ui`
  Then run the task serve.
7. Or manually start the project.
  `yarn dev`

## Tests
I have produced some basic unit tests with vue-test-utils, using Jest.

You can run the test suites by CLI:
  `yarn test`
OR you can run them in the Vue CLI UI
  By running the task test:unit in the control panel.

## Data model representation
I have created a simple representation of my data model in the Home view.

My objects have a non-typed relationship.

#### Location
* name: String
* id: String

#### Status
* name: String
* id: String

#### Status
* address: Object
* cell: String
* dob: Object
* email: String
* extraFields: Array
* id: Number
* location: Location
* name: Object
* phone: String
* picture: Object
* status: Status

## How would you utilise caching for something like this?

### Client side
My VueX store is set to rehydrate from localStore on page refresh, completely avoiding an API call.

By storing my dataset in VueX I am avoiding all requests, even to Browser level cache. Making assumptions on when data is not fresh can prove misleading, but in my case I can be sure that data from the API never changes so I chose to simply not reload unless the user chooses to manually reset. _I chose this partially because to save data in a local state and not have it overwritten on page reloads._

This can be coupled with a Websocket connection which can let each client know if data has changed, used efficiently this can trigger the client to reload only a subset of data which has been altered. (Not demonstrated)

### Server side
If I have a REST API such as the one I use in this demo I would also utilise the Browser cache to avoid many hits to the same query, to minimise data transfer between server and client.

I would also use a reverse proxy to provide the same reply to many clients asking the same question at almost the same time, for example if the user has the same application open on many devices reloading data at the same time.

## Do you need to do data validation?
This depends on what type of validation is best for a user. For example a lot of people try to make sure that an email address is correct according to a pattern, either allowing anything which seems like it _might_ be an email address, or allowing only email addresses which follow the more common usage.

The same goes for phone numbers, the representation of which can vary greatly between countries.

I would generally suggest using some form of validation, but perhaps it would be better to simply alert the user to potential issues with their input, rather than refuse input which might be just as valid?

What if we require an email address, and the user doesn't know what to put for the moment? Wouldn't it make sense to alert the user to the need for an email address, and still accept the other input? Maybe they simple need to fill in a form with the incomplete data they have on hand and save it, to come back and complete the rest later?

# TODO
* Speed optimization.
* Data validation.