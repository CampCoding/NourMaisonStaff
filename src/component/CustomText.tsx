import { TextProps, StyleSheet, Text } from 'react-native';
import { Fonts } from '../constants/Fonts';
import { Colors } from '../constants/Colors';
import { getFontFamily } from '../utiles/getFontFamily';

export interface CustomTextProps {
  text?: string | undefined;
}

export const CustomText = ({
  children,
  text,
  style,
  ...props
}: CustomTextProps & TextProps) => {
  const merged = Array.isArray(style)
    ? style?.reduce((acc: any, obj: any) => ({ ...acc, ...obj }), {})
    : style;
  const getStyleFontFamily = (style: any) => {
    if (Array.isArray(style)) {
      const found = style.find(s => s?.fontFamily);
      return found?.fontFamily || 'Regular';
    }
    return style?.fontFamily || 'Regular';
  };

  const fontWeightKey = getStyleFontFamily(merged);
  const fontFamily = getFontFamily(fontWeightKey);

  return (
    <Text
      allowFontScaling={false}
      style={[styles.baseText, style, { fontFamily: fontFamily }]}
      {...props}
    >
      {children}
      {text}
    </Text>
  );
};

export const styles = StyleSheet.create({
  baseText: {
    fontFamily: Fonts.Regular,
    color: Colors.black,
    textAlign: 'left',
  },
  iosText: {
    textAlign: 'left',
  },
});
