export interface MessagePatient {
  messageId?: string;
  senderId: string;
  receiverId: string;
  imageType: string;
  imageUrl: string;
  treatmentId?: number;
  patientName: string;
  patientPhoneNumber: string;
  seen?: boolean;
  sentAt: Date;
}
