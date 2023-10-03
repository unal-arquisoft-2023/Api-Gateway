export const userTypeDef = `
    type nameType {
        firstName: String!
        lastName: String!
    }

    type locationType{
        country: String!
        city: String!
        address: String!
    }

    enum StatusUser {
        ACTIVE
        SUSPENDED
    }

    
    type patient {
        id: String!
        name: nameType!
        email: String!
        phone: String!
        location: locationType!
        title: String!
        dateOfBirth: String!
        registerDate: String!
        status: StatusUser!
        dni: String!
        affiliation: AfiliationType!
    }
    
    type doctor{
        id: String!
        name: nameType!
        email: String!
        phone: String!
        location: locationType!
        title: String!
        dateOfBirth: String!
        registerDate: String!
        status: StatusUser!
        dni: String!
        speciality: specialityType!
        medicalLicenseID: String!
    }
    
    type staff {
        id: String!
        name: nameType!
        email: String!
        phone: String!
        location: locationType!
        title: String!
        dateOfBirth: String!
        registerDate: String!
        status: StatusUser!
        dni: String!
    }
    
    input staffInput {
        name: nameInput!
        email: String!
        phone: String!
        location: locationInput!
        title: String!
        dateOfBirth: String!
        registerDate: String!
        status: StatusUser!
        dni: String!
    }

    input patientInput {
        name: nameInput!
        email: String!
        phone: String!
        location: locationInput!
        title: String!
        dateOfBirth: String!
        registerDate: String!
        status: StatusUser!
        dni: String!
        affiliation: AfiliationType!
    }

    input doctorInput {
        name: nameInput!
        email: String!
        phone: String!
        location: locationInput!
        title: String!
        dateOfBirth: String!
        registerDate: String!
        status: StatusUser!
        dni: String!
        speciality: specialityType!
        medicalLicenseID: String!
    }

    input nameInput {
        firstName: String!
        lastName: String!
    }

    input locationInput {
        country: String!
        city: String!
        address: String!
    }

    enum AfiliationType {
        PRIVATE
        PUBLIC
        INSURANCE
    }

    enum specialityType {
        GeneralMedicine
        Pediatrics
        Cardiology
        Orthopedics
        Dermatology
        Gastroenterology
        Neurology
        Ophtalmology
        Oncology
        Otolaryngology
        Urology
        Psychiatry
        Obstetrics
        Gynecology
        Anesthesiology
        Radiology
        Pathology
        Emergency
        FamilyMedicine
        InternalMedicine
        Surgery
        Other
    }`;

export const usersQueries = `
    staffById(id: String!): staff!
    patientById(id: String!): patient!
    doctorById(id: String!): doctor!
    allDoctors: [doctor]!
    allPatients: [patient]!
    doctorBySpeciality(speciality: specialityType!): [doctor]!    
`; 
export const usersMutations = `
    createStaff(staff: staffInput!): JSON!
    createPatient(patient: patientInput!): JSON!
    createDoctor(doctor: doctorInput!): JSON!
    updateStaff(id: String!, staff: staffInput!): JSON!
    updatePatient(id: String!, patient: patientInput!): JSON!
    updateDoctor(id: String!, doctor: doctorInput!): JSON!
    `; 