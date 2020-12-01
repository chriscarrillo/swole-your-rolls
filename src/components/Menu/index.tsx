import {FirebaseContext} from 'firebase/context'
import {appPages} from 'pages'
import React, {useCallback, useContext, useState} from 'react'
import {slide as SideMenu, State} from 'react-burger-menu'
import {BiLogOut} from 'react-icons/bi'
import {MdMenu} from 'react-icons/md'
import {Link} from 'react-router-dom'
import styled from 'styled-components'
import 'components/Menu/Menu.scss'

const SideMenuLink = styled(Link)`
  display: block;
  color: ${({theme}) => theme.colors.light};
  padding: ${({theme}) => theme.spacers[2]} ${({theme}) => theme.spacers[3]};
  border-top: 1px solid ${({theme}) => theme.colors.dark};

  &:hover {
    color: ${({theme}) => theme.colors.primary};
    text-decoration: none;
  }
`

const HamburgerIcon = styled(MdMenu)`
  color: ${({theme}) => theme.colors.light};
`

const MenuItemIcon = styled.div`
  display: inline;
  position: relative;
  left: -10px;
  font-size: 1.5rem;
`

/**
 * Menu for header.
 * @return Site menu
 */
export const Menu: React.FC = () => {
  /**
   * Custom hooks.
   */
  const {logout} = useContext(FirebaseContext)

  /**
   * States.
   */
  const [isOpen, setIsOpen] = useState(false)

  /**
   * Callbacks.
   */
  const handleStateChange = useCallback(
    (state: State) => {
      setIsOpen(state.isOpen)
    },
    [setIsOpen],
  )

  const closeMenu = useCallback(() => {
    setIsOpen(false)
  }, [setIsOpen])

  const links = appPages.map(page => (
    <SideMenuLink key={page.url} to={page.url} onClick={closeMenu}>
      <MenuItemIcon>
        <page.icon />
      </MenuItemIcon>
      {page.title}
    </SideMenuLink>
  ))

  return (
    <SideMenu
      customBurgerIcon={<HamburgerIcon />}
      isOpen={isOpen}
      onStateChange={handleStateChange}
    >
      {links}
      <SideMenuLink to="#" onClick={logout}>
        <MenuItemIcon>
          <BiLogOut />
        </MenuItemIcon>
        Logout
      </SideMenuLink>
    </SideMenu>
  )
}
