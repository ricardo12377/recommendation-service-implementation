// useForm.js

import { useState } from 'react';
import formInitialState from '../mocks/formState';

const useForm = () => {
  const [formData, setFormData] = useState(formInitialState);

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  return { formData, handleChange };
};

export default useForm;
