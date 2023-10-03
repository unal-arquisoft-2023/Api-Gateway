export const notificationTypeDef = `
    type appointmentToNotify {
        id: Int!
        appointmentId: Int!
        status: Status!
        notifications: [Notification]!
        dateSchedule: String!
    }

    enum Status {
        NOTIFIED
        PARTIAL
        UNNOTIFIED
    }

    type Notification {
        # Define the fields for the Notification type if needed
        id: Int!
        message: String!
        date: String!
        medium: Medium!
        seen: Boolean!
    }
    enum Medium {
        SMS
        CALL
        GMAIL
        WAPP
    }  

    input NotificationInputFormat {
        message: String!
        contact: String!
    }

    input NotificationInput {
        appointmentId: Int!
        date: String!
        patientID: Int!
        speciality: String!
      }`;

export const notificationsQueries = `
    allNotifications: [Notification]!`; 
export const notificationsMutations = `
    generateNotificationsForAppointment(notification: NotificationInput!): appointmentToNotify!
    sendSMS(notification: NotificationInputFormat!): String!
    sendEmail(notification: NotificationInputFormat!): String
    deleteAppNotificationById(id: Int!): Int
    `; 