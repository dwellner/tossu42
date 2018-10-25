# Tossu42

Tossu42 is a very simple app that helps you train for running your next maraton.
The actual training programs are based on the ones provided by tossu.com (A Finnish runner's forum).

The app helps you set a date, choose a suitable running program and then basically just tells you
what you need to do each day. That's it. The app runs locally on your device and none of your information is collected or used outside of your own device.

I developed this app mostly for my own personal needs, but if you find it useful, I would love to
get some feedback. Also suggestions for further development are always welcome.

If you would like to do some development yourself, feel free to do so. 
All code and documentation is provided to you under the MIT license.

# Credits

The running programs in tossu42 are based on the ones provided by the [tossu.com -site](https://www.tossu.com/).

The splash screen photo was originally made by [Lucas Favre](https://unsplash.com/@we_are_rising)


## Development

The APP has been developed in React Native using the [Expo](https://expo.io/) framework.

### prequistes
- install expo on your development machine and test device(s)
- run npm install

# Running the environment locally on your development machine
- expo start

Scan the QR code of the debugger with the Expo app on your test device to test and debug interactively while devoping. 

# Testing

A substantial part of the code is covered by automated tests. I strongly suggest running the tests automatically in a terminal window at all times during development. Make sure all tests pass before committing any changes. 

- npm run test

Note that some of the UI components have snapshot tests that verify their rendering. Those tests will fail anytime you make even the smallest changes to the rendering of the component in question. After verifying that the changes are acceptable, you can automatically update the snapshots to reflect the new rendering on the jest prompt when running tests.
