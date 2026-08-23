import { FiUser } from "react-icons/fi";

import { useAuth } from "../context/AuthContext";
import LogoutButton from "./LogoutButton";

const AccountSection = () => {
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  return (
    <section className="
      overflow-hidden
      rounded-3xl
      border border-slate-200/80
      bg-white
      shadow-[0_8px_30px_rgba(15,23,42,0.04)]
    ">
      <div className="
        flex items-start gap-4
        border-b border-slate-100
        bg-gradient-to-r
        from-white
        to-slate-50/50
        px-5 py-5
        sm:px-7 sm:py-6
      ">
        <div className="
          flex h-11 w-11 shrink-0
          items-center justify-center
          rounded-2xl
          bg-blue-50
          text-blue-500
        ">
          <FiUser size={19} />
        </div>

        <div className="min-w-0">
          <h2 className="
            text-base font-semibold
            text-slate-800
          ">
            Account
          </h2>

          <p className="
            mt-1 text-xs
            leading-5
            text-slate-400
          ">
            Your BLYNK'N account and session.
          </p>
        </div>
      </div>

      <div className="p-5 sm:p-7">
        <div className="
          rounded-2xl
          border border-slate-100
          bg-slate-50
          p-4
        ">
          <p className="
            truncate
            text-sm font-semibold
            text-slate-700
          ">
            {user.name}
          </p>

          <p className="
            mt-1 truncate
            text-sm
            text-slate-400
          ">
            {user.email}
          </p>
        </div>

        <div className="mt-4">
          <LogoutButton />
        </div>
      </div>
    </section>
  );
};

export default AccountSection;