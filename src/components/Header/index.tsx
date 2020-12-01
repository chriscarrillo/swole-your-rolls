import {AuthContext} from 'auth/context'
import React, {useContext} from 'react'
import {Container as BootstrapContainer, Row as BootstrapRow, Col, Navbar} from 'react-bootstrap'
import styled from 'styled-components'

const HeaderContainer = styled.header`
  font-family: ${({theme}) => theme.fonts.bold};
  display: flex;
  height: 100px;
  text-transform: uppercase;
  background-color: ${({theme}) => theme.colors.secondary};
  color: ${({theme}) => theme.colors.light};
  padding-left: ${({theme}) => theme.spacers[2]};
  padding-right: ${({theme}) => theme.spacers[2]};
  margin-bottom: ${({theme}) => theme.spacers[3]};
`

const Container = styled(BootstrapContainer)`
  display: flex;
  align-items: center;
`

const Row = styled(BootstrapRow)`
  width: 100%;
`

/**
 * Header.
 * @return Header of the page
 */
export const Header: React.FC = () => {
  /**
   * Contexts.
   */
  const {isLoggedIn} = useContext(AuthContext)

  const title = isLoggedIn ? <h1>Swole Your Roles | Welcome</h1> : <h1>Swole Your Rolls</h1>
  return (
    <HeaderContainer>
      <Container>
        <Row>
          <Col lg={6}>{title}</Col>
          <Col>
            <Navbar />
          </Col>
        </Row>
      </Container>
    </HeaderContainer>
  )
}
