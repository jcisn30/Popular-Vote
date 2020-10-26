import { MeasureAction, SET_MEASUREID, SET_ERROR, } from '../types';



  export default (state = 0, action: MeasureAction) => {
    switch(action.type) {
        case SET_MEASUREID:
        return state + 1
          
          default: 
          return state;
    }
  }

  