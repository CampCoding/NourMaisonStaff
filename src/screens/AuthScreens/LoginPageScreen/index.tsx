import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
  Image,
} from 'react-native';
import { Colors, hp, Icons, Images, wp } from '../../../constants';
import { useNavigation } from '@react-navigation/native';
import { NavigationProp } from '../../../navigation/type';
import ScreenNames from '../../../navigation/ScreenNames';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const navigation = useNavigation<NavigationProp>();

  const handleLogin = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
    navigation.navigate(ScreenNames.DrawerTabs);
  };

  return (
    <KeyboardAvoidingView
      style={styles.root}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <StatusBar barStyle="dark-content" backgroundColor={Colors.bg} />
      <ScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Image
            source={Images.Logo}
            resizeMode="cover"
            style={{ width: wp(50), height: wp(50) }}
          />
        </View>

        <View style={styles.dividerRow}>
          <View style={styles.dividerLine} />
          <View style={styles.dividerDot} />
          <View style={styles.dividerLine} />
        </View>

        <View style={styles.form}>
          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Email address</Text>
            <View
              style={[
                styles.inputWrapper,
                emailFocused && styles.inputWrapperFocused,
              ]}
            >
              <Icons.Email
                height={wp(5)}
                width={wp(5)}
                color={Colors.primary}
              />
              <TextInput
                style={styles.input}
                placeholder="you@example.com"
                placeholderTextColor={Colors.textMuted}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                onFocus={() => setEmailFocused(true)}
                onBlur={() => setEmailFocused(false)}
              />
            </View>
          </View>

          <View style={styles.fieldGroup}>
            <View style={styles.labelRow}>
              <Text style={styles.label}>Password</Text>
            </View>
            <View
              style={[
                styles.inputWrapper,
                passwordFocused && styles.inputWrapperFocused,
              ]}
            >
              <Icons.Lock height={wp(5)} width={wp(5)} color={Colors.primary} />
              <TextInput
                style={styles.input}
                placeholder="••••••••"
                placeholderTextColor={Colors.textMuted}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!passwordVisible}
                onFocus={() => setPasswordFocused(true)}
                onBlur={() => setPasswordFocused(false)}
              />
              <TouchableOpacity
                onPress={() => setPasswordVisible(!passwordVisible)}
                style={styles.eyeButton}
              >
                {passwordVisible ? (
                  <Icons.ClosedEye
                    height={wp(5)}
                    width={wp(5)}
                    color={Colors.primary}
                  />
                ) : (
                  <Icons.OpenedEye
                    height={wp(5)}
                    width={wp(5)}
                    color={Colors.primary}
                  />
                )}
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity
            style={[styles.loginButton, loading && styles.loginButtonLoading]}
            onPress={handleLogin}
            activeOpacity={0.85}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color={Colors.white} size="small" />
            ) : (
              <Text style={styles.loginButtonText}>Sign In</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.bg,
  },
  scroll: {
    flexGrow: 1,
    paddingBottom: hp(4),
    paddingTop: hp(6),
  },
  header: {
    alignItems: 'center',
    paddingTop: hp(6.5),
    paddingBottom: hp(3.5),
    paddingHorizontal: wp(8),
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp(8),
    marginBottom: hp(4),
  },
  dividerLine: {
    flex: 1,
    height: hp(0.125),
    backgroundColor: Colors.border,
  },
  dividerDot: {
    width: wp(1.25),
    height: wp(1.25),
    borderRadius: wp(0.625),
    backgroundColor: Colors.primaryLight,
    marginHorizontal: wp(2),
  },
  form: {
    paddingHorizontal: wp(7),
  },
  fieldGroup: {
    marginBottom: hp(2.5),
  },
  label: {
    fontSize: wp(3.25),
    fontWeight: '600',
    color: Colors.textMuted,
    marginBottom: hp(1),
    letterSpacing: 0.3,
    textTransform: 'uppercase',
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface2,
    borderRadius: wp(2.5),
    borderWidth: wp(0.375),
    borderColor: Colors.border,
    paddingHorizontal: wp(3.5),
    paddingVertical: hp(1.75),
  },
  inputWrapperFocused: {
    borderColor: Colors.primary,
    backgroundColor: Colors.white,
  },
  input: {
    flex: 1,
    fontSize: wp(4),
    color: Colors.text,
    padding: 0,
    paddingLeft: wp(3),
  },
  eyeButton: {
    paddingLeft: wp(2.5),
  },
  loginButton: {
    backgroundColor: Colors.primary,
    borderRadius: wp(2.5),
    paddingVertical: hp(1.875),
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.primaryDark,
    shadowOffset: { width: 0, height: hp(0.375) },
    shadowOpacity: 0.3,
    shadowRadius: wp(1.5),
    elevation: 4,
    marginBottom: hp(3.5),
  },
  loginButtonLoading: {
    backgroundColor: Colors.primaryDark,
  },
  loginButtonText: {
    color: Colors.white,
    fontSize: wp(4),
    fontWeight: '700',
    letterSpacing: 0.5,
  },
});

export default LoginScreen;
