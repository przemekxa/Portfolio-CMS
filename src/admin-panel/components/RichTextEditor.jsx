import React from "react";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const RichTextEditor = ({ value, onChange }) => {
  const handleChange = (event, editor) => {
    const data = editor.getData();
    onChange(data);
  };

  return (
    <CKEditor
      editor={ClassicEditor}
      data={value}
      onChange={handleChange}
      config={
        {
          // removePlugins: ["EasyImage", "ImageUpload"],
        }
      }
    />
  );
};

export default RichTextEditor;
