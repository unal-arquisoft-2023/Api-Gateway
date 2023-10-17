import { AppointmentsRepoMs,AvailableAppointment } from "../../../resources/appointments";
import { doctorRepoMs } from "../../../resources/users";

/*
type TimeBlock {
  id: Int!
  startTime: String!
  endTime: String!
}

type DoctorDisplay {
  id: Int!
  name: String!
  specialty: Specialty!
}

type TimeBlock {
  id: Int!
  startTime: String!
  endTime: String!
}

type DoctorDisplay {
  id: Int!
  name: String!
  specialty: Specialty!
}

type AvailableAppointment {
  doctor: DoctorDisplay!
  date: LocalDate!
  timeBlock: TimeBlock!
}

*/

type AvailableAppointmentApi = {
  date: Date;
  timeBlock: { id: number, startTime: string, endTime: string };
  doctor: { id: string};
}
const getDoctor = async (id: string) => {
  const doctor = await doctorRepoMs.get(id);
  return {
    id: doctor.id,
    name: doctor.name.firstName + " " + doctor.name.lastName,
    specialty: doctor.specialty
  }
}

const availableAppointment = async (parent, args, context, info): Promise<AvailableAppointmentApi[]> => {
  const apps = await AppointmentsRepoMs.findBySpecialty(args.specialty);
  console.log(apps);
  const startDate = new Date(args.startDate);
  const endDate = new Date(args.endDate);
  const res = apps
    .filter(app => {
      return app.date >= startDate &&
        app.date <= endDate
    }
    )
    .map(async app =>  ({ 
      date: app.date,
      timeBlock: { 
        id: app.block.id ,
        startTime: app.block.start,
        endTime: app.block.end
      },
      doctor: await getDoctor(app.doctor_id)
    }));

  return await Promise.all(res);
}

export default availableAppointment;