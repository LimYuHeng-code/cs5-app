import React, { useState } from 'react';

function Jobs() {
const [formData, setFormData] = useState({
    myName: '',
    myEmail: '',
    startDate: '',
    myExp: '',
    myNRIC: '',
});

const [errors, setErrors] = useState({});

const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);
const validateNRIC = (nric) => /^[SsTtFfGg]\d{7}[A-Za-z]$/.test(nric);

const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
};

const validateForm = () => {
    const newErrors = {};
    if (!formData.myName.trim()) newErrors.myName = 'Name is required';
    if (!formData.myEmail.trim()) newErrors.myEmail = 'Email is required';
    else if (!validateEmail(formData.myEmail)) newErrors.myEmail = 'Invalid email format';
    if (!formData.myExp.trim()) newErrors.myExp = 'Experience is required';
    if (!formData.myNRIC.trim()) newErrors.myNRIC = 'NRIC is required';
    else if (!validateNRIC(formData.myNRIC)) newErrors.myNRIC = 'Invalid NRIC format';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
};

const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
    alert('Form submitted successfully!');
      // Here you can handle submission to backend or reset form etc.
    }
};

const handleReset = () => {
    setFormData({
    myName: '',
    myEmail: '',
    startDate: '',
    myExp: '',
    myNRIC: '',
    });
    setErrors({});
};

return (
    <div className="content">
        <h2>Jobs at JavaJam</h2>
        <p>
          Want to work at JavaJam? Fill out the form below to start your application. Required fields are marked with an asterisk *
        </p>
        <form onSubmit={handleSubmit} onReset={handleReset} noValidate id="jobApplicationForm">
        <table border="0">
            <tbody>
            <tr>
                <td id="form-label"><label htmlFor="myName">*Name:</label></td>
                <td id="table-rightcol">
                <input
                    type="text"
                    name="myName"
                    size="25"
                    id="myName"
                    placeholder="Enter your name here"
                    value={formData.myName}
                    onChange={handleChange}
                    aria-describedby="myNameError"
                />
                {errors.myName && <div id="myNameError" style={{ color: 'red' }}>{errors.myName}</div>}
                </td>
            </tr>
            <tr>
                <td id="form-label"><label htmlFor="myEmail">*E-mail:</label></td>
                <td id="table-rightcol">
                <input
                    type="email"
                    name="myEmail"
                    size="25"
                    id="myEmail"
                    placeholder="Enter your Email-ID here"
                    value={formData.myEmail}
                    onChange={handleChange}
                    aria-describedby="myEmailError"
                />
                {errors.myEmail && <div id="myEmailError" style={{ color: 'red' }}>{errors.myEmail}</div>}
                </td>
            </tr>
            <tr>
                <td id="form-label"><label htmlFor="startDate">Start Date:</label></td>
                <td id="table-rightcol">
                <input
                    type="date"
                    name="startDate"
                    id="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                />
                </td>
            </tr>
            <tr>
                <td id="form-label"><label htmlFor="experience">*Experience:</label></td>
                <td id="table-rightcol">
                <textarea
                    id="experience"
                    name="myExp"
                    rows="4"
                    cols="40"
                    placeholder="Enter your past experience here"
                    value={formData.myExp}
                    onChange={handleChange}
                    aria-describedby="myExpError"
                />
                {errors.myExp && <div id="myExpError" style={{ color: 'red' }}>{errors.myExp}</div>}
                </td>
            </tr>
            <tr>
                <td id="form-label"><label htmlFor="myNRIC">*NRIC:</label></td>
                <td id="table-rightcol">
                <input
                    type="text"
                    id="myNRIC"
                    name="myNRIC"
                    placeholder="e.g. S1234567D"
                    value={formData.myNRIC}
                    onChange={handleChange}
                    aria-describedby="myNRICError"
                />
                {errors.myNRIC && <div id="myNRICError" style={{ color: 'red' }}>{errors.myNRIC}</div>}
                </td>
            </tr>
            </tbody>
        </table>
        <input type="reset" value="Clear" />
        <input type="submit" value="Apply Now" />
        </form>
    </div>
);
}

export default Jobs;
