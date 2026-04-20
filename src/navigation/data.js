import ScreenNames from './ScreenNames';
import BottomTabsScreens from '../screens/BottomTabsScreens';
import { Icons } from '../constants';
export const BottomTabsData = [
  {
    name: ScreenNames.HomeScreen,
    component: BottomTabsScreens,
    icon: Icons.HomeIcon,
    title: 'Home',
  },
  //   {
  //     name: ScreenNames.PlanScreen,
  //     component: PlanScreen,
  //     icon: Icons.System,
  //     title: i18n.t('tabs.plan'),
  //   },
  //   {
  //     name: ScreenNames.StatisticScreen,
  //     component: StatisticScreen,
  //     icon: Icons.TrendArrow,
  //     title: i18n.t('tabs.follow'),
  //     needSub: true,
  //   },
  //   {
  //     name: ScreenNames.ChatScreen,
  //     component: ChatScreen,
  //     icon: Icons.Chat,
  //     title: i18n.t('tabs.chat'),
  //     needSub: true,
  //   },

  //   {
  //     name: ScreenNames.ProfileScreen,
  //     component: ProfileScreen,
  //     icon: Icons.LoginPerson,
  //     title: i18n.t('tabs.profile'),
  //     needSub: false,
  //   },
];
