import React, {useState} from "react";
import {nanoid} from "nanoid";
import {SplitLayout} from "@vaadin/react-components/SplitLayout";
import Chat from "../components/Chat";
import BookingList from "../components/BookingList";

export default function Index() {
    const [chatId, _] = useState(nanoid());

    return (
        <SplitLayout className="h-full">
            <Chat chatId={chatId} className="flex flex-col gap-m p-m box-border h-full" style={{width: '30%'}} />
            <Chat chatId={chatId} className="flex flex-col gap-m p-m box-border h-full" style={{width: '30%'}} />
            <BookingList className="flex flex-col gap-m p-m box-border" style={{width: '40%'}} />
        </SplitLayout>

    );
}