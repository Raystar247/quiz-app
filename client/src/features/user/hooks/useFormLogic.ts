import React, { useState } from "react";

export const useFormLogic = <T extends object>(initialState: T) => {
  const [form, setForm] = useState(initialState);

  const changeForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  return { form, changeForm };
};