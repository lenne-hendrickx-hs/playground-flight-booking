import React, {useState} from "react";
import {nanoid} from "nanoid";
import {SplitLayout} from "@vaadin/react-components/SplitLayout";
import AgentChat from "../components/AgentChat";
import BookingList from "../components/BookingList";
import ContactChat from "../components/ContactChat";

export default function Index() {
    const [chatId, _] = useState(nanoid());

    return (
        <SplitLayout className="h-full">
            <ContactChat chatId={chatId} className="flex flex-col gap-m p-m box-border h-full" style={{width: '50%'}}/>
            <AgentChat chatId={chatId} className="flex flex-col gap-m p-m box-border h-full" style={{width: '50%'}}/>
        </SplitLayout>
    );
}