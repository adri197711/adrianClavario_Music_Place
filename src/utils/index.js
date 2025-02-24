const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const paginator = (items = [], page = 1, perPage = 10) => {

    const start = (+page - 1) * perPage;
    const end = start + perPage;

    return {
        items : items.slice(start, end),
        total : Math.ceil(items.length / perPage)
    }
}


module.exports =  {
    toThousand,
    paginator
}