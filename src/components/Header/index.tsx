import {Menu} from 'components/Menu'
import {FirebaseContext} from 'firebase/context'
import React, {useContext} from 'react'
import {Container as BootstrapContainer, Row as BootstrapRow, Button, Col} from 'react-bootstrap'
import {NavLink} from 'react-router-dom'
import styled from 'styled-components'

const HeaderContainer = styled.header`
  position: sticky;
  top: 0;
  z-index: 1000;
  font-family: ${({theme}) => theme.fonts.bold};
  display: flex;
  align-items: center;
  height: 100px;
  text-transform: uppercase;
  background-color: ${({theme}) => theme.colors.secondary};
  color: ${({theme}) => theme.colors.light};
  padding-left: ${({theme}) => theme.spacers[2]};
  padding-right: ${({theme}) => theme.spacers[2]};
  margin-bottom: ${({theme}) => theme.spacers[3]};
`

const HeaderTitle = styled.h2`
  margin: 0;
  font-size: 1.5rem;

  @media (max-width: ${({theme}) => theme.breakpoints.max.lg}) {
    text-align: center;
  }
`

const Container = styled(BootstrapContainer)`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const Row = styled(BootstrapRow)`
  width: 100%;
  align-items: center;
`

const NavbarCol = styled(Col)`
  display: flex;
  justify-content: flex-end;
`

const NavMenu = styled.ul`
  display: flex;
  align-items: center;
  list-style-type: none;
  margin-bottom: 0;

  @media (max-width: ${({theme}) => theme.breakpoints.max.lg}) {
    display: none;
  }
`

const NavMenuLinkItem = styled.li`
  text-align: center;
`

const NavMenuLink = styled(NavLink)`
  color: ${({theme}) => theme.colors.light};
  margin: ${({theme}) => theme.spacers[2]};

  &:hover {
    text-decoration: none;
    color: ${({theme}) => theme.colors.primary};
  }
`

const LogoutButton = styled(Button)`
  margin: ${({theme}) => theme.spacers[2]};
`

/**
 * Header.
 * @return Header of the page
 */
export const Header: React.FC = () => {
  /**
   * Contexts.
   */
  const {isLoggedIn, logout} = useContext(FirebaseContext)

  const navbar = isLoggedIn && (
    <nav>
      <NavMenu>
        <NavMenuLinkItem>
          <NavMenuLink exact activeClassName="text-primary" to="/home">
            Meal Plans
          </NavMenuLink>
        </NavMenuLinkItem>
        <NavMenuLinkItem>
          <NavMenuLink exact activeClassName="text-primary" to="/workout-plans">
            Workout Plans
          </NavMenuLink>
        </NavMenuLinkItem>
        <NavMenuLinkItem>
          <NavMenuLink exact activeClassName="text-primary" to="/account">
            Account
          </NavMenuLink>
        </NavMenuLinkItem>
        <NavMenuLinkItem>
          <LogoutButton onClick={logout}>Logout</LogoutButton>
        </NavMenuLinkItem>
      </NavMenu>
    </nav>
  )

  const hamburgerMenu = isLoggedIn && <Menu />

  return (
    <HeaderContainer>
      {hamburgerMenu}
      <Container>
        <Row>
          <Col lg={12} xl={5}>
            <HeaderTitle>Swole Your Rolls</HeaderTitle>
          </Col>
          <NavbarCol xl={7}>{navbar}</NavbarCol>
        </Row>
      </Container>
    </HeaderContainer>
  )
}
