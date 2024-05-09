import { useRef } from 'react'
import './App.css'
import Table from './component-generics'

interface IUser {
  id: number
  name: string
  email: string
}

function App() {
  const domRef = useRef<HTMLDivElement>(null)
  const valueRef = useRef<number>(599)

  return (
    <>
      {/* 组件泛型 */}
      <Table<IUser> field="name" />
    </>
  )
}

export default App
