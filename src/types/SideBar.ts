interface SubMenuItem {
    name: string,
    url: string
}

interface MenuItem {
    name: string,
    icon: string,
    url?: string
    submenus?: Array<SubMenuItem>,
}

export { MenuItem, SubMenuItem }