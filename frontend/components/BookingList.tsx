import React, {useRef, useEffect, useState} from 'react';
import {Grid} from "@vaadin/react-components/Grid";
import {GridColumn} from "@vaadin/react-components/GridColumn";
import BookingDetails from "../generated/ai/spring/demo/ai/playground/services/BookingTools/BookingDetails";
import {BookingService} from "../generated/endpoints";

interface BookingListProps {
  className?: string;
  style?: React.CSSProperties;
}

export default function BookingList({ className, style }: BookingListProps) {
  const [bookings, setBookings] = useState<BookingDetails[]>([]);


  useEffect(() => {
          BookingService.join().onNext(setBookings);
          BookingService.getBookings().then(setBookings);
  }, []);


  return (
      <div className={className} style={style}>
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
  );
}