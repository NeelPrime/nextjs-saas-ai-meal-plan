"use client";
import Spinner from "@/components/spinner";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
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
    <div className="min-h-screen flex items-center justify-center bg-emerald-100 p-4">
      <Toaster position="top-center" />{" "}
      {/* Optional: For toast notifications */}
      <div className="w-full max-w-5xl bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/3 p-6 bg-emerald-500 text-white flex flex-col items-center">
            <Image
              src={user.imageUrl || "/default-avatar.png"}
              alt="User Avatar"
              width={100}
              height={100}
              className="rounded-full mb-4"
            />
            <h1 className="text-2xl font-bold mb-2">
              {user.firstName} {user.lastName}
            </h1>
            <p className="mb-4">{user.primaryEmailAddress?.emailAddress}</p>
          </div>
        </div>
        <div className="w-full md:w-2/3 p-6 bg-gray-50">
          <h2 className="text-2xl font-bold mb-6 text-emerald-700">
            Profile Page{" "}
          </h2>
        </div>
      </div>
    </div>
  );
}
