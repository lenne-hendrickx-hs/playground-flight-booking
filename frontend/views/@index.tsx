import React, {useEffect, useState} from "react";
import {BookingService} from "Frontend/generated/endpoints";
import BookingDetails from "../generated/ai/spring/demo/ai/playground/services/BookingTools/BookingDetails";
import {GridColumn} from "@vaadin/react-components/GridColumn";
import {Grid} from "@vaadin/react-components/Grid";
import {nanoid} from "nanoid";
import {SplitLayout} from "@vaadin/react-components/SplitLayout";
import Chat from "../components/Chat";

export default function Index() {
    const [chatId, setChatId] = useState(nanoid());
    const [bookings, setBookings] = useState<BookingDetails[]>([]);


    // useEffect(() => {
    //     // Update bookings when we have received the full response
    //     if (!working) {
    //         BookingService.getBookings().then(setBookings);
    //     }
    // }, [working]);



    return (
        <SplitLayout className="h-full">
            <Chat chatId={chatId} className="flex flex-col gap-m p-m box-border h-full" style={{width: '30%'}} />

            <div className="flex flex-col gap-m p-m box-border" style={{width: '70%'}}>
                <h3>Bookings database</h3>
                <Grid items={bookings} className="flex-shrink-0">
                    <GridColumn path="bookingNumber" autoWidth header="#"/>
                    <GridColumn path="firstName" autoWidth/>
                    <GridColumn path="lastName" autoWidth/>
                    <GridColumn path="date" autoWidth/>
                    <GridColumn path="from" autoWidth/>
                    <GridColumn path="to" autoWidth/>
                    <GridColumn path="bookingStatus" autoWidth header="Status">
                        {({item}) => item.bookingStatus === "CONFIRMED" ? "✅" : "❌"}
                    </GridColumn>
                    <GridColumn path="bookingClass" autoWidth/>
                </Grid>
            </div>
        </SplitLayout>

    );
}