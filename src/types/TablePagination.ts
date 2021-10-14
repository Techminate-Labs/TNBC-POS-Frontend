interface MetaPagination {
    current_page: number,
    from: number | null,
    last_page: number,
    links: MetaPaginationLinks[],
    path: string,
    per_page: number,
    to: number | null,
    total: number,
}

interface MetaPaginationLinks {
    active: boolean,
    label: string,
    url: string | null
}

export { MetaPagination, MetaPaginationLinks }