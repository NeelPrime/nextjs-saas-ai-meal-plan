"use client";

import { createProfileRequest } from "@/services/profile";
import { ApiResponse } from "@/types/api";
import { useUser } from "@clerk/nextjs";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function CreateProfile() {
  const { isLoaded, isSignedIn } = useUser();
  const router = useRouter();
  const { mutate, isPending } = useMutation<ApiResponse, Error>({
    mutationFn: createProfileRequest,
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
