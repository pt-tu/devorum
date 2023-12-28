'use client'
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react'
import React, { ReactNode } from 'react'
import { Menu, MenuItem, MenuItemStyles, Sidebar, SubMenu } from 'react-pro-sidebar'
import { useThemeStore } from '@/store/useThemeStore'
import { MdOutlineBugReport } from 'react-icons/md'
import ThemeButton from '@/components/common/ThemeButton'
import { TbBadges, TbBrandOauth, TbHome, TbLogout, TbUserCode } from 'react-icons/tb'
import { Logo } from '@/assets'
import Link from 'next/link'
import { useAuthStore } from '@/store/useUserStore'
import { usePathname, useRouter } from 'next/navigation'

const themes = {
  light: {
    sidebar: {
      backgroundColor: '#ffffff',
      color: '#607489',
    },
    menu: {
      menuContent: '#fbfcfd',
      icon: '#0098e5',
      hover: {
        backgroundColor: '#c5e4ff',
        color: '#44596e',
      },
      disabled: {
        color: '#9fb6cf',
      },
    },
  },
  dark: {
    sidebar: {
      backgroundColor: '#192021',
      color: '#8ba1b7',
    },
    menu: {
      menuContent: '#082440',
      icon: '#59d0ff',
      hover: {
        backgroundColor: '#333333',
        color: '#b6c8d9',
      },
      disabled: {
        color: '#3e5e7e',
      },
    },
  },
}

export const sidebarClasses = {
  root: 'ps-sidebar-root',
  container: 'ps-sidebar-container',
  image: 'ps-sidebar-image',
  backdrop: 'ps-sidebar-backdrop',
  collapsed: 'ps-collapsed',
  toggled: 'ps-toggled',
  rtl: 'ps-rtl',
  broken: 'ps-broken',
}

export const menuClasses = {
  root: 'ps-menu-root',
  menuItemRoot: 'ps-menuitem-root',
  subMenuRoot: 'ps-submenu-root',
  button: 'ps-menu-button',
  prefix: 'ps-menu-prefix',
  suffix: 'ps-menu-suffix',
  label: 'ps-menu-label',
  icon: 'ps-menu-icon',
  subMenuContent: 'ps-submenu-content',
  SubMenuExpandIcon: 'ps-submenu-expand-icon',
  disabled: 'ps-disabled',
  active: 'ps-active',
  open: 'ps-open',
}

const hexToRgba = (hex: string, alpha: number) => {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)

  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

const AdminSidebar = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname()
  const router = useRouter()
  const [collapsed, setCollapsed] = React.useState(false)
  const [toggled, setToggled] = React.useState(false)
  const [broken, setBroken] = React.useState(false)
  const logout = useAuthStore((state) => state.logOut)
  const theme = useThemeStore((state) => state.theme) as 'light' | 'dark'

  const getCurrentRoute = () => {
    if (pathname.includes('/admin/report')) return 'report'
    if (pathname.includes('/admin/developers')) return 'developers'
    if (pathname.includes('/admin/badges')) return 'badges'
  }

  const menuItemStyles: MenuItemStyles = {
    root: {
      fontSize: '15px',
      fontWeight: 400,
    },
    icon: {
      color: themes[theme].menu.icon,
      [`&.${menuClasses.disabled}`]: {
        color: themes[theme].menu.disabled.color,
      },
    },
    SubMenuExpandIcon: {
      color: '#b6b7b9',
    },
    subMenuContent: ({ level }) => ({
      backgroundColor: level === 0 ? hexToRgba(themes[theme].menu.menuContent, 1) : 'transparent',
    }),
    button: {
      [`&.${menuClasses.disabled}`]: {
        color: themes[theme].menu.disabled.color,
      },
      '&:hover': {
        backgroundColor: hexToRgba(themes[theme].menu.hover.backgroundColor, 1),
        color: themes[theme].menu.hover.color,
      },
    },
    label: ({ open }) => ({
      fontWeight: open ? 600 : undefined,
    }),
  }

  return (
    <div className="flex h-full w-full text-base">
      <Sidebar
        collapsed={collapsed}
        toggled={toggled}
        onBackdropClick={() => setToggled(false)}
        onBreakPoint={setBroken}
        breakPoint="md"
        backgroundColor={themes[theme].sidebar.backgroundColor}
        rootStyles={{
          color: themes[theme].sidebar.color,
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          <div style={{ flex: 1, marginBottom: '32px' }}>
            <h1 className="m-6 flex items-center gap-4 text-xl font-semibold">
              <Logo width={32} height={32} /> Devorum
            </h1>
            <div style={{ padding: '0 24px', marginBottom: '8px' }}>
              <p className="text-sm font-medium" style={{ opacity: collapsed ? 0 : 0.7, letterSpacing: '0.5px' }}>
                General
              </p>
            </div>
            <Menu menuItemStyles={menuItemStyles}>
              <MenuItem icon={<MdOutlineBugReport className="text-2xl" />} onClick={() => router.push('/admin/report')}>
                Report
              </MenuItem>
              <MenuItem icon={<TbUserCode className="text-2xl" />} onClick={() => router.push('/admin/developers')}>
                Developers
              </MenuItem>
              <MenuItem icon={<TbBadges className="text-2xl" />} onClick={() => router.push('/admin/badges')}>
                Badges
              </MenuItem>
            </Menu>
          </div>

          <Menu className="mb-6" menuItemStyles={menuItemStyles}>
            <Link href="/" className="h-full w-full">
              <MenuItem icon={<TbHome className="text-2xl" />}>Home</MenuItem>
            </Link>
            <Dropdown>
              <DropdownTrigger>
                <MenuItem icon={<TbBrandOauth className="text-2xl" />}>User</MenuItem>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem onClick={logout} startContent={<TbLogout />}>
                  Logout
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </Menu>
        </div>
      </Sidebar>

      <main className="w-full flex-1">
        <div className="flex h-16 w-full items-center justify-between px-6">
          <h2 className="text-xl font-semibold">{getCurrentRoute()}</h2>
          <ThemeButton />
        </div>
        {children}
      </main>
    </div>
  )
}

export default AdminSidebar
