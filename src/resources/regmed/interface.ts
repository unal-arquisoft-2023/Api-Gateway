export type MedicalRecord = {
    id?: number;
    detail: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface IResponse<T> {
  success: boolean;
  data: T;
  error?: string;
  warnings?: Array<string>;
}

export interface RegMedRepository {
  get: (id: number) => Promise<IResponse<MedicalRecord | undefined>>,
  getMany: (ids: Array<number>) => Promise<IResponse<MedicalRecord[] | undefined>>,
  getAll: () => Promise<IResponse<MedicalRecord[] | undefined>>, 
  create: (detail: string) => Promise<IResponse<MedicalRecord | undefined>>,
  update: (id: number, detail: string) => Promise<IResponse<MedicalRecord | undefined>>,
  delete: (id: number) => Promise<IResponse<MedicalRecord | undefined>>,
}