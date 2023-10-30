import React from 'react';
import { TextField } from "@mui/material";
import { Controller, Control, FieldValues, FieldPath, FieldError, FieldErrorsImpl } from "react-hook-form";
import {theme} from "../styles/colors"
const styles = {
  textField: {
    backgroundColor: theme.dark.BACKGROUND,
    color: theme.dark.TERTIARY,
    borderRadius: '4px',
    '& .MuiInputLabel-root': {
      color: theme.dark.TERTIARY,
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: theme.dark.SECONDARY,
      },
      '&:hover fieldset': {
        borderColor: theme.dark.SECONDARY,
      },
      '&.Mui-focused fieldset': {
        borderColor: theme.dark.SECONDARY,
      },
    },
    '& .MuiFormHelperText-root': {
      color: theme.dark.TERTIARY,
    },
    '& .MuiInputBase-input': {
      color: theme.dark.TERTIARY,
    },
    marginBottom: '20px',
  },
};


interface TextFieldControllerProps<TFieldValues extends FieldValues> {
  name: FieldPath<TFieldValues>;
  label: string;
  type?: React.InputHTMLAttributes<unknown>['type'];
  control: Control<TFieldValues>;
  errors: FieldErrorsImpl<TFieldValues>;
}

const TextFieldController = <TFieldValues extends FieldValues>({
  name,
  label,
  type = 'text',
  control,
  errors
}: TextFieldControllerProps<TFieldValues>) => {
  // Ensure the error message is a string, or undefined if not present
  const errorMessage: string | undefined = typeof errors[name]?.message === 'string'
    ? errors[name]?.message as string
    : undefined;

    return (
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label={label}
            type={type}
            variant="outlined"
            error={Boolean(errors[name])}
            helperText={errorMessage}
            fullWidth
            sx={styles.textField}
          />
        )}
      />
    );
 }
export default TextFieldController;

