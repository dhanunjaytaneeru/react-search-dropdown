import React from "react";

const getHighlightedText = (text, highlight) => {
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    const highLightStyle = {
        fontWeight: "bold",
        color: "#1a72e8"
    }
    return (
        <span>
            {
                parts.map((part, i) => (
                    <span
                        key={i}
                        style={part.toLowerCase() === highlight.toLowerCase()
                        ? highLightStyle
                        : {}}>
                        {part}
                    </span>
                ))
            }
        </span>
    );
};

export default({
    data,
    index,
    selected,
    onMouseEnter,
    searchString,
    searchKeys,
    onSelected,
    highlightSearchText
}) => (
    <div
        onClick={(e) => {
            console.log("click");
            e.stopPropagation();
            onSelected(e, data);
        }}
        className={`search-list--item ${data.id === selected.id ? "active" : ""}`}
        onMouseEnter={(e) => onMouseEnter(e, data, index)}
    >
        {
            searchKeys.map((id, i) => {
                return (
                    <div className="meta-info" data-id={id} key={i}>
                        {
                            highlightSearchText ?
                            getHighlightedText(Array.isArray(data[id]) ? data[id].join(",") : data[id], searchString)
                            :
                            Array.isArray(data[id]) ? data[id].join(",") : data[id]
                        }
                    </div>
                )
            })
        }
    </div>
)