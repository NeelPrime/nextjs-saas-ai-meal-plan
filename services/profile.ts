import { ApiResponse } from "@/types/api";

export async function createProfileRequest() {
  const resp = await fetch("/api/create-profile", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
  });
  const data = await resp.json();
  return data as ApiResponse;
}

