import { AppointmentsRepoMs, CreateAppointmentResponseDTO } from "../../../resources/appointments";
import { authRepoMs } from "../../../resources/auth";
import { doctorRepoMs } from "../../../resources/users";

const getDoctor = async (id: string) => {
  const doctor = await doctorRepoMs.get(id);
  return {
    id: doctor.id,
    name: doctor.name.firstName + " " + doctor.name.lastName,
    specialty: doctor.specialty
  }
}
const bookAppointment = async (parent, args, context, info): Promise<boolean> => {
  const tokenRaw = context.request.header.authorization;
  // extract token from "Bearer <token>"
  const token = tokenRaw.split(" ")[1];

  const { userId } = await authRepoMs.me(token);
  try {
    console.log(args.date, new Date(args.date));
    const {specialty} = await doctorRepoMs.get(args.doctorId);

    const apps = await AppointmentsRepoMs.create({
      patient_id: userId,
      doctor_id: args.doctorId,
      specialty: specialty,
      date: new Date(args.date),
      block_id: args.timeBlockId
    });
    return true;
  }
  catch (e) {
    console.log(e);
    return false;
  }
}

export default bookAppointment;