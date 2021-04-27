export interface MessagePatient {
  messageId?: number;
  senderId: string;
  imageType: string;
  imageUrl:string;
  treatmentId?: number;
  patientName: string;
  patientPhoneNumber: string;
  sentAt:Date;
}
