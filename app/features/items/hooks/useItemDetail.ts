import { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getItemQueryOptions, updateItem } from "../api";
import { itemKeys } from "../query-keys";
import { isAxiosError } from "axios";
import type { CreateItemParams } from "../types";

export function useItemDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  if (!id) throw new Error("IDが指定されていません");

  const { data: item } = useQuery(getItemQueryOptions(id));
  const queryClient = useQueryClient();

  const [isEditing, setIsEditing] = useState(false);

  const mutation = useMutation({
    mutationFn: (data: CreateItemParams) => updateItem(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: itemKeys.all });
      setIsEditing(false);
    },
    throwOnError: (error) => {
      if (isAxiosError(error) && error.response?.status === 400) {
        return false;
      }
      return true;
    },
  });

  const { mutateAsync, isPending, error } = mutation;

  return {
    item,
    isEditing,
    isSubmitting: isPending,
    handleEditStart: () => setIsEditing(true),
    handleEditCancel: () => setIsEditing(false),
    mutateAsync,
    handleBack: () => navigate("/items"),
    errorMessage: error?.toString(),
  };
}

