import React, { useState } from "react";
import { useForm } from "react-hook-form";

function Text() {
  const { register, handleSubmit, setValue } = useForm();
  const [fileError, setFileError] = useState("");

  const onSubmit = (data) => {
    console.log("File content:", data.textarea);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target.result;
        const wordCount = text.split(/\s+/).length;
        console.log("Word count:", wordCount);

        if (wordCount > 1000) {
          setFileError(
            "The file contains more than 1000 words. Please upload a smaller file."
          );
          setValue("textarea", ""); // Clear the textarea if the file is invalid
        } else {
          setFileError("");
          setValue("textarea", text); // Set the new content in the textarea
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Upload file:</label>
        <input type="file" accept=".txt" onChange={handleFileUpload} />
      </div>
      {fileError && <p style={{ color: "red" }}>{fileError}</p>}
      <div>
        <label>File content:</label>
        <textarea {...register("textarea")} rows="10" cols="50" readOnly />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}

export default Text;
