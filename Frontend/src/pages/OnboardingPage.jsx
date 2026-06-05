import { useEffect, useState } from "react";
import useAuthUser from "../hooks/useAuthUser";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { completeOnboarding } from "../lib/api";
import {
  LoaderIcon,
  MapPinIcon,
  ShipWheelIcon,
  ShuffleIcon,
  CameraIcon,
} from "lucide-react";
import { LANGUAGES } from "../constants";

const OnboardingPage = () => {
  const { authUser } = useAuthUser();
  const queryClient = useQueryClient();

  const [formState, setFormState] = useState({
    fullName: "",
    bio: "",
    nativeLanguage: "",
    learningLanguage: "",
    location: "",
    profilePic: "",
  });

  //  sync authUser safely AFTER load
  useEffect(() => {
    if (authUser) {
      setFormState({
        fullName: authUser.fullName || "",
        bio: authUser.bio || "",
        nativeLanguage: authUser.nativeLanguage || "",
        learningLanguage: authUser.learningLanguage || "",
        location: authUser.location || "",
        profilePic: authUser.profilePic || "",
      });
    }
  }, [authUser]);

  const { mutate: onboardingMutation, isPending } = useMutation({
    mutationFn: completeOnboarding,
    onSuccess: () => {
      toast.success("Profile onboarded successfully");
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Something went wrong");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onboardingMutation(formState);
  };

  // ✅ FIXED AVATAR GENERATOR (reliable + cache-safe)
  const handleRandomAvatar = () => {
    const seed = `${authUser?._id || "user"}-${Date.now()}-${Math.random()}`;

    const randomAvatar = `https://api.dicebear.com/9.x/adventurer/png?seed=${seed}&t=${Date.now()}`;

    setFormState((prev) => ({
      ...prev,
      profilePic: randomAvatar,
    }));

    toast.success("Random profile picture generated!");
  };

  return (
    <div
      className="min-h-screen bg-base-100 flex items-center justify-center p-4"
      data-theme="light"
    >
      <div className="card bg-base-200 w-full max-w-3xl shadow-xl">
        <div className="card-body p-6 sm:p-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6">
            Complete Your Profile
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">

            {/* PROFILE PIC */}
            <div className="flex flex-col items-center space-y-4">
              <div className="size-32 rounded-full bg-base-300 overflow-hidden">
                {formState.profilePic ? (
                  <img
                    key={formState.profilePic}
                    src={formState.profilePic}
                    alt="Profile Preview"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src =
                        "https://api.dicebear.com/9.x/adventurer/png?seed=fallback";
                    }}
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <CameraIcon className="size-12 text-base-content opacity-40" />
                  </div>
                )}
              </div>

              <button
                type="button"
                onClick={handleRandomAvatar}
                className="btn btn-accent"
              >
                <ShuffleIcon className="size-4 mr-2" />
                Generate Random Avatar
              </button>
            </div>

            {/* FULL NAME */}
            <input
              type="text"
              value={formState.fullName}
              onChange={(e) =>
                setFormState((prev) => ({
                  ...prev,
                  fullName: e.target.value,
                }))
              }
              className="input input-bordered w-full"
              placeholder="Full Name"
            />

            {/* BIO */}
            <textarea
              value={formState.bio}
              onChange={(e) =>
                setFormState((prev) => ({
                  ...prev,
                  bio: e.target.value,
                }))
              }
              className="textarea textarea-bordered w-full h-24"
              placeholder="Bio"
            />

            {/* LANGUAGES */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <select
                value={formState.nativeLanguage}
                onChange={(e) =>
                  setFormState((prev) => ({
                    ...prev,
                    nativeLanguage: e.target.value,
                  }))
                }
                className="select select-bordered w-full"
              >
                <option value="">Native Language</option>
                {LANGUAGES.map((lang) => (
                  <option key={lang} value={lang.toLowerCase()}>
                    {lang}
                  </option>
                ))}
              </select>

              <select
                value={formState.learningLanguage}
                onChange={(e) =>
                  setFormState((prev) => ({
                    ...prev,
                    learningLanguage: e.target.value,
                  }))
                }
                className="select select-bordered w-full"
              >
                <option value="">Learning Language</option>
                {LANGUAGES.map((lang) => (
                  <option key={lang} value={lang.toLowerCase()}>
                    {lang}
                  </option>
                ))}
              </select>
            </div>

            {/* LOCATION */}
            <div className="relative">
              <MapPinIcon className="absolute left-3 top-3 size-5 opacity-60" />
              <input
                type="text"
                value={formState.location}
                onChange={(e) =>
                  setFormState((prev) => ({
                    ...prev,
                    location: e.target.value,
                  }))
                }
                className="input input-bordered w-full pl-10"
                placeholder="Location"
              />
            </div>

            {/* SUBMIT */}
            <button
              type="submit"
              disabled={isPending}
              className="btn btn-primary w-full"
            >
              {isPending ? (
                <>
                  <LoaderIcon className="animate-spin size-5 mr-2" />
                  Saving...
                </>
              ) : (
                <>
                  <ShipWheelIcon className="size-5 mr-2" />
                  Complete Onboarding
                </>
              )}
            </button>

          </form>
        </div>
      </div>
    </div>
  );
};

export default OnboardingPage;
