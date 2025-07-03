export const getRanDomBG = () => {
    const colors = [
        "bg-yellow-500", 
        "bg-blue-600", 
        "bg-red-600", 
        "bg-green-600",
    ];
    return colors[Math.floor(Math.random() * colors.length)];
};
