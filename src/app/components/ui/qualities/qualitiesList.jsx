import React from "react";
import PropTypes from "prop-types";
import Quality from "./quality";
import { useQualities } from "../../../hooks/useQuality";

const QualitiesList = ({ qualities }) => {
    const { isLoading } = useQualities();
    if (!isLoading) {
        return (
            <>
                {qualities.map((qual) => (
                    <Quality key={qual} id={qual} />
                ))}
            </>
        );
    } else {
        return "Loading...";
    }
};

QualitiesList.propTypes = {
    qualities: PropTypes.array.isRequired
};

export default QualitiesList;
