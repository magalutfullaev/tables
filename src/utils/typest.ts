import store from "../store/store";
import {useDispatch} from "react-redux";

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export type PostT = {
  useId: number,
  id: number,
  title: string,
  body: string
}