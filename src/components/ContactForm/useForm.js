import { useState, useEffect } from "react";
import { notification } from "antd";
import emailjs from 'emailjs-com';

const useForm = (validate) => {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [shouldSubmit, setShouldSubmit] = useState(false);

  const openNotificationWithIcon = (type) => {
    notification[type]({
      message: "Success",
      description: "Your message has been sent!",
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(values)
    setErrors(validate(values));
    // Your url for API
    // const url = "";
    if (Object.keys(values).length === 3) {
      emailjs.sendForm('build-a-fair', 'template_v1rlwje', event.target, 'user_sMgBq4LTeD4ijE1vDXECk')
      .then((result) => {
        setShouldSubmit(true);
      }, (error) => {
        console.log('error in form' + error)
        setShouldSubmit(false);
      });
    }
  };

  useEffect(() => {
    if (Object.keys(errors).length === 0 && shouldSubmit) {
      setValues("");
      openNotificationWithIcon("success");
    }
  }, [errors, shouldSubmit]);

  const handleChange = (event) => {
    event.persist();
    setValues((values) => ({
      ...values,
      [event.target.name]: event.target.value,
    }));
    setErrors((errors) => ({ ...errors, [event.target.name]: "" }));
  };

  return {
    handleChange,
    handleSubmit,
    values,
    errors,
  };
};

export default useForm;
