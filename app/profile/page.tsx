"use client";
import Spinner from "@/components/spinner";
import { useUser } from "@clerk/nextjs";
import { Toaster } from "react-hot-toast";

export default function Profile() {
  const { isLoaded, isSignedIn, user } = useUser();

  if (!isLoaded) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Spinner /> <span> Loading...</span>
      </div>
    );
  }
  if (!isSignedIn) {
    return (
      <div>
        <p>Please sign-in to view your profile</p>
      </div>
    );
  }

  return (
    <div>
      <Toaster position="top-center" />
      <div>Profile Page</div>
    </div>
  );
}
