export function getTokenFromLocalStorage(key: string): string {
  const data = localStorage.getItem(key)
  const accessToken: string = data ? JSON.parse(data) : ''
  return accessToken
}
export function setTokenToLocalStorage(key: string, value: string): void {
  localStorage.setItem(key, JSON.stringify(value))
}

export function removeTokenLocalStorage(key: string): void {
  localStorage.removeItem(key)
}
