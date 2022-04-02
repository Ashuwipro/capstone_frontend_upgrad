const baseUrl = "http://localhost:8080/";

async function DoctorsAndSpeciality() {
  const url1 = baseUrl + "doctors/";
  const url2 = baseUrl + "doctors/speciality";
  const response1 = await fetch(url1);
  const response2 = await fetch(url2);
  const data1 = await response1.json();
  const data2 = await response2.json();
  return [data1, data2];
}

async function fetchingDoctorsWithSpeciality(test) {
  let url3 = baseUrl + "doctors/?speciality=" + test;
  if (test === "none") {
    url3 = baseUrl + "doctors/?speciality=";
  }
  const response3 = await fetch(url3);
  const data3 = await response3.json();
  return data3;
}

async function DoctorDetailModalHandler(doctorId) {
  let url = baseUrl + "doctors/" + doctorId;
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

async function fetchBookAppointmentModalHandler(doctorId, date) {
  let url = baseUrl + "doctors/" + doctorId + "/timeSlots?date=" + date;

  const response = await fetch(url);
  const data = await response.json();

  return data;
}

async function fetchBookAppointmentClickHandler() {
  const opt = {
    method: "GET",
    headers: {
      Authorization: "Bearer " + sessionStorage.getItem("access-token"),
    },
  };

  const response = await fetch(
    `${baseUrl}users/${sessionStorage.getItem("uuid")}`,
    opt
  );
  const data = await response.json();
  const name = (await data.firstName) + " " + data.lastName;

  return name;
}

async function fetchBookingAppointmenWithDetails(options) {
  const bookAppointment = {
    method: "POST",
    headers: {
      Authorization: "Bearer " + sessionStorage.getItem("access-token"),
      "Content-Type": "application/json",
    },
    body: JSON.stringify(options),
  };

  const response = await fetch(baseUrl + "appointments/", bookAppointment);
  const status = await response.status;
  return status;
}

async function fetchHandleDateChangeFetchingTimeSlots(dId, date) {
  const url = baseUrl + "doctors/" + dId + "/timeSlots?date=" + date;
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

async function fetchAppointmentsForAppointmentTab() {
  const opt = {
    method: "GET",
    headers: {
      Authorization: "Bearer " + sessionStorage.getItem("access-token"),
      "Content-Type": "application/json",
    },
  };
  const response = await fetch(
    `${baseUrl}users/${sessionStorage.getItem("uuid")}/appointments`,
    opt
  );
  const data = await response.json();
  return data;
}

async function fetchUsedInLogin(username, loginPassword) {
  const options = {
    method: "POST",
    headers: {
      Authorization: "Basic " + btoa(`${username}:${loginPassword}`),
      "Content-Type": "application/json",
    },
  };

  const response = await fetch(baseUrl + "auth/login", options);
  const status = response.status;
  const data = await response.json();

  return [data, status];
}

async function fetchUsedInRegister(dataSignup) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dataSignup),
  };
  const response = await fetch(baseUrl + "users/register", requestOptions);
  const status = await response.status;
  const data = await response.json();
  return [status, data];
}

async function fetchUsedInHeaderForLogout() {
  const options = {
    method: "POST",
    headers: {
      Authorization: "Bearer " + sessionStorage.getItem("access-token"),
    },
  };

  fetch(baseUrl + "auth/logout", options);
}

async function appointmentRatedOrNot(appointmentId) {
  const options = {
    method: "GET",
    headers: {
      Authorization: "Bearer " + sessionStorage.getItem("access-token"),
      "Content-Type": "application/json",
    },
  };

  const response = await fetch(baseUrl + "ratings/" + appointmentId, options);
  const data = await response.json();
  return data;
}

async function rateAppointment(data) {
  const options = {
    method: "POST",
    headers: {
      Authorization: "Bearer " + sessionStorage.getItem("access-token"),
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  const response = await fetch(baseUrl + "ratings", options);
  const status = response.status;
  return status;
}

export {
  fetchUsedInHeaderForLogout,
  fetchUsedInRegister,
  fetchUsedInLogin,
  fetchAppointmentsForAppointmentTab,
  fetchHandleDateChangeFetchingTimeSlots,
  fetchBookingAppointmenWithDetails,
  fetchBookAppointmentClickHandler,
  fetchBookAppointmentModalHandler,
  fetchingDoctorsWithSpeciality,
  DoctorsAndSpeciality,
  DoctorDetailModalHandler,
  appointmentRatedOrNot,
  rateAppointment,
};
