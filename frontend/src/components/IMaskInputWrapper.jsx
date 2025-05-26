// src/components/IMaskInputWrapper.jsx
import React from "react";
import { IMaskInput } from "react-imask";

const IMaskInputWrapper = React.forwardRef(function IMaskInputWrapper(
  props,
  ref
) {
  const { onChange, onBlur, ...other } = props;

  return (
    <IMaskInput
      {...other}
      inputRef={ref}
      // Aceita o valor e envia para o RHF
      onAccept={(value) => {
        onChange(value);
      }}
      onBlur={onBlur}
      overwrite
    />
  );
});

export default IMaskInputWrapper;
