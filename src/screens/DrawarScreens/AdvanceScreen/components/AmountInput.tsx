// components/AmountInput.tsx
import React, { useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Colors, hp, wp } from '../../../../constants';

interface AmountInputProps {
  amountText: string;
  isOverLimit: boolean;
  onAmountChange: (text: string) => void;
}

const AmountInput: React.FC<AmountInputProps> = ({
  amountText,
  isOverLimit,
  onAmountChange,
}) => {
  const inputRef = useRef<TextInput>(null);

  return (
    <TouchableOpacity
      style={[styles.amountInputWrap, isOverLimit && styles.amountInputError]}
      onPress={() => inputRef.current?.focus()}
      activeOpacity={1}
    >
      <View style={styles.amountCurrencyTag}>
        <Text style={styles.amountCurrencyText}>EGP</Text>
      </View>
      <TextInput
        ref={inputRef}
        style={styles.amountInput}
        value={amountText}
        onChangeText={onAmountChange}
        keyboardType="numeric"
        placeholder="0"
        placeholderTextColor={Colors.gray7}
        maxLength={6}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  amountInputWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: wp('4%'),
    borderWidth: hp('0.2%'),
    borderColor: Colors.border,
    overflow: 'hidden',
    marginBottom: hp('1.5%'),
  },
  amountInputError: {
    borderColor: '#e06b6b',
    backgroundColor: '#fff5f5',
  },
  amountCurrencyTag: {
    backgroundColor: Colors.surface2,
    paddingHorizontal: wp('3.5%'),
    marginStart: wp(4),
    paddingVertical: hp('2%'),
    borderRightWidth: hp('0.12%'),
    borderRightColor: Colors.border,
    borderRadius: 8,
  },
  amountCurrencyText: {
    fontSize: wp('3.5%'),
    fontWeight: '700',
    color: Colors.primaryDark,
    letterSpacing: 0.5,
  },
  amountInput: {
    flex: 1,
    fontSize: wp('7%'),
    fontWeight: '800',
    color: Colors.text,
    paddingHorizontal: wp('4%'),
    paddingVertical: hp('1.75%'),
    letterSpacing: -0.5,
  },
});

export default AmountInput;
