import { StatusBar, StyleSheet } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import SOPDetail from '../../DrawarScreens/InstructionScreen/components/SOPDetail';
import { Colors } from '../../../constants';
import { StackScreenProps } from '@react-navigation/stack';
import { DrawerStackParamList } from '../../../navigation/type';

type Props = StackScreenProps<DrawerStackParamList, 'InstructionDetailScreen'>;
export default function InstructionDetailScreen({ route }: Props) {
  const { activeItem } = route.params;

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.bg} />
      <SOPDetail item={activeItem} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.bg,
  },
});
