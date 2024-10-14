'use client'
import { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import classnames from 'classnames'

import { USER_ROLES } from 'enums/Roles.enums'
import { AuthStore } from 'types/auth'
import { useAuth } from 'store/auth'

import styled from './styles.module.scss'
import Image from 'next/image'
import { removeCookie } from 'server/cookieAction'

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
    label: 'Equipamentos',
    slug: 'equipamentos',
    link: '/equipamentos',
    role: [USER_ROLES.USER_ADMIN]
  },
  {
    label: 'Usuários',
    slug: 'usuarios',
    link: '/usuarios',
    role: [USER_ROLES.USER_ADMIN]
  }
]

const MenuButton = ({
  isMenuOpen,
  setIsMenuOpen
}: {
  isMenuOpen: boolean
  setIsMenuOpen: () => void
}) => {
  return (
    <button
      type="button"
      title="Botão menu"
      className={classnames(styled['menu-mobile'], {
        [styled['is-open']]: isMenuOpen
      })}
      onClick={setIsMenuOpen}
    >
      <span />
      <span />
      <span />
    </button>
  )
}

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
      className={classnames(styled['menu-item'], {
        [styled['active-page']]: isActive
      })}
      href={link}
    >
      {label}
    </Link>
  )
}

export default function Menu() {
  const pathname = usePathname()
  const router = useRouter()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const {
    role,
    name: userName,
    email,
    signOut
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

  const handleLogout = async () => {
    await removeCookie('user-auth')
    await removeCookie('user-role')
    signOut()
    document.body.style.overflowY = 'auto'
    router.push('/login')
  }

  return (
    <div className={styled['menu-wrapper']}>
      <div
        className={classnames(styled['menu-content'], {
          [styled['is-open']]: isMenuOpen
        })}
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

          <button
            type="button"
            onClick={handleLogout}
            aria-label="Sair"
          >
            <Image
              src="/svg/logout.svg"
              width={24}
              height={24}
              alt="Icone de sair"
            />
          </button>
        </div>
      </div>

      <MenuButton
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={toggleMenu}
      />

      <div
        className={classnames(styled['overlay'], {
          [styled['is-open']]: isMenuOpen
        })}
        onClick={() => setIsMenuOpen(false)}
      />
    </div>
  )
}
