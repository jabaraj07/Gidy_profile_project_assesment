import { useForm } from "react-hook-form";
import { SignupUser } from "../../api/authApi";
import { useNavigate } from "react-router-dom";
import FloatingInput from "./FloatingInput";
import "./SignupForm.css";
import Logo from "../../components/icons/Logo";

const SignupForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setError,
    clearErrors,
  } = useForm({ mode: "onChange" });

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await SignupUser(data);
      console.log(response.data);
      reset();
      navigate("/login");
    } catch (error) {
      console.error("Error signing up:", error);
      if (error.response?.status === 400) {
        setError("root", {
          type: "server",
          message: error.response.data.message || "User Already Exists",
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
      <div className="signup-card">
        {/* Logo */}
        <div className="logo-wrap">
          <Logo />
        </div>

        <h1 className="card-title">Create Account</h1>
        <p className="card-subtitle">Sign up for GIDY!</p>

        {errors.root && <div className="Error">{errors.root.message}</div>}

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="form-fields">
            <FloatingInput
              label="First Name"
              type="text"
              name="name"
              register={register}
              rules={{ required: "Name is required" }}
              errors={errors}
              clearErrors={() => clearErrors("root")}
            />

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
              rules={{
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              }}
              errors={errors}
              clearErrors={() => clearErrors("root")}
            />
          </div>

          <button type="submit" className="submit-btn" disabled={isSubmitting}>
            {isSubmitting ? "Creating account…" : "Sign up"}
          </button>
        </form>

        <div className="login-row">
          Already have an account?<a href="/login">Log in</a>
        </div>
      </div>
    </>
  );
};

export default SignupForm;
