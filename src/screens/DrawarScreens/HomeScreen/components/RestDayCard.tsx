import { Platform, StyleSheet, Text, View } from 'react-native';
import { Colors, hp, wp } from '../../../../constants';

export const RestDayCard = () => (
  <View style={restStyles.card}>
    <Text style={restStyles.icon}>🌙</Text>
    <Text style={restStyles.title}>Day Off</Text>
    <Text style={restStyles.sub}>Enjoy your rest — no shift today</Text>
  </View>
);

const restStyles = StyleSheet.create({
  card: {
    marginHorizontal: wp('4.27%'),
    marginBottom: hp('1.48%'),
    backgroundColor: Colors.surface,
    borderRadius: wp('5.33%'),
    padding: wp('8%'),
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  icon: { fontSize: wp('10.67%'), marginBottom: hp('1.23%') },
  title: {
    fontSize: wp('5%'),
    fontWeight: '700',
    color: Colors.text,
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
  },
  sub: {
    fontSize: wp('3.5%'),
    color: Colors.textMuted,
    marginTop: hp('0.74%'),
  },
});
