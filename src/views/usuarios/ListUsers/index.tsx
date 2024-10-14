import { Container } from 'common'

import styled from './styles.module.scss'

import Image from 'next/image'
import { IUserResponse } from 'types/user'
import Link from 'next/link'

import BlockUser from '../BlockUser'
import ResetUserPwd from '../ResetUserPwd'

export default function UsersCard({
  users
}: {
  users?: IUserResponse[]
}) {
  if (!users?.length) {
    return (
      <Container>
        <div className={styled['empty-users']}>
          <Image
            src="/svg/search.svg"
            alt="Icone de lupa no centro do botão de pesquisar"
            width={50}
            height={50}
            className={styled['search-image']}
          />

          <div className={styled['not-found-content']}>
            <h3>Nenhum usuário encontrado.</h3>
          </div>
        </div>
      </Container>
    )
  }

  return (
    <div className={styled['users-section']}>
      <div className={styled['user-table-header']}>
        <span>Nome:</span>
        <span>E-mail:</span>
        <span>Tipo:</span>
        <span>Papel:</span>
        <span></span>
      </div>
      <div className={styled['users-wrapper']}>
        {users.map((user) => (
          <div className={styled['user-item']} key={user.id}>
            <div className={styled['user-info']}>
              <span>Nome:</span>
              <p>{user.name}</p>
            </div>
            <div className={styled['user-info']}>
              <span>E-mail:</span>
              <p>{user.email}</p>
            </div>
            <div className={styled['user-info']}>
              <span>Tipo:</span>
              <p>{user.userType}</p>
            </div>
            <div className={styled['user-info']}>
              <span>Papel:</span>
              <p>{user.role}</p>
            </div>
            <div className={styled['user-info']}>
              <ResetUserPwd userId={user.id} />
              <BlockUser
                isBlocked={user.isBlocked}
                userId={user.id}
              />
              <Link
                className={styled['action-button']}
                href={`/usuarios/${user.id}`}
              >
                <Image
                  src="/svg/edit.svg"
                  alt="Icone de lapes no centro do botão editar useruário"
                  width={22}
                  height={22}
                />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
