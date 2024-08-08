import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { CustomToolbar } from '/src/common/CustomToolbar';

const CustomQuill = ({ content, setContent, width, height }) => {

  const handleEditorChange = (value) => {
    setContent(value);
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
      <CustomToolbar style={{ width: `${width}px` }} />
      <ReactQuill
        value={content}
        onChange={handleEditorChange}
        modules={modules}
        formats={formats}
        style={{ width: `${width}px`, height: `${height}px`, }}
      />
    </div>
  );
}

export default CustomQuill;