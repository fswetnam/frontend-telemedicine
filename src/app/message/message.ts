import { MessageType } from "../enumeration/MessageType";

export interface Message{
    id: number,
    sender_id: string,
    receiver_id: string,
    content: string,
    date: string,
    time: string,
    messageType: MessageType,
    subject: string,
    viewed: boolean
}