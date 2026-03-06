const ImageInput = ({ label, name, register }) => {
  return (
    <div>
      <label>{label}</label>
      <input type="file" accept="image/*" {...register(name)} />
    </div>
  );
};

export default ImageInput;