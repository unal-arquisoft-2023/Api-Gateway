import { AppointmentsRepoMs, AvailableAppointment, BookedAppointment } from "../../../resources/appointments";
import { authRepoMs } from "../../../resources/auth";
import { doctorRepoMs } from "../../../resources/users";

type BookedAppointmentApi = {
  id: string;
  date: Date;
  type: string;
}


const getDoctor = async (id: string) => {
  const doctor = await doctorRepoMs.get(id);
  return {
    id: doctor.id,
    name: doctor.name.firstName + " " + doctor.name.lastName,
    specialty: doctor.specialty
  }
}

const myAppointments = async (parent, args, context, info): Promise<BookedAppointmentApi[]> => {
  const tokenRaw = context.request.header.authorization;
  // extract token from "Bearer <token>"
  const token = tokenRaw.split(" ")[1];

  const { userId } = await authRepoMs.me(token);
  const apps = await AppointmentsRepoMs.findByPatientId(userId);
  const startDate = new Date(args.startDate);
  const endDate = new Date(args.endDate);
  const res = apps
    .filter(app => {
      
      return (!args.startDate || app.date >= startDate) &&
        (!args.endDate || app.date <= endDate ) &&
        args.types.indexOf(app.status.toUpperCase()) != -1
    }
    )
    .map(async app => ({
      id: app.id,
      date: app.date,
      type: app.status.toUpperCase(),
      doctor:  await getDoctor(app.doctor_id)
    }));

    return await Promise.all(res);
}

export default myAppointments;
