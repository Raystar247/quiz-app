import type React from "react";

export const useUserController = <T extends Record<string, any>>(form: T) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form dubmitted with data:', form);
  };
  return { handleSubmit };
};