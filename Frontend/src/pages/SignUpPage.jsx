import { useState } from "react";
import { ShipWheelIcon } from "lucide-react";
import { Link } from "react-router-dom";

const SignUpPage = () => {
  const [signupData, setSignupData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const handleSignup = (e) => {
    e.preventDefault();
    console.log(signupData);
  };

  return (
    <div
      className="h-screen flex items-center justify-center p-6"
      style={{ backgroundColor: "#F3E7D9" }}
    >
      <div className="flex w-full max-w-5xl rounded-2xl shadow-lg overflow-hidden">

        {/* LEFT SIDE */}
        <div className="w-full lg:w-1/2 p-10 bg-[#F3E7D9]">

          {/* LOGO */}
          <div className="flex items-center gap-2 mb-8">
            <ShipWheelIcon size={28} color="#544349" />
            <h1 className="text-xl font-semibold text-[#544349]">
              Streamify
            </h1>
          </div>

          {/* TITLE */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-[#2f2529]">
              Create an Account
            </h2>
            <p className="text-sm text-[#7a6a70]">
              Simple, clean, and designed for focus
            </p>
          </div>

          {/* FORM */}
          <form onSubmit={handleSignup} className="space-y-5">

            <input
              type="text"
              placeholder="Full Name"
              className="w-full px-4 py-2 rounded-lg border outline-none focus:ring-2 transition"
              style={{
                borderColor: "#d8c9bb",
                backgroundColor: "#ffffff",
                color: "#2f2529",
              }}
              value={signupData.fullName}
              onChange={(e) =>
                setSignupData({ ...signupData, fullName: e.target.value })
              }
            />

            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-2 rounded-lg border outline-none focus:ring-2 transition"
              style={{
                borderColor: "#d8c9bb",
                backgroundColor: "#ffffff",
                color: "#2f2529",
              }}
              value={signupData.email}
              onChange={(e) =>
                setSignupData({ ...signupData, email: e.target.value })
              }
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-2 rounded-lg border outline-none focus:ring-2 transition"
              style={{
                borderColor: "#d8c9bb",
                backgroundColor: "#ffffff",
                color: "#2f2529",
              }}
              value={signupData.password}
              onChange={(e) =>
                setSignupData({ ...signupData, password: e.target.value })
              }
            />

            {/* TERMS */}
            <label className="flex items-center gap-2 text-xs text-[#7a6a70]">
              <input type="checkbox" />
              I agree to the terms and privacy policy
            </label>

            {/* BUTTON */}
            <button
              className="w-full py-2 rounded-lg font-medium transition hover:opacity-90"
              style={{
                backgroundColor: "#544349",
                color: "#F3E7D9",
              }}
            >
              Create Account
            </button>

            {/* LOGIN */}
            <p className="text-sm text-center text-[#7a6a70]">
              Already have an account?{" "}
              <Link to="/login" className="text-[#544349] font-medium">
                Sign in
              </Link>
            </p>

          </form>
        </div>

        {/* RIGHT SIDE */}
        <div
          className="hidden lg:flex w-1/2 items-center justify-center p-10"
          style={{ backgroundColor: "#544349" }}
        >
          <div className="text-center">
            <img src="Welcome-bro.png" className="w-64 mx-auto mb-6" />
            <h2 className="text-lg font-semibold text-[#F3E7D9]">
              Connect with language partners
            </h2>
            <p className="text-sm text-[#e6dcd2] mt-2">
              Practice conversations and grow your skills together
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default SignUpPage;