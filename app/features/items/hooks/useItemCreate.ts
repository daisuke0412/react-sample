import { useActionData, useNavigation } from "react-router";
import type { ActionResult } from "../types";

export function useItemCreate() {
  const actionData = useActionData() as ActionResult | undefined;
  const navigation = useNavigation();
  
  const isSubmitting = navigation.state === "submitting";
  const errorMessage = actionData?.success === false ? actionData?.message : null;

  return {
    errorMessage,
    isSubmitting,
  };
}