import React, { RefObject } from 'react'
import { ActivityIndicator } from 'react-native'
import DrawerLayout from 'react-native-gesture-handler/DrawerLayout'

import { PageContainer } from 'packages/styles'
import theme from 'packages/styles/theme'

import HomeTopBar from '../components/Topbar'
import { HomeNoStudentContainer } from './home-pages.styles'

export interface HomeLoadingPageProps {
  drawerRef: RefObject<DrawerLayout>
}

const HomeLoadingPage: React.FC<HomeLoadingPageProps> = (props) => {
  const openDrawer = () => props.drawerRef.current?.openDrawer()

  return (
    <PageContainer withoutPadding style={{ paddingTop: 0 }}>
      <HomeTopBar onFiltersPressed={openDrawer} />

      <HomeNoStudentContainer>
        <ActivityIndicator size={44} color={theme.colors.primary.purple} />
      </HomeNoStudentContainer>
    </PageContainer>
  )
}

export default HomeLoadingPage
