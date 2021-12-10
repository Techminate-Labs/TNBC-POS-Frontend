function EmptyCheck(object: any): boolean {
	return Object.keys(object).length === 0
		&& object.constructor === Object;
}

export default EmptyCheck