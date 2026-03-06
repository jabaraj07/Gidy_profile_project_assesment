import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../context/authContext";
import { AddCertification, UpdateCertification } from "../../api/userAuth";
import InputField from "../common/InputField";

const CertificationForm = ({ defaultValues = {}, onClose }) => {
  const { fetchUser } = useAuth();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: defaultValues.name || "",
      provider: defaultValues.provider || "",
      certificateUrl: defaultValues.certificateUrl || "",
      certificateId: defaultValues.certificateId || "",
      issueDate: defaultValues.issueDate || "",
      expiryDate: defaultValues.expiryDate || "",
      description: defaultValues.description || "",
    },
  });

  const onSubmit = async (data) => {
    // strip empty dates/url/id/description
    if (!data.issueDate) delete data.issueDate;
    if (!data.expiryDate) delete data.expiryDate;
    if (!data.certificateUrl) delete data.certificateUrl;
    if (!data.certificateId) delete data.certificateId;
    if (!data.description) delete data.description;

    try {
      if (defaultValues._id) {
        await UpdateCertification(defaultValues._id, data);
      } else {
        await AddCertification(data);
      }
      await fetchUser();
      onClose();
    } catch (err) {
      console.error("Error saving certification:", err);
    }
  };

  return (
    <div className="modal">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2>{defaultValues._id ? "Edit Certification" : "Add Certification"}</h2>

        <InputField
          label="Certification *"
          name="name"
          register={register}
          errors={errors}
          rules={{ required: "Certification name is required" }}
        />

        <InputField
          label="Provider *"
          name="provider"
          register={register}
          errors={errors}
          rules={{ required: "Provider is required" }}
        />

        <InputField
          label="Certificate Url"
          name="certificateUrl"
          register={register}
          errors={errors}
        />

        <InputField
          label="Certificate ID"
          name="certificateId"
          register={register}
          errors={errors}
        />

        <div>
          <label>Issued Date</label>
          <input
            type="date"
            {...register("issueDate")}
          />
        </div>

        <div>
          <label>Expiry Date</label>
          <input
            type="date"
            {...register("expiryDate", {
              validate: (val) => {
                const issue = watch("issueDate");
                if (val && issue && new Date(val) < new Date(issue)) {
                  return "Expiry cannot be before issue";
                }
                return true;
              },
            })}
          />
          {errors.expiryDate && (
            <p style={{ color: "red" }}>{errors.expiryDate.message}</p>
          )}
        </div>

        <div>
          <label>Description</label>
          <textarea
            {...register("description")}
            placeholder="max character (200 - 0)"
          />
        </div>

        <button type="button" onClick={onClose} style={{ marginRight: "8px" }}>
          Cancel
        </button>
        <button type="submit">{defaultValues._id ? "Update" : "Add"}</button>
      </form>
    </div>
  );
};

export default CertificationForm;
