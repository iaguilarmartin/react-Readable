export function isEmptyObject(obj) {
	return Object.keys(obj).length === 0 && obj.constructor === Object;
}

export function getPostIdFromURL(url) {
    if (url === '/new-post') {
        return null;
    } else if (url.endsWith('/edit')) {
        const parsedUrl = url.substring(0, url.length - 5);
        const position = parsedUrl.lastIndexOf('/');
        return parsedUrl.slice(position + 1);
    } else {
        const position = url.lastIndexOf('/');
        return url.slice(position + 1);
    }
}