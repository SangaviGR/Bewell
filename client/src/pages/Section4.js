const submitDoctorInfo = async () => {
  const response = await fetch('http://localhost:3001/api/doctor', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: 'Doctor Name',
      info: 'Doctor Information',
      signature: 'Doctor Signature URL or base64 string',
    }),
  });
  const data = await response.json();
  console.log(data); // Log the response from the backend
};

submitDoctorInfo();