import { Platform, StyleSheet, Text, View } from 'react-native';
import { Colors, hp, wp } from '../../../../constants';
export const StatPill = ({
  label,
  value,
  sub,
  accent,
}: {
  label: string;
  value: string;
  sub?: string;
  accent?: boolean;
}) => (
  <View style={[pillStyles.pill, accent && pillStyles.accentPill]}>
    <Text style={[pillStyles.value, accent && pillStyles.accentValue]}>
      {value}
    </Text>
    {sub && (
      <Text style={[pillStyles.sub, accent && pillStyles.accentSub]}>
        {sub}
      </Text>
    )}
    <Text style={[pillStyles.label, accent && pillStyles.accentLabel]}>
      {label}
    </Text>
  </View>
);

const pillStyles = StyleSheet.create({
  pill: {
    flex: 1,
    backgroundColor: Colors.surface,
    borderRadius: wp('3.73%'),
    padding: wp('3%'),
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  accentPill: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primaryDark,
  },
  value: {
    fontSize: wp('5.5%'),
    fontWeight: '800',
    color: Colors.text,
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
  },
  accentValue: { color: Colors.white },
  sub: {
    fontSize: wp('2.5%'),
    color: Colors.textMuted,
    marginTop: hp('0.12%'),
  },
  accentSub: { color: 'rgba(255,255,255,0.7)' },
  label: {
    fontSize: wp('2.6%'),
    color: Colors.textMuted,
    marginTop: hp('0.49%'),
    textTransform: 'uppercase',
    letterSpacing: wp('0.21%'),
    fontWeight: '600',
  },
  accentLabel: { color: 'rgba(255,255,255,0.85)' },
});
