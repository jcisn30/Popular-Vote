import { Measure, MeasureAction, SET_MEASURE, SET_ERROR, UPDATE_MEASURE } from '../types';



const initialState: Measure = {
    measure: '',
    id: 'dsfsdf',
    yeas: 0,
    neas: 0,
}

  export default (state = initialState, action: MeasureAction) => {
    switch(action.type) {
        case SET_MEASURE:
        return {
            ...state,
            measure: action.payload,
          }
          // case UPDATE_MEASURE:
          //   return {
          //     ...state,
          //     measure:action.payload
          //   }
          default: 
          return state;
        
    case SET_ERROR:
      return {
        ...state,
        error: action.payload
      }
    }
  }

  