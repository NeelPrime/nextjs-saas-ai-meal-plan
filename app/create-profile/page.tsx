"use client";

import { useUser } from "@clerk/nextjs";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

type ApiResponse = {
  message: string;
  error?: string;
};

async function CreateProfileRequest() {
  const resp = await fetch("/api/create-profile", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
  });
  const data = await resp.json();
  return data as ApiResponse;
}

export default function CreateProfile() {
  const { isLoaded, isSignedIn } = useUser();
  const router = useRouter();
  const { mutate, isPending } = useMutation<ApiResponse, Error>({
    mutationFn: CreateProfileRequest,
    onSuccess: () => {
      router.push("/subscribe");
    },
    onError: (error) => {
      console.log(error);
    },
  });
  useEffect(() => {
    if (isLoaded && isSignedIn && !isPending) {
      mutate();
    }
  }, [isLoaded, isSignedIn]);

  return <div>Profile is creating....</div>;
}
