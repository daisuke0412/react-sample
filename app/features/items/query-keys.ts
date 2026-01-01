export const itemKeys = {
  all: ["items"] as const,
  list: (name?: string) => [...itemKeys.all, "list", { name }] as const,
  detail: (id: string) => [...itemKeys.all, "detail", id] as const,
};