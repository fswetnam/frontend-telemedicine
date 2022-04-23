import { MessageType } from "../enumeration/MessageType";

export interface Message{
    sender_id: string,
    receiver_id: string,
    content: string,
    date: string,
    time: string,
    messageType: MessageType,
    subject: string
}