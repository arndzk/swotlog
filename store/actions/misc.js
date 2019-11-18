import { LOADING, CLEAR_MESSAGE } from ".";

export const setLoading = loading => ({
  type: LOADING,
  loading,
})

export const clearNotification = () => ({
  type: CLEAR_MESSAGE,
})