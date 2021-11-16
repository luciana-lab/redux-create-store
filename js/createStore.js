// takes the reducer as an argument
// Then we pass through our reducer function when invoking the createStore method
let store = createStore(reducer);

// wrap state inside a function to don't acidentally be overwritten
// provides a controlled way to write (dispatch) and retrieve (getState) information

// Every piece of code that would be common to any JavaScript application following this pattern is wrapped inside of the createStore function
// That a call to dispatch should call a reducer, reassign the state, and render a change.

function createStore(reducer) {
  let state;

  // state is now accessible to dispatch
  // Action -> Reducer -> New State
  function dispatch(action) {
    state = reducer(state, action);
    render();
  };

  // returns the state
  function getState() {
    return state
  }

  return { dispatch, getState }
}

// Any code that is particular to our application is outside the createStore(reducer) function.
// How the DOM is updated in our render function
// What events trigger a dispatch method (click the button)
// How our state should change in response to different actions being dispatched (reducer function)

function reducer(state = { count: 0 }, action) {
  switch (action.type) {
    case 'INCREASE_COUNT':
      return { count: state.count + 1 };

    default:
      return state;
  }
};

function render() {
  let container = document.getElementById('container');
  container.textContent = store.getState().count;
};

// dispatch({ type: '@@INIT' })
store.dispatch({ type: '@@INIT' })

let button = document.getElementById('button');

button.addEventListener('click', function () {
  store.dispatch({ type: 'INCREASE_COUNT' });
})
