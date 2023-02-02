import React from "react";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import "bootstrap/dist/css/bootstrap.css";

function DropdownProviders(props) {
        return (
            <DropdownButton onSelect={props.fetchToken} id="dropdown-basic-button" title="Select Provider" align={{ lg: 'end' }}>
                {props.provider}
                <Dropdown.Item eventKey="gusto">Gusto</Dropdown.Item>
                <Dropdown.Item eventKey="bamboohr">BambooHR</Dropdown.Item>
                <Dropdown.Item eventKey="justworks">Justworks</Dropdown.Item>
                <Dropdown.Item eventKey="paychex_flex">Paychex Flex</Dropdown.Item>
                <Dropdown.Item eventKey="workday">Workday</Dropdown.Item>
            </DropdownButton>
        )
}

export default DropdownProviders;