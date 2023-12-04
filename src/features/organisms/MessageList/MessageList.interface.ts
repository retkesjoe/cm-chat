import { Props as MessageItem } from "../../molecules/MessageItem/MessageItem.interface";

interface MessageList {
    messages: MessageItem[]
}

export type Props = MessageList;