/*
I have the following endpoints and want to define the types for the corresponding 
grahql schema:
wget --no-check-certificate --quiet \
  --method POST \
  --timeout=0 \
  --header 'Content-Type: application/json' \
  --body-data '{
    "date": "2023-10-01",
    "times": [
        {
            "start": "07:00:00",
            "end":"11:00:00"
        },
        {
            "start": "19:00:00",
            "end": "20:00:00"
        }
    ] 
}' \
   'localhost:8081/availability/10/Cardiology'
it returns:
{
    "date": "2023-10-01",
    "times": [
        {
            "start": "07:00:00",
            "end":"11:00:00"
        },
        {
            "start": "19:00:00",
            "end": "20:00:00"
        }
    ] 
}
*/

export const doctorAvailabilityTypeDef = `
input DoctorAvailabilityInput {
    date: String!
    times: [TimeSlotInput]!
} 
input TimeSlotInput {
    start: String!
    end: String!
}

type DoctorAvailability {
    doctorId: Int!
    specialty: String!
    date: String!
    times: [TimeSlot]
}
type TimeSlot {
    id: Int!
    start: String!
    end: String!
}

input AppointmentInput {
  patientId: Int!
  doctorId: Int!
  date: String!
  specialty: String!
  timeId: Int!
}

type Appointment {
  patientId: Int!
  doctorId: Int!
  date: String!
  specialty: String!
  timeId: Int!
}

type AppointmentCreationOutput {
  appointmentId: Int!
}
`

export const availabilityQueries = `
    availabilityBySpecialtyAndDate(specialty: String!, date: String!): [DoctorAvailability!]!
    availabilityCanBook(doctorId: Int!, specialty: String!, date: String!, timeId: Int!): Boolean!
`

export const availabilityMutations = `
   updateAvailability(doctorId: Int!, specialty: String!, newAvailability: DoctorAvailabilityInput): Boolean!
   createAppointment(appointment: AppointmentInput): AppointmentCreationOutput!
   cancelAppointment(appointmentId: Int!): Boolean!
   attendAppointment(appointmentId: Int!): Boolean!
   findAppointment(appointmentId: Int!): Appointment!
`
