// import {storage} from '@core/utils';
import {defaultStyles, defaultTitle} from '@/constants';

const defaultState = {
  rowState: {},
  colState: {},
  dataState: {}, // {'0:1': 'some text'}
  stylesState: {},
  currentText: '',
  currentStyles: defaultStyles,
  title: defaultTitle,
  openedDate: new Date().toJSON()
}

function normalize(state) {
  return {
    ...state,
    currentStyles: defaultStyles,
    currentText: ''
  }
}

// export const initialState = storage('excel-state')
//   ? normalize(storage('excel-state'))
//   : defaultState

export function normalizeInitialState(state) {
  return state
    ? normalize(state)
    : defaultState
}
