import {createStore} from './createStore';

const initialState = {
  count: 1
}

const reducer = (state = initialState, action) => {
  if (action.type === 'SUM') {
    return {
      ...state,
      count: state.count + 1
    }
  }
  return state
}

describe('createStore:', () => {
  let store
  let handler

  beforeEach(() => {
    store = createStore(reducer, initialState)
    handler = jest.fn()
  })

  test('first', () => {
    expect(store).toBeDefined()
    expect(store.dispatch).toBeDefined()
    expect(store.subscribe).toBeDefined()
    expect(store.getState()).not.toBeUndefined()
  })

  test('should return object as a state', () => {
    expect(store.getState()).toBeInstanceOf(Object)
  })

  test('should return default state', () => {
    expect(store.getState()).toEqual(initialState)
  })

  test('should return add count field in object', () => {
    store.dispatch({type: 'SUM'})
    expect(store.getState().count).toBe(2)
  })

  test('should NOT change state with non-existent action', () => {
    store.dispatch({type: 'FAKE'})
    expect(store.getState()).toEqual(initialState)
  })

  test('should call subscriber function', () => {
    store.subscribe(handler)

    store.dispatch({type: 'SUM'})

    expect(handler).toHaveBeenCalled()
    expect(handler).toHaveBeenCalledWith(store.getState())
  })

  test('should NOT call unsubscribe function', () => {
    const sub = store.subscribe(handler)

    sub.unsubscribe()

    store.dispatch({type: 'SUM'})

    expect(handler).not.toHaveBeenCalled()
  })

  test('should dispatch in async', () => {
    return new Promise(resolve => {
      setTimeout(() => {
        store.dispatch({type: 'SUM'})
      }, 500)
      setTimeout(() => {
        expect(store.getState().count).toBe(2)
        resolve()
      }, 1000)
    })
  })
})
