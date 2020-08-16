import {useCallback} from 'react'

export const useModal = () => {
  return useCallback((modalSelector, callback) => {
    if (window.M) {
      const elem = document.getElementById(modalSelector)
      callback(window.M.Modal.init(elem))
    }
  }, [])
}