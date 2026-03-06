export type HeaderProps = {
  handelShowSideNavBar: () => void
  showSideBar: boolean
  searchQuery: string
  setSearchQuery: (value: string) => void
}

export type RouteHandle = {
  title: string
}