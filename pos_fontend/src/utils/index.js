export const getRanDomBG = () => {
    const colors = [
        "bg-yellow-500", 
        "bg-blue-600", 
        "bg-red-600", 
        "bg-green-600",
    ];
    return colors[Math.floor(Math.random() * colors.length)];
};


export const getBgColor = () => {
    const bgarr = [
        "#FFB6C1", 
        "#87CEFA",
        "#98FB98", 
        "#FFD700", 
        "#FFA07A", 
        "#DDA0DD"  
    ];
    const randomBg = Math.floor(Math.random() * bgarr.length);
    const color = bgarr[randomBg];
    return color;
};
