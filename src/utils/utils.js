const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/g

export function isUrl(path) {
    reg.lastIndex = 0
    return reg.test(path)
}
export const json2formData = json => {
    if (Object.prototype.toString.call(json) !== '[object Object]') {
        return json
    }

    const formData = new FormData()
    for (const [key, value] of Object.entries(json)) {
        formData.append(key, value)
    }
    return formData
}
export const formatDuring = mss => {
    if (isNaN(mss)) return "00:00"
    mss = Math.round(mss)
    var days = parseInt(mss / (60 * 60 * 24))
    var hours = parseInt((mss % (60 * 60 * 24)) / (60 * 60))
    var minutes = parseInt((mss % (60 * 60)) / 60)
    var seconds = mss % 60
    hours = hours < 10 ? '0' + hours : hours
    minutes = minutes < 10 ? '0' + minutes : minutes
    seconds = seconds < 10 ? '0' + seconds : seconds
    return minutes + ':' + seconds
}
