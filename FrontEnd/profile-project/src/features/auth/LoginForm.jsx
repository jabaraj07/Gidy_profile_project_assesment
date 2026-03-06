
import { useState } from "react";
import { useForm } from "react-hook-form";
import { loginUser } from "../../api/userAuth";
import { useAuth } from "../../context/authContext";
import { useNavigate } from "react-router-dom";

// ── Floating Label Input ──────────────────────────────────────────────────────
const FloatingInput = ({ label, type: initialType, name, register, rules, errors }) => {
  const [focused, setFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = initialType === "password";
  const inputType = isPassword ? (showPassword ? "text" : "password") : initialType;
  const isFloating = focused || hasValue;

  const { onChange, onBlur, ref, ...rest } = register(name, rules);

  return (
    <div style={{ position: "relative", marginBottom: "6px" }}>
      <div
        style={{
          position: "relative",
          border: `1.5px solid ${errors?.[name] ? "#d32f2f" : focused ? "#4285f4" : "#dadce0"}`,
          borderRadius: "6px",
          background: "#fff",
          transition: "border-color 0.2s",
        }}
      >
        {/* Floating Label */}
        <label
          htmlFor={name}
          style={{
            position: "absolute",
            left: "13px",
            top: isFloating ? "-10px" : "50%",
            transform: isFloating ? "translateY(0) scale(0.82)" : "translateY(-50%) scale(1)",
            transformOrigin: "left center",
            color: errors?.[name] ? "#d32f2f" : focused ? "#4285f4" : "#80868b",
            fontSize: "15px",
            fontFamily: "'Google Sans', 'Roboto', sans-serif",
            fontWeight: 400,
            pointerEvents: "none",
            transition: "top 0.18s ease, transform 0.18s ease, color 0.18s ease, font-size 0.18s ease",
            background: isFloating ? "#fff" : "transparent",
            padding: isFloating ? "0 4px" : "0",
            zIndex: 1,
            letterSpacing: "0.01em",
          }}
        >
          {label}
          {rules?.required && (
            <span style={{ marginLeft: "1px", color: errors?.[name] ? "#d32f2f" : focused ? "#4285f4" : "#80868b" }}>*</span>
          )}
        </label>

        {/* Input */}
        <input
          id={name}
          type={inputType}
          ref={ref}
          {...rest}
          onChange={(e) => {
            setHasValue(e.target.value.length > 0);
            onChange(e);
          }}
          onFocus={() => setFocused(true)}
          onBlur={(e) => {
            setFocused(false);
            onBlur(e);
          }}
          style={{
            width: "100%",
            padding: "16px 44px 16px 13px",
            border: "none",
            outline: "none",
            background: "transparent",
            fontSize: "15px",
            fontFamily: "'Google Sans', 'Roboto', sans-serif",
            color: "#202124",
            boxSizing: "border-box",
            borderRadius: "6px",
          }}
        />

        {/* Password toggle */}
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword((p) => !p)}
            style={{
              position: "absolute",
              right: "12px",
              top: "50%",
              transform: "translateY(-50%)",
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "4px",
              color: "#5f6368",
              display: "flex",
              alignItems: "center",
            }}
            tabIndex={-1}
          >
            {showPassword ? (
              // Eye-off icon
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94"/>
                <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19"/>
                <line x1="1" y1="1" x2="23" y2="23"/>
              </svg>
            ) : (
              // Eye icon
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M1 12S5 4 12 4s11 8 11 8-4 8-11 8S1 12 1 12z"/>
                <circle cx="12" cy="12" r="3"/>
              </svg>
            )}
          </button>
        )}
      </div>

      {/* Error message */}
      {errors?.[name] && (
        <p style={{
          margin: "4px 0 0 14px",
          fontSize: "12px",
          color: "#d32f2f",
          fontFamily: "'Google Sans', 'Roboto', sans-serif",
        }}>
          {errors[name].message}
        </p>
      )}
    </div>
  );
};

// ── LoginForm ─────────────────────────────────────────────────────────────────
const LoginForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ mode: "onChange" });

  const { setUser } = useAuth();
  const navigate = useNavigate()
  const onSubmit = async (data) => {
  //   console.log("Login data:", data);
  //  await loginUser(data)
  //   reset();
  try {
     const response = await loginUser(data);
      setUser(response.data.User);

      const loggedUser = response.data.User;
      // console.log(loggedUser);
      reset();

      if (!loggedUser.isProfileComplete) {
        navigate("/profile");
      } else {
        navigate("/user_profile");
      }
  } catch (error) {
      console.error("Error While Login:", error);
  }
  };

  return (
    <>
      {/* Google Font import */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Google+Sans:wght@400;500;600&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        body {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #f0f4f8;
          font-family: 'Google Sans', 'Roboto', sans-serif;
        }

        .login-card {
          background: #fff;
          border-radius: 12px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.10), 0 0 0 1px rgba(0,0,0,0.04);
          padding: 48px 40px 40px;
          width: 100%;
          max-width: 400px;
        }

        .logo-wrap {
          display: flex;
          justify-content: center;
          margin-bottom: 20px;
        }

        .logo-svg {
          width: 44px;
          height: 44px;
        }

        .card-title {
          text-align: center;
          font-size: 26px;
          font-weight: 500;
          color: #202124;
          margin-bottom: 8px;
          letter-spacing: -0.3px;
        }

        .card-subtitle {
          text-align: center;
          font-size: 15px;
          color: #5f6368;
          margin-bottom: 32px;
        }

        .form-fields {
          display: flex;
          flex-direction: column;
          gap: 20px;
          margin-bottom: 10px;
        }

        .forgot-link {
          display: block;
          text-align: left;
          margin: 10px 0 28px;
          color: #4285f4;
          font-size: 14px;
          font-weight: 500;
          text-decoration: none;
          cursor: pointer;
          background: none;
          border: none;
          font-family: inherit;
          padding: 0;
        }
        .forgot-link:hover { text-decoration: underline; }

        .continue-btn {
          width: 100%;
          padding: 14px;
          background: #4285f4;
          color: #fff;
          border: none;
          border-radius: 6px;
          font-size: 15px;
          font-weight: 500;
          font-family: 'Google Sans', 'Roboto', sans-serif;
          cursor: pointer;
          letter-spacing: 0.01em;
          transition: background 0.18s, box-shadow 0.18s;
          box-shadow: 0 1px 3px rgba(66,133,244,0.3);
        }
        .continue-btn:hover:not(:disabled) {
          background: #3574e2;
          box-shadow: 0 2px 8px rgba(66,133,244,0.4);
        }
        .continue-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .signup-row {
          text-align: center;
          margin-top: 24px;
          font-size: 14px;
          color: #5f6368;
        }
        .signup-row a {
          color: #4285f4;
          font-weight: 500;
          text-decoration: none;
          margin-left: 4px;
        }
        .signup-row a:hover { text-decoration: underline; }
      `}</style>

      <div className="login-card">
        {/* Logo */}
        <div className="logo-wrap">
          <svg className="logo-svg" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22 6L36 16V28L22 38L8 28V16L22 6Z" stroke="#5f6368" strokeWidth="2" fill="none"/>
            <path d="M16 22L20 26L28 18" stroke="#4285f4" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>

        <h1 className="card-title">Welcome</h1>
        <p className="card-subtitle">Log in to GIDY!</p>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="form-fields">
            <FloatingInput
              label="Email address"
              type="email"
              name="email"
              register={register}
              rules={{
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: "Invalid email format",
                },
              }}
              errors={errors}
            />

            <FloatingInput
              label="Password"
              type="password"
              name="password"
              register={register}
              rules={{ required: "Password is required" }}
              errors={errors}
            />
          </div>

          <button type="button" className="forgot-link">Forgot password?</button>

          <button type="submit" className="continue-btn" disabled={isSubmitting}>
            {isSubmitting ? "Signing in…" : "Continue"}
          </button>
        </form>

        <div className="signup-row">
          Don't have an account?<a href="/signup">Sign up</a>
        </div>
      </div>
    </>
  );
};

export default LoginForm;