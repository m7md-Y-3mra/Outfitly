export function toStatus(visibility: string) {
  if (visibility === "public") return "Approved";
  if (visibility === "private") return "Private";
  if (visibility === "friends") return "Friends";

  return "Pending";
}
