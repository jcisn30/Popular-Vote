export const SET_USER = 'SET_USER';
export const SIGN_OUT = 'SIGN_OUT';
export const SET_LOADING = 'SET_LOADING';
export const SET_ERROR = 'SET_ERROR';
export const NEED_VERIFICATION = 'NEED_VERIFICATION';
export const SET_SUCCESS = 'SET_SUCCESS';
export const SET_MEASURE = 'SET_MEASURE';
export const UPDATE_MEASURE = 'UPDATE_MEASURE';
export const SET_YEAS = 'SET_YEAS';
export const SET_NEAS = 'SET_NEAS';
export const SET_MEASUREID = 'SET_MEASUREID';

export interface User {
  firstName: string;
  email: string;
  id: string;
  createdAt: any;
}

export interface AuthState {
  user: User | null;
  authenticated: boolean;
  loading: boolean;
  error: string;
  needVerification: boolean;
  success: string;
}

export interface SignUpData {
  firstName: string;
  email: string;
  password: string;
}

export interface SignInData {
  email: string;
  password: string;
}

export interface Measure {
  measure: string;
  id: string;
  yeas: number;
  neas: number;
}


// Actions
interface SetUserAction {
  type: typeof SET_USER;
  payload: User;
}

interface SetLoadingAction {
  type: typeof SET_LOADING;
  payload: boolean;
}

interface SignOutAction {
  type: typeof SIGN_OUT;
}

interface SetErrorAction {
  type: typeof SET_ERROR;
  payload: string;
}

interface NeedVerificationAction {
  type: typeof NEED_VERIFICATION;
}

interface SetSuccessAction {
  type: typeof SET_SUCCESS;
  payload: string;
}

interface SetMeasureAction {
  type: typeof SET_MEASURE;
  payload: Measure;
}

interface UpdateMeasureAction {
  type: typeof UPDATE_MEASURE;
  payload: Measure;
}


interface SetYeasAction {
  type: typeof SET_YEAS;
  payload: Measure
}

interface SetNeasAction {
  type: typeof SET_NEAS;
  payload: number;
}



export type AuthAction = SetUserAction | SetLoadingAction | SignOutAction | SetErrorAction | NeedVerificationAction | SetSuccessAction ;

export type MeasureAction = SetMeasureAction | SetErrorAction | SetYeasAction | SetNeasAction | UpdateMeasureAction;