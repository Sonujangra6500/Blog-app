export const Categorie = [
    {
        id: 1,
        type: "Music"
    },
    {
        id: 2,
        type: "Movies"
    },
    {
        id: 3,
        type: "Sports"
    },
    {
        id: 4,
        type: "Teck"
    },
    {
        id: 5,
        type: "Fashion"
    },
]

export const AddElipsis = (str, limit) => {
    return str.length > limit ? str.substring(0, limit) + "..." : str;
}