import React from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../../../context/authContext";
import {
  AddCertification,
  UpdateCertification,
} from "../../../../api/certificationApi";
import InputField from "../../../../components/common/InputField";
import "./AllForm.css";
import "./CertificationForm.css";
import Button from "../../../../components/common/Button";

const CertificationForm = ({ defaultValues = {}, onClose }) => {
  const { fetchUser } = useAuth();

  const {
    register,
    handleSubmit,
    watch,
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
        <h2>
          {defaultValues._id ? "Edit Certification" : "Add Certification"}
        </h2>

        <div className="InputField">
          <InputField
            label="Certification *"
            name="name"
            className="FormInput"
            register={register}
            errors={errors}
            rules={{ required: "Certification name is required" }}
            labelClassName="FormInput_label"
            errorClassName="FormInput_error"
          />
        </div>

        <div className="InputField">
          <InputField
            label="Provider *"
            name="provider"
            className="FormInput"
            register={register}
            errors={errors}
            rules={{ required: "Provider is required" }}
            labelClassName="FormInput_label"
            errorClassName="FormInput_error"
          />
        </div>

        <div className="InputField">
          <InputField
            label="Certificate Url"
            name="certificateUrl"
            register={register}
            errors={errors}
            className="FormInput"
            labelClassName="FormInput_label"
          />
        </div>

        <div className="InputField">
          <InputField
            label="Certificate ID"
            name="certificateId"
            register={register}
            errors={errors}
            className="FormInput"
            labelClassName="FormInput_label"
          />
        </div>

        <div className="InputField">
          <InputField
            type="date"
            label="Issued Date"
            name="issueDate"
            register={register}
            errors={errors}
            className="FormInput"
            labelClassName="FormInput_label"
          />
        </div>

        <div className="InputField">
          <InputField
            label="Expiry Date"
            name="expiryDate"
            type="date"
            register={register}
            errors={errors}
            className="FormInput"
            labelClassName="FormInput_label"
            errorClassName="FormInput_error"
            rules={{
              validate: (val) => {
                const issue = watch("issueDate");
                if (val && issue && new Date(val) < new Date(issue)) {
                  return "Expiry cannot be before issue";
                }
                return true;
              },
            }}
          />
        </div>

        <div className="InputField">
          <label className="FormInput_label" htmlFor="description">
            Description
          </label>

          <textarea
            id="description"
            className="FormTextarea"
            {...register("description")}
            placeholder="Max 200 characters"
            rows={5}
          />
        </div>

        <div className="btn_div">
          <Button onclick={onClose} className="Certification_form_cancel_btn">
            Cancel
          </Button>

          <Button type="submit" className="Certification_form_add_btn">
            {defaultValues._id ? "Update" : "Add"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CertificationForm;
