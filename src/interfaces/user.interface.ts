export interface User {
  id: string
  firstName: string
  lastName: string
  isPublisher: boolean
  email: string
  password: string
}

export interface UserRegister {
  firstName: string
  lastName: string
  isPublisher: boolean
  email: string
  password: string
}

export interface UserLogin {
  password: string
  email: string
}