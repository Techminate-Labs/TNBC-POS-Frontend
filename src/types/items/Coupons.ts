interface CouponItem {
    id: number,
    code: string,
    discount: number,
    start_date: string,
    end_date: string,
    active: number,
    created_at: string,
    updated_at: string
}
export { CouponItem }