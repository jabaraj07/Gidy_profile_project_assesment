import { useForm } from "react-hook-form";
import { loginUser } from "../../api/authApi";
import { useAuth } from "../../context/authContext";
import { Link, useNavigate } from "react-router-dom";
import "./LoginForm.css";
import FloatingInput from "./FloatingInput";
import Logo from "../../components/icons/Logo";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
    setError,
    clearErrors,
  } = useForm({ mode: "onChange" });

  const { setUser } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await loginUser(data);
      setUser(response.data.User);

      const loggedUser = response.data.User;
      reset();

      if (!loggedUser.isProfileComplete) {
        navigate("/profile");
      } else {
        navigate("/user_profile");
      }
    } catch (error) {
      console.error("Error While Login:", error);
      if (error.response?.status === 401) {
        setError("root", {
          type: "server",
          message: error.response.data.message || "Invalid email or password",
        });
      } else {
        setError("root", {
          type: "server",
          message: "Something went wrong. Please try again.",
        });
      }
    }
  };

  return (
    <>
      <div className="login-card">
        {/* Logo */}
        <div className="logo-wrap">
          <Logo />
        </div>

        <h1 className="card-title">Welcome</h1>
        <p className="card-subtitle">Log in to GIDY!</p>

        {errors.root && <div className="Error">{errors.root.message}</div>}

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
              clearErrors={() => clearErrors("root")}
            />

            <FloatingInput
              label="Password"
              type="password"
              name="password"
              register={register}
              rules={{ required: "Password is required" }}
              errors={errors}
              clearErrors={() => clearErrors("root")}
            />
          </div>

          <button type="button" className="forgot-link">
            Forgot password?
          </button>

          <button
            type="submit"
            className="continue-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Signing in…" : "Continue"}
          </button>
        </form>

        <div className="signup-row">
          Don't have an account?
          <Link to="/signup">Sign up</Link>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
