import type React from "react";
import type { ApiResponse } from "../../../api/types/apiTypes";
import type { User } from "../types";
import { apiClient } from "../../../api/apiClient";

export const useUserController = <T extends Record<string, any>>(form: T) => {
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form dubmitted with data:', form);
    // ここにサインインロジックを追加
    const result: ApiResponse<User[]> = await apiClient.get<User[]>('/user', {
      params: { email: form.email }
    });
    if (result.error) {
      console.error('Error fetching user:', result.error);
      return;
    }
    console.log('fetched', result.data[0]);
    if (form.password == result.data[0].password) {
      console.log('Sign-in successful for user:', result.data[0]);
    } else {
      console.log('Invalid password');
      console.log(`${result.data[0].password} vs ${form.password}`);
    }

  };
  return { handleSubmit };
};