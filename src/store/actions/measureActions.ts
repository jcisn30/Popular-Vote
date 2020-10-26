import { ThunkAction } from 'redux-thunk';
import { Measure, MeasureAction, SET_MEASURE, SET_ERROR, UPDATE_MEASURE, } from '../types';
import { RootState } from '..';
import firebase from '../../firebase/config';
import { useSelector } from 'react-redux';
import { ActionSheetIOS } from 'react-native';


//create measure
export const addMeasure   =  (measure: string, id: string, yeas: number, neas: number, onError: () => void): ThunkAction<void, RootState, null, MeasureAction>  =>  {
    return async dispatch => { 
        try {
            const measureData: Measure = {
                measure: measure,
                id: id,
                yeas: yeas,
                neas: neas
                // createdAt: firebase.firestore.FieldValue.serverTimestamp(),
              };
              const res = await firebase.firestore().collection('/measures').add(measureData);
              const Id = await firebase.firestore().collection('/measures').doc(res.id).update({id:res.id});
              
              dispatch({
                type: SET_MEASURE,
                payload: measureData
              });
        } catch (err) {
            console.log(err);
            onError();
            dispatch({
              type: SET_ERROR,
              payload: err.message
            });
          }
    }
}



// export const updateMeasure   =  (measure: string, id: string, yeas: number, onError: () => void): ThunkAction<void, RootState, null, MeasureAction>  =>  {
//   return async dispatch => { 
//       try {
//           const measureData: Measure = {
//               measure: measure,
//               id: id,
//               yeas: yeas
//               // createdAt: firebase.firestore.FieldValue.serverTimestamp(),
//             };
//             const Yeas = await firebase.firestore().collection('/measures').doc(id).update({yeas: firebase.firestore.FieldValue.increment(1)});
//             console.log(Yeas);
//             dispatch({
//               type: UPDATE_MEASURE,
//               payload: measureData
//             });
//       } catch (err) {
//           console.log(err);
//           onError();
//           dispatch({
//             type: SET_ERROR,
//             payload: err.message
//           });
//         }
//   }
// }


//set error
export const setMeasureError = (msg: string): ThunkAction<void, RootState, null, MeasureAction> => {
  return dispatch => {
    dispatch({
      type: SET_ERROR,
      payload: msg
    });
  }
}
