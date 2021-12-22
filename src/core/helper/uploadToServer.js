import uploadService from 'core/API/uploadService.js'

export const uploadToServer = async (file) => { 
    const rs = await uploadService.uploadToServer(file)
    if (!rs || !rs.success) {
        return false
    }
    return rs.data.path
}