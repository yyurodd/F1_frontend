function getUrls(text) {
    // (https?:\/\/) — ищем http или https, за которыми следует ://
    // [a-z0-9.-]+ — ищем домен (буквы, цифры, точки, дефисы)
    // ([\/?][a-z0-9._?&=/-]*)? — необязательная часть
    const regex = /https?:\/\/[a-z0-9.-]+([\/?][a-z0-9._?&=/-]*)?/gi;

    return text.match(regex) || [];
}

console.log(getUrls("Visit https://example.com and http://site.org/page?id=1"));