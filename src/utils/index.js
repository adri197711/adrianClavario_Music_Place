const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const paginator = (items = [], page = 1, perPage = 5) => {

    const start = (+page - 1) * perPage;
    const end = start + perPage;

    return {
        items : items.slice(start, end),
        total : Math.ceil(items.length / perPage)
    }
}

const randomNumber = (limit) => {
    return Math.floor(Math.random()*limit)+1;
}

module.exports =  {
    toThousand,
    paginator,
    randomNumber
}