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
            <SplitLayout className="h-full" style={{width: '70%'}}>
                <ContactChat chatId={chatId} className="flex flex-col gap-m p-m box-border h-full" style={{width: '40%'}} />
                <BookingList className="flex flex-col gap-m p-m box-border" style={{width: '60%'}} />
            </SplitLayout>

            <AgentChat chatId={chatId} className="flex flex-col gap-m p-m box-border h-full" style={{width: '30%'}} />
        </SplitLayout>
    );
}