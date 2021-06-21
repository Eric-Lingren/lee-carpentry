const DOMPurify = require('dompurify');

const sanitizeData = (dirtyData) => {
    let cleanData = DOMPurify.sanitize(dirtyData)
    cleanData = cleanData.replace(/&lt;/g, '')
    cleanData = cleanData.replace(/&gt;/g, '')
    return cleanData
}

module.exports = sanitizeData