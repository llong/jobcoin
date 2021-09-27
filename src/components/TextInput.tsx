import React from 'react';
import {TextInput, StyleSheet} from 'react-native';

interface ITextInput {
  value?: string;
  placeholder?: string;
  onChangeText?: (arg1: any) => void;
}

const CustomTextInput: React.FC<ITextInput> = props => {
  return <TextInput {...props} style={styles.textInput} />;
};

const styles = StyleSheet.create({
  textInput: {
    borderWidth: 1,
    borderColor: '#999',
    paddingVertical: 4,
    paddingHorizontal: 12,
    marginVertical: 8,
  },
});

export default CustomTextInput;
