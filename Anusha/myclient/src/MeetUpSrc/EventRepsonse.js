import "./Response.css";
import MyNavbar from "./Navbar";

import { useEffect, useState } from 'react';
import { Button } from "bootstrap";
import { MDBDataTable } from "mdbreact";

export default function EventResponse() {

    const [eventdata, setEventdata] = useState(null);
    const [selectedRow, setSelectedRow] = useState(null);

    var description = "";
    var title = "";

    useEffect(() => {
        const url = `http://localhost:3000/PollData`;
        fetch(url)
            .then((res) => res.json())
            .then((res) => {
                setEventdata(res);
            })
    }, [])

    if (eventdata != null) {
        description = eventdata[0].description ? eventdata[0].description : "";
        title = eventdata[0].title;
    }

    const tableData = {
        columns: [
            {
                label: "ID",
                field: "index",
                width: 10,
            },
            {
                label: "Start Time",
                field: "startTime",
                width: 30,
            },
            {
                label: "End Time",
                field: "endTime",
                width: 30
            },
            {
                label: "Location",
                field: "location",
                width: 30
            },
        ],

        rows: eventdata

    }

    const handleSelect = (rowID, selected) => {
        if(selected) {
            setSelectedRow(rowID);
        } else {
            setSelectedRow(null);
        }
        console.log(rowID);
    }

    return (
        <div className="mainDisplay">
            <MyNavbar />

            <p style={{ textAlign: "center" }}>
                <b style={{ fontSize: "30px" }}>{title}</b>
                <br />
                <i style={{ fontSize: "25px" }}>{description}</i>
            </p>

            <div
                style={{
                    margin: "2%",
                    padding: "2%",
                    border: "1px solid black",
                    textAlign: "center",
                }}>
                    <MDBDataTable
                        scrollX
                        scrollY
                        maxHeight='50%'
                        striped
                        bordered
                        small
                        hover
                        data={tableData}
                        onRowClick={(rowData, rowMeta) => 
                            handleSelect(rowMeta.rowIndex, selectedRow !== rowMeta.rowIndex)
                        }
                    />
                </div>

        </div>
    )
}