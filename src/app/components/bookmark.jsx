import React from "react";

const BookMark = ({status}) => {
    return (
        <i className={'bi bi-bookmark-' + (status === false ? 'star' : 'star-fill')}></i>
    )
}

export default BookMark;