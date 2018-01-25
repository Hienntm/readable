export function turnTimestampToDate(timeStamp) {
    var date = new Date(timeStamp)
    return date.toString().slice(4,15)
}

export function turnArrayToObject(arr) {
	return arr.reduce((obj,item) => {
		obj[item.id]=item
		return obj
	},{})
}
