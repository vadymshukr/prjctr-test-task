export const sanitizeConf = {
    allowedTags: ['b', 'i', 'em', 'strong', 'a', 'p', 'h1', 'img', 'span'],
    allowedAttributes: { a: ["href"], img: ['src'] }
};

export const sanitizeNoTagsConf = {
    allowedTags: []
}