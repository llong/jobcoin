import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';

interface IButton {
  label: string;
  buttonStyle?: {};
  textStyle?: {};
  onPress: () => void;
  disabled?: boolean;
}

const Button: React.FC<IButton> = ({
  label,
  buttonStyle,
  textStyle,
  disabled,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={[styles.buttonStyle, buttonStyle]}
      disabled={disabled}
      onPress={onPress}>
      <Text style={[styles.textStyle, textStyle]}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonStyle: {
    backgroundColor: '#006af7',
    alignItems: 'center',
    justifyContent: 'center',
    height: 32,
    borderRadius: 8,
  },
  textStyle: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default Button;
