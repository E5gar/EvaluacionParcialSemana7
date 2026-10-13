import { Outlet } from 'react-router-dom'
import { useAuth } from '../../context/useAuth'
import Navbar from './Navbar'
import styles from './Layout.module.css'

export default function Layout() {
  const { user } = useAuth()
  const theme = user?.role === 'admin' ? 'light-alt' : 'light'

  return (
    <div className={styles.layout} data-theme={theme}>
      <Navbar />
      <Outlet />
    </div>
  )
}