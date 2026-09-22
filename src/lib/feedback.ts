export function feedbackHref(
  path: string,
  kind: "ok" | "error",
  code: string,
) {
  const [pathname, search = ""] = path.split("?");
  const params = new URLSearchParams(search);
  params.set(kind, code);
  params.set(
    "n",
    `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`,
  );
  const query = params.toString();
  return query ? `${pathname}?${query}` : pathname;
}
