const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    // Authentication Details
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        "Please enter a valid email address",
      ],
    },
    password: {
      type: String,
      required: true,
    },

    // Basic Profile Details
    profile: {
      lastName: { type: String, trim: true, default: "" },
      whatBestDescribeYou: {
        type: String,
        enum: ["jobseeker", "intern", "student", "recruiter", "freelancer"],
      },
      location: { type: String, trim: true, default: "" },
      bio: { type: String, trim: true, default: "", maxlength: 500 },
      profileImage: { type: String, default: "", trim: true },
      profileImagePublicId: { type: String, default: "", trim: true },
      resume: { type: String, default: "",trim:true },
      resumePublicId:{type:String, default:"",trim:true}
    },

    // Career Section (Optional)
    careerGoals: {
      longTermAspiration: { type: String, default: "" },
      aspirationalField: { type: String, default: "" },
      inspiration: { type: String, default: "" },
      currentAim: { type: String, default: "" },
    },
    // skills
    skills: [
      {
        type: String,
        trim: true,
      },
    ],

    // Experience Section
    experience: [
      {
        role: {
          type: String,
          required: true,
          trim: true,
        },

        companyName: {
          type: String,
          required: true,
          trim: true,
        },

        location: {
          type: String,
          default: "",
        },

        dateOfJoining: {
          type: Date,
          required: true,
        },

        dateOfLeaving: {
          type: Date,
        },

        currentlyWorking: {
          type: Boolean,
          default: false,
        },
      },
    ],

    // Education Section
    education: [
      {
        collegeName: {
          type: String,
          required: true,
          trim: true,
        },

        degree: {
          type: String,
          required: true,
          trim: true,
        },

        fieldOfStudy: {
          type: String,
          required: true,
          trim: true,
        },

        location: {
          type: String,
          default: "",
        },

        dateOfJoining: {
          type: Date,
          required: true,
        },

        dateOfCompletion: {
          type: Date,
        },

        currentlyStudying: {
          type: Boolean,
          default: false,
        },
      },
    ],

    // certification section
    certifications: [
      {
        name: {
          type: String,
          required: true,
          trim: true,
        },

        provider: {
          type: String,
          required: true,
          trim: true,
        },

        certificateUrl: {
          type: String,
          default: "",
        },

        certificateId: {
          type: String,
          default: "",
        },

        issueDate: {
          type: Date,
        },

        expiryDate: {
          type: Date,
        },

        description: {
          type: String,
          maxlength: 200,
          default: "",
        },
      },
    ],

    isProfileComplete: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("User", UserSchema);
