const getLocalStorageItem = (key: string) => {
  return localStorage.getItem(key)
}

const setLocalStorageItem = (key: string, value: string) => {
  return localStorage.setItem(key, value)
}

export default {
  getLocalStorageItem, setLocalStorageItem
}