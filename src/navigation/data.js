import { Colors, Icons } from '../constants';
import HomeScreen from './../screens/DrawarScreens/HomeScreen/index';
import VacationScreen from './../screens/DrawarScreens/VacationScreen/index';
import AdvanceScreen from './../screens/DrawarScreens/AdvanceScreen/index';
import InstructionScreen from './../screens/DrawarScreens/InstructionScreen/index';
import EducationVideosScreen from './../screens/DrawarScreens/EducationVideosScreen/index';
import TransfareLogScreen from './../screens/DrawarScreens/TransfareLogScreen/index';
import ScreenNames from './ScreenNames';
import WeeklyScheduleScreen from '../screens/DrawarScreens/WeeklyScheduleScreen';
import DisplayChatScreen from './../screens/OtherScreens/DisplayChatScreen/index';

export const NAV_ITEMS = [
  {
    name: ScreenNames.Home,
    label: 'Home',
    icon: Icons.Home,
    accent: Colors.primary,
    component: HomeScreen,
  },
  {
    name: ScreenNames.WeeklyScheduleScreen,
    label: 'Future Table',
    icon: Icons.Appartment,
    accent: Colors.primaryLight,
    component: WeeklyScheduleScreen,
  },

  {
    name: ScreenNames.TransferLog,
    label: 'Transfer log',
    icon: Icons.TransferLog,
    accent: Colors.primary,
    component: TransfareLogScreen,
  },
  // {
  //   name: ScreenNames.Advance,
  //   label: 'Advance',
  //   icon: Icons.Advance,
  //   accent: Colors.secondary,
  //   component: AdvanceScreen,
  // },
  {
    name: ScreenNames.Vacancy,
    label: 'Vacancy',
    icon: Icons.Vacancy,
    accent: Colors.primaryDark,
    component: VacationScreen,
  },
  {
    name: ScreenNames.Chat,
    label: 'Chat',
    icon: Icons.Chat,
    accent: Colors.secondary,
    component: DisplayChatScreen,
  },
  {
    name: ScreenNames.Instructions,
    label: 'Instructions ',
    icon: Icons.Instruction,
    accent: Colors.secondaryLight,
    component: InstructionScreen,
  },
  {
    name: ScreenNames.EducationVideo,
    label: 'Education video',
    icon: Icons.Video,
    accent: Colors.primaryLight,
    component: EducationVideosScreen,
  },
];
