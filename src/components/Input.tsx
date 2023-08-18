import { GenericView } from '@/assets/css';
import React, { useState } from 'react';
import { TextInput } from 'react-native-paper';
import { TouchableWithoutFeedback, Keyboard } from 'react-native';
import { colors, dWidth } from '@/constants';
import { transparent } from 'react-native-paper/lib/typescript/src/styles/themes/v2/colors';
import { Colors } from 'react-native/Libraries/NewAppScreen';
interface Props {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  iconSize?: number;
  right?: boolean;
  keyboardType?: any;
}

const Input: React.FC<Props> = ({
  label,
  value,
  onChangeText,
  secureTextEntry = false,
  iconSize = 25,
  right,
  keyboardType = 'default',
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <GenericView padding={dWidth * 0.025}>
        <TextInput
        cursorColor='red'
        theme={{colors:{primary:colors.primary, }}}
          style={{ backgroundColor: colors.primaryLight }}
          underlineColor ={colors.primary}
          activeUnderlineColor={colors.primaryDark}
          textColor={colors.primary}
          label={label}
          onChangeText={onChangeText}
          value={value}
          secureTextEntry={secureTextEntry && !showPassword}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          keyboardType={keyboardType}
          right={
            right && (
              <TextInput.Icon icon={showPassword ? 'eye-off' : 'eye'} size={iconSize}  onPress={togglePasswordVisibility} />
            )
          }
        />
      </GenericView>
    </TouchableWithoutFeedback >
  );
};

export default Input;