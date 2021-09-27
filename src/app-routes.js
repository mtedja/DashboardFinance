import { withNavigationWatcher } from './contexts/navigation';
// import { HomePage, TasksPage, ProfilePage, UserlistPage, UsernewPage, FeatureTreePage, ChangepasswordPage } from './pages';
import { HomePage, ProfilePage, UserlistPage, UsernewPage, FeatureTreePage, ChangepasswordPage } from './pages';

const routes = [
  // {
  //   path: '/tasks',
  //   component: TasksPage
  // },
  {
    path: '/profile',
    component: ProfilePage
  },
  {
    path: '/home',
    component: HomePage
  }, 
  {
    path: '/userlist',
    component: UserlistPage
  }, 
  {
    path: '/usernew',
    component: UsernewPage
  }, 
  {
    path: '/feature-tree',
    component: FeatureTreePage
  }, 
  {
    path: '/changepassword',
    component: ChangepasswordPage
  }
];

export default routes.map(route => {
  return {
    ...route,
    component: withNavigationWatcher(route.component)
  };
});
