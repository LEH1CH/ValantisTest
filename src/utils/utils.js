import CryptoJS from 'crypto-js'

export function generateAuthHeader(password) {
    const timestamp = new Date().toISOString().slice(0, 10).replace(/-/g, '')
    const authString = `${password}_${timestamp}`
    return CryptoJS.MD5(authString).toString()
}

export function calculateOffset(currentPage, limit) {
    return currentPage > 0 ? (currentPage - 1) * limit : 0;
}


export function removeDuplicates(array, key) {
    return array.filter(
        (item, index, self) =>
        index === self.findIndex((t) => t[key] === item[key])
    )
}