const validate = (name, email, password, confirmPassword) => {
    const response = { message: "OK" };
    const re = /\S+@\S+\.\S+/;
    if (name === "")
      response = {
        name: "Name is required"
      };
    if (name.length > 255)
      response = {
        name: "Ensure name doesn't exceed 255 characters"
      }
    if (!re.test(email)) {
      response = {
        ...response,
        email: "Enter Valid Email",
      };
    }
    if (password.length < 8) {
      response = {
        ...response,
        password: "Password must have atleast 8 characters"
      };
    }
    if (password !== confirmPassword) {
      response = {
        ...response,
        password: "Passwords do not match"
      };
    }
    if (response.message !== 'OK') response.message = 'Check highlighted fields'
    return response;
  };

export default validate;