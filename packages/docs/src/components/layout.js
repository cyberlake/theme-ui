/** @jsx jsx */
import { jsx, Styled, useColorMode } from 'theme-ui'
import { useState, useRef } from 'react'
import { Global } from '@emotion/core'
import { Flex } from '@theme-ui/components'
import { AccordionNav } from '@theme-ui/sidenav'

import SkipLink from './skip-link'
// import Sidebar from './sidebar'
import Pagination from './pagination'
import EditLink from './edit-link'
import Head from './head'
import MenuButton from './menu-button'
import NavLink from './nav-link'
import Button from './button'
import Sidebar from '../sidebar.mdx'

// replace with components package
import { Header, Footer, Layout, Main, Container } from 'theme-ui'

const modes = ['light', 'dark', 'deep', 'swiss']

const sidebar = {
  wrapper: AccordionNav,
  a: NavLink,
}

export default props => {
  const [menuOpen, setMenuOpen] = useState(false)
  const nav = useRef(null)
  const [mode, setMode] = useColorMode()

  const cycleMode = e => {
    const i = modes.indexOf(mode)
    const next = modes[(i + 1) % modes.length]
    setMode(next)
  }

  return (
    <Styled.root>
      <Head {...props} />
      <Global
        styles={{
          '*': {
            boxSizing: 'border-box',
          },
          body: {
            margin: 0,
          },
        }}
      />
      <SkipLink>Skip to content</SkipLink>
      <Layout>
        <Header
          sx={{
            justifyContent: 'space-between',
          }}>
          <Flex sx={{ alignItems: 'center' }}>
            <MenuButton
              onClick={e => {
                setMenuOpen(!menuOpen)
                if (!nav.current) return
                const navLink = nav.current.querySelector('a')
                if (navLink) navLink.focus()
              }}
            />
            <NavLink to="/">Theme UI</NavLink>
          </Flex>
          <Flex>
            <NavLink href="https://github.com/system-ui/theme-ui">
              GitHub
            </NavLink>
            <Button
              sx={{
                ml: 2,
              }}
              onClick={cycleMode}>
              {mode}
            </Button>
          </Flex>
        </Header>
        <Main>
          <div
            sx={{
              display: ['block', 'flex'],
              mx: props.fullwidth ? 0 : -3,
            }}>
            <div
              ref={nav}
              onFocus={e => {
                setMenuOpen(true)
              }}
              onBlur={e => {
                setMenuOpen(false)
              }}
              onClick={e => {
                setMenuOpen(false)
              }}>
              <Sidebar
                open={menuOpen}
                components={sidebar}
                sx={{
                  display: [null, props.fullwidth ? 'none' : 'block'],
                  width: 256,
                  flex: 'none',
                  px: 3,
                  pt: 3,
                  pb: 4,
                  mt: [64, 0],
                }}
              />
            </div>
            <div
              id="content"
              sx={{
                width: '100%',
                minWidth: 0,
                maxWidth: 768,
                mx: 'auto',
                px: props.fullwidth ? 0 : 3,
              }}>
              {props.children}
              <EditLink />
              {!props.fullwidth && <Pagination />}
            </div>
          </div>
        </Main>
        {props.fullwidth && (
          <Footer sx={{ py: 3 }}>
            <div sx={{ mx: 'auto' }} />
            <NavLink to="/">Theme UI</NavLink>
            <NavLink href="https://github.com/system-ui/theme-ui">
              GitHub
            </NavLink>
          </Footer>
        )}
      </Layout>
    </Styled.root>
  )
}
