const JOB_APPLICATION_TEMPLATE = (applicantData, jobTitle) => {
  return `
    <h3>New Job Application for "${jobTitle}"</h3>
    <p><strong>Name:</strong> ${applicantData.name}</p>
    <p><strong>Email:</strong> ${applicantData.email}</p>
    <p><strong>Phone:</strong> ${applicantData.phoneNumber}</p>
    <p><strong>Last Education:</strong> ${applicantData.lastEducation}</p>
    <p><strong>Expected Salary:</strong> ${applicantData.expectedSalary}</p>
    <p><strong>Year of Passing:</strong> ${applicantData.yearOfPassing}</p>
    <p><strong>Address:</strong> ${applicantData.address || "N/A"}</p>
    <p><strong>Resume:</strong> ${applicantData.resume}</p>
  `;
};

module.exports = {
  JOB_APPLICATION_TEMPLATE,
};
