'use client'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

import styled from './styles.module.scss'
import { USER_ROLES } from 'enums/Roles.enums'
import { AuthStore } from 'types/auth'
import { useAuth } from 'store/auth'

const menuItems = [
  {
    label: 'Home',
    slug: '',
    link: '/',
    role: [
      USER_ROLES.USER_APPROVER,
      USER_ROLES.USER_ADMIN,
      USER_ROLES.USER_AUTH
    ]
  },
  {
    label: 'Agendas',
    slug: 'agendas',
    link: '/agendas',
    role: [
      USER_ROLES.USER_APPROVER,
      USER_ROLES.USER_ADMIN,
      USER_ROLES.USER_AUTH
    ]
  },
  {
    label: 'Usuários',
    slug: 'users',
    link: '/users',
    role: [USER_ROLES.USER_ADMIN]
  }
]

const MenuButton = ({
  isMenuOpen,
  setIsMenuOpen
}: {
  isMenuOpen: boolean
  setIsMenuOpen: () => void
}) => (
  <button
    type="button"
    title="Botão menu"
    className={`${styled['menu-mobile']} ${
      isMenuOpen ? styled['is-open'] : ''
    }`}
    onClick={setIsMenuOpen}
  >
    <span />
    <span />
    <span />
  </button>
)

const MenuItem = ({
  label,
  link,
  routeRole,
  userRole,
  isActive
}: {
  label: string
  link: string
  routeRole: string[]
  userRole: string
  isActive: boolean
}) => {
  if (!routeRole.includes(userRole)) {
    return null
  }
  return (
    <Link
      key={label.toLocaleLowerCase()}
      className={`${styled['menu-item']} ${
        isActive ? styled['active-page'] : ''
      }`}
      href={link}
    >
      {label}
    </Link>
  )
}

export default function Menu() {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const {
    role,
    name: userName,
    email
  } = useAuth((state: AuthStore) => state)

  const checkActivePage = (page: string): boolean => {
    const path = pathname?.split('/')[1]
    return path === page
  }

  useEffect(() => {
    document.body.style.overflowY = isMenuOpen ? 'hidden' : 'auto'
  }, [isMenuOpen])

  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState)
  }

  useEffect(() => {
    setIsMenuOpen(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  return (
    <div className={styled['menu-wrapper']}>
      <div
        className={`${styled['menu-content']} ${
          isMenuOpen ? styled['is-open'] : ''
        }`}
      >
        <div className={styled['menu-items']}>
          {menuItems.map((item) => (
            <MenuItem
              key={item.label}
              label={item.label}
              link={item.link}
              routeRole={item.role}
              userRole={role}
              isActive={checkActivePage(item.slug)}
            />
          ))}
        </div>

        <div className={styled['user-info']}>
          <div>
            <p>{userName}</p>
            <span>{email}</span>
          </div>

          <button>Sair</button>
        </div>
      </div>

      <MenuButton
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={toggleMenu}
      />

      <div
        className={`${styled.overlay} ${
          isMenuOpen ? styled['is-open'] : ''
        }`}
        onClick={() => setIsMenuOpen(false)}
      />
    </div>
  )
}
