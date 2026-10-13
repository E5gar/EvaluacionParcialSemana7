import { useState } from 'react'
import Badge from '../../components/ui/Badge'
import Button from '../../components/ui/Button'
import DataTable from '../../components/ui/DataTable'
import Modal from '../../components/ui/Modal'
import { getUsers } from '../../services/userService'
import type { User } from '../../types'
import UserForm from './UserForm'
import styles from './UsersPage.module.css'

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>(getUsers)
  const [open, setOpen] = useState(false)

  function handleSaved() {
    setUsers(getUsers())
    setOpen(false)
  }

  return (
    <main className="page">
      <div className="container">
        <header className="section-head">
          <div className={styles.titulo}>
            <p className="eyebrow">Administración</p>
            <h1 className="heading-m">Usuarios</h1>
          </div>
          <Button variant="acento" onClick={() => setOpen(true)}>
            Nuevo usuario
          </Button>
        </header>

        <DataTable
          data={users}
          columns={[
            { header: 'Código', render: (user) => user.code },
            { header: 'Nombres y apellidos', render: (user) => `${user.firstName} ${user.lastName}` },
            { header: 'Correo', render: (user) => user.email },
            { header: 'Tipo', render: (user) => <Badge variant="neutro">{user.type}</Badge> },
            {
              header: 'Rol',
              render: (user) => (
                <Badge variant={user.role === 'admin' ? 'acento' : 'neutro'}>
                  {user.role === 'admin' ? 'Admin' : 'Usuario'}
                </Badge>
              ),
            },
          ]}
        />

        <Modal open={open} onClose={() => setOpen(false)} title="Registrar usuario">
          <UserForm onSaved={handleSaved} onCancel={() => setOpen(false)} />
        </Modal>
      </div>
    </main>
  )
}