import { Affiliation, Doctor, Patient, Specialty, Staff, UserStatus, doctorRepoMs, patientRepoMs, staffRepoMs } from ".";

export const migrate = async () => {
  const newStaff: Omit<Staff, "id"> = {
    name: {
      firstName: "John",
      lastName: "Doe"
    },
    email: "juan@example.com",
    phone: "+1234567890",
    location: {
      country: "Argentina",
      city: "Buenos Aires",
      address: "123 Calle Principal"
    },
    position: "manager",
    dateOfBirth: new Date(Date.parse("1990-01-15")),
    registrationDate: new Date(Date.parse("2022-09-07")),
    status: UserStatus.ACTIVE,
    cardId: "12345678"
  }

  const newRes = await staffRepoMs.create(newStaff);
  // const getRes = await staffRepoMs.get(newRes.id);
  // const updatedStaff: Staff = {...newStaff, id: newRes.id};
  // updatedStaff.name.firstName = "Jane";
  // updatedStaff.position = "director";
  // const updateRes = await staffRepoMs.update(updatedStaff);


  const newPatient: Omit<Patient, "id"> = {
    name: {
      firstName: "Fulano",
      lastName: "De tal"
    },
    email: "fuldetal@mail.com",
    phone: "+1234567890",
    location: {
      country: "Colombia",
      city: "Bogota",
      address: "UNAL"
    },
    dateOfBirth: new Date(Date.parse("1995-10-15")),
    registrationDate: new Date(Date.parse("2022-09-07")),
    status: UserStatus.ACTIVE,
    cardId: "12345678",
    affiliation: Affiliation.PUBLIC,
  }

  const newPatientRes = await patientRepoMs.create(newPatient);
  // const getPatientRes = await patientRepoMs.get(newPatientRes.id);
  // const updatedPatient: Patient = {...newPatient, id: newPatientRes.id};
  // updatedPatient.name.firstName = "Mengano";
  // updatedPatient.affiliation = Affiliation.PRIVATE;
  // const updatePatientRes = await patientRepoMs.update(updatedPatient);



  const newDoctor: Omit<Doctor, "id"> = {
    name: {
      firstName: "Gregorio",
      lastName: "Hernandez"
    },
    email: "greher@mail.com",
    phone: "+1234567890",
    location: {
      country: "Colombia",
      city: "Bogota",
      address: "UNAL"
    },
    dateOfBirth: new Date(Date.parse("1970-02-19")),
    registrationDate: new Date(Date.parse("2022-09-07")),

    status: UserStatus.ACTIVE,
    cardId: "12345678",
    specialty: Specialty.GeneralMedicine,
    medicalLicenseId: "12345678"
  }

  const newDocRes = await doctorRepoMs.create(newDoctor);
  // const getDocRes = await doctorRepoMs.get(newDocRes.id);
  // const updatedDoctor: Doctor = {...newDoctor, id: newDocRes.id};
  // updatedDoctor.name.firstName = "Jose Gregorio";
  // updatedDoctor.specialty = Specialty.Pediatrics;
  // const updateDocRes = await doctorRepoMs.update(updatedDoctor);
  // const updatedDocRed = await doctorRepoMs.get(updatedDoctor.id);
  


}