import React from 'react';
import { useParams } from 'react-router-dom';


function Department(props) {

    const { departmentName } = useParams();

    return (
        <div>
            {departmentName}
        </div>
    );
}

export default Department;