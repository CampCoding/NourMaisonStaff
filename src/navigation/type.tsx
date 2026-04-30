import { StackNavigationProp } from '@react-navigation/stack';
import { SOPItem } from '../screens/DrawarScreens/InstructionScreen/types';

export type DrawerStackParamList = {
  AuthStack: undefined;
  HomeScreen: undefined;
  WelcomeScreen: undefined;
  LoginScreen: undefined;
  IntroSlider: undefined;
  DrawerTabs: undefined;

  // Extracted from NAV_ITEMS
  Home: undefined;
  WeeklyScheduleScreen: undefined;
  TransferLog: undefined;
  Advance: undefined;
  Vacancy: undefined;
  Chat: undefined;
  Instructions: undefined;
  EducationVideo: undefined;

  VideoDisplayScreen: undefined;
  InstructionDetailScreen: { activeItem: SOPItem };
};

export type NavigationProp = StackNavigationProp<DrawerStackParamList>;
