import { Fonts } from '../constants/Fonts';

export const getFontFamily = (fontWeightKey: string) => {
  const fontEntry = Fonts[fontWeightKey as keyof typeof Fonts];

  if (fontEntry) {
    return fontEntry;
  }

  return Fonts.Regular;
};
