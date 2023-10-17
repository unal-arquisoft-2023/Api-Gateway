import { MedicalRecord } from "./interface";
import { regmedRepoMs } from "./implementation";

export async function migrate() {
  const medicalRecords: Array<MedicalRecord> = [
    {
      detail: "Medical Record 1",
    },
    {
      detail: "Medical Record 2",
    },
    {
      detail: "Medical Record 3",
    },
    {
      detail: "Medical Record 4",
    },
    {
      detail: "Medical Record 5",
    }
  ]

  medicalRecords.forEach(async (medicalRecord) => {
    await regmedRepoMs.create(medicalRecord.detail);
  });

}