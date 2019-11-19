# Automation: Run Multiple Simulators and Emulators

placeholder

# Testing-Library/React versus Enzyme

This repository contains some tests that compare React Native
unit testing using Testing-Library/React and Enzyme.  In both
cases, we use Jest as the test runner.  You can use any test
runner you like.

## Installation and Running Tests

* `npm install`
* `npm test`

## Outcome
The run time for the two unit tests are very similar. 6 seconds
versus 7.5 seconds.  However, the Enzyme test is doing a
shallow render while the Testing-Library test is doing
a full render.  

We also found that the test code for Testing-Library is
much more succinct, easy to read, and discourages gray
or white box testing, which is an anti-pattern in React.

However, if you are doing all of your components in a 
functional style and avoiding maintaining state in the
components, you're probably not doing the things 
Testing-Library is designed to discourage you from doing,
anyway.

## Discussion
In our spike, we constructed a unit test on the `App.js`
view that asserts when you click a `Click for Time` button,
the current time will appear next to a `Current Time` label.

Note an illustration of the dangers of unit testing:  Although
the view is capable of this, as demonstrated by the unit
tests passing, it cannot do it for real.  The appropriate
functions have not been implemented.  Those passed into
the view during the test are test doubles.

In the Enzyme test, we set up our unit under test in the
usual way:

`app = shallow(<App {...properties} />);`

In the Testing-Library version it's very similar:

`app = render(<App {...properties} />);`

But it's important to note that the Testing-Library render()
is more akin to the Enzyme mount().  In both cases, you can
pass in properties which lets you exploit seams and
control dependency behavior without altering your code
under test.

Your tests will have some notable differences.

Enzyme:

```
test("should call getCurrentTime action creator when button is clicked", () => {
    const getTimeButton = app.find(Button);

    getTimeButton.simulate("press");

    expect(app.find(Text).at(1).childAt(0).text()).toEqual('Current Time: ' + newTime);
});
```

Testing-Library/React:

```
test("should call getCurrentTime action creator when button is clicked", async () => {
    const {getByTestId, queryByTestId} = app;

    const getTimeButton = getByTestId('getTime');

    fireEvent.press(getTimeButton);

    await wait(() => expect(queryByTestId('time')).toBeTruthy());
    await wait(() => expect(getByTestId('time').props.children).toEqual('Current Time: ' + newTime));
});
```

First, Testing-Library encourages using testIDs to find
elements in your code.  On the one hand, the objection
is that we're adding code to facilitate testing.  On the
other, testIDs are more reliable than some mix of query
selectors, types, or children of children ad infinitum.

Second, Testing-Library's event simulations seem more
reliable than Enzyme's.  You fire an event directly,
rather than relying on Enzyme's .simulate() to exercise
an element to get the desired behavior.

Finally, TLR's async await functionality is more seamless
and let's you wait for an assertion to become true, rather
than hoping it is when you assert it or writing some kind
of loop like we often have to do in Enzyme.