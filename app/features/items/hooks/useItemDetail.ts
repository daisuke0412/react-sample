import { useState, useEffect } from "react";
import { useLoaderData, useActionData, useNavigation } from "react-router";
import type { useItemDetailRouteHandlers } from "./useItemDetailRoute";
import type { ActionResult } from "../types";

export function useItemDetail() {
  const { item } = useLoaderData<typeof useItemDetailRouteHandlers.clientLoader>();
  const actionData = useActionData() as ActionResult | undefined;
  const navigation = useNavigation();
  
  const [isEditing, setIsEditing] = useState(false);

  // 更新成功時に編集モードを終了して閲覧モードに戻る
  useEffect(() => {
    if (actionData?.success) {
      setIsEditing(false);
    }
  }, [actionData]);

  const handleEditStart = () => setIsEditing(true);
  const handleEditCancel = () => setIsEditing(false);

  const isSubmitting = navigation.state === "submitting";

  return {
    item,
    isEditing,
    isSubmitting,
    handleEditStart,
    handleEditCancel,
    errorMessage: actionData?.success === false ? actionData.message : undefined,
  };
}