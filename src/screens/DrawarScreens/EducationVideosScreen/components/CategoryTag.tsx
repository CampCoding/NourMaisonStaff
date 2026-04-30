import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, hp, wp } from '../../../../constants';

interface Props {
  label: string;
}

const CategoryTag: React.FC<Props> = ({ label }) => {
  const tagColor =
    label === 'App Guide'
      ? { bg: 'rgba(221,153,51,0.12)', text: Colors.primaryDark }
      : label === 'Service'
      ? { bg: 'rgba(132,176,103,0.12)', text: Colors.secondaryDark }
      : label === 'Kitchen'
      ? { bg: 'rgba(184,122,31,0.10)', text: Colors.primaryDark }
      : { bg: 'rgba(90,136,67,0.10)', text: Colors.secondaryDark };

  return (
    <View style={[styles.categoryTag, { backgroundColor: tagColor.bg }]}>
      <Text style={[styles.categoryTagText, { color: tagColor.text }]}>
        {label}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  categoryTag: {
    alignSelf: 'flex-start',
    paddingHorizontal: wp(2),
    paddingVertical: hp(0.375),
    borderRadius: wp(1.5),
    marginBottom: hp(0.25),
  },
  categoryTagText: {
    fontSize: wp(2.5),
    fontWeight: '700',
    letterSpacing: 0.4,
    textTransform: 'uppercase',
  },
});

export default CategoryTag;
