import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { CustomToolbar } from './CustomToolbar';

const CustomQuill = ({ content, width, height }) => {
  const [editorContent, setEditorContent] = useState(content);

  const handleEditorChange = (value) => {
    setEditorContent(value);
    console.log(value)
  };

  const modules = {
    toolbar: {
      container: "#toolbar",
    },
  };

  const formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike',
    'blockquote', 'list', 'bullet', 'indent',
    'link', 'image', 'video', 'color', 'background'
  ];

  return (
    <div className='CustomQuill'>
      <CustomToolbar />
      <ReactQuill
        value={editorContent}
        onChange={handleEditorChange}
        modules={modules}
        formats={formats}
        style={{ width: `${width}px`, height: `${height}px`, }}
      />
    </div>
  );
}

export default CustomQuill;