import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NavigationProp } from '../navigation/type';
import { Colors, hp, Icons, wp } from '../constants';

export default function SubHeader({ title }: { title: string }) {
  const navigation = useNavigation<NavigationProp>();
  const onBack = useCallback(() => navigation.goBack(), [navigation]);
  return (
    <View style={styles.detailHeader}>
      <TouchableOpacity
        style={styles.backBtn}
        onPress={onBack}
        activeOpacity={0.7}
      >
        <Icons.ArrowBack height={wp(5)} width={hp(5)} />
      </TouchableOpacity>
      <View style={styles.headerCenter}>
        <Text style={styles.headerTitle} numberOfLines={1}>
          {title}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  detailHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp(5),
    paddingVertical: hp(1.75),
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    backgroundColor: Colors.bg,
    gap: wp(3),
  },
  backBtn: {
    width: wp(9.5),
    height: wp(9.5),
    borderRadius: wp(3),
    backgroundColor: Colors.surface2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backArrow: {
    fontSize: wp(4.5),
    color: Colors.text,
    fontWeight: '600',
  },
  headerCenter: {
    flex: 1,
    marginLeft: wp(3.5),
  },
  headerTitle: {
    fontSize: wp(4.5),
    fontWeight: '700',
    color: Colors.text,
    letterSpacing: -0.3,
  },
});
