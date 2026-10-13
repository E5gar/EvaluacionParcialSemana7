import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/useAuth'
import { homePathFor } from '../../utils/homePath'
import Button from '../ui/Button'
import styles from './Navbar.module.css'

const adminLinks = [
  { to: '/admin/categorias', label: 'Categorías' },
  { to: '/admin/libros', label: 'Libros' },
  { to: '/admin/usuarios', label: 'Usuarios' },
]

const userLinks = [
  { to: '/catalogo', label: 'Catálogo' },
  { to: '/prestamos', label: 'Préstamos' },
  { to: '/historial', label: 'Historial' },
]

export default function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)

  const links = user?.role === 'admin' ? adminLinks : userLinks
  const homePath = user ? homePathFor(user.role) : '/login'

  function handleLogout() {
    setOpen(false)
    logout()
    navigate('/login')
  }

  return (
    <header className={styles.header}>
      <div className={styles.barra}>
        <NavLink to={homePath} className={styles.marca}>
          Biblioteca
        </NavLink>

        <button
          type="button"
          className={styles.hamburguesa}
          aria-label="Abrir menú"
          aria-expanded={open}
          onClick={() => setOpen((current) => !current)}
        >
          <span className={styles.linea} />
          <span className={styles.linea} />
        </button>

        <nav className={open ? `${styles.menu} ${styles.navAbierto}` : styles.menu}>
          <ul className={styles.lista}>
            {links.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  data-texto={link.label}
                  className={({ isActive }) =>
                    isActive ? `${styles.enlace} ${styles.activo}` : styles.enlace
                  }
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
          <span className={styles.usuario}>{user?.firstName}</span>
          <Button variant="contorno" onClick={handleLogout}>
            Salir
          </Button>
        </nav>
      </div>
    </header>
  )
}