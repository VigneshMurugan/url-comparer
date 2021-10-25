import isEqual from 'lodash.isequal';

interface Metadata {
    [k: string]: string;
}

export interface compareOptions {
    ignoreHost?: boolean;
    ignorePath?: boolean;
    ignoreProtocol?: boolean;
    ignoreSearchParams?: boolean;
    ignorePort?: boolean;
    ignoreSearchParamCase?: boolean;
    ignoreTrailingURLSlash?: boolean;
}

const extractURLSearchParams = (url: URL, caseInsensitiveKey: boolean = false) => {
    const search = url.searchParams;
    const paramMap: Metadata  = {}; 

    search.forEach((value, key) => {
        paramMap[key] = value
    });

    return Object.keys(paramMap).sort().reduce((acc: Metadata, current: string) => {
        const key = caseInsensitiveKey ? current.toLowerCase() : current;
        acc[key] = paramMap[current]
        return acc;
    }, {})
}

const extractHost = (url: URL) => url.host;

const extractProtocol = (url: URL) => url.protocol;

const extractPath = (url: URL, ignoreTrailingURLSlash = false) => ignoreTrailingURLSlash ? url.pathname.replace(/\/$/, "") : url.pathname;

const extractPort = (url: URL) => url.port;

export const urlCompare = (url1: string, url2: string, options: compareOptions = {}) => {
     
    try {
        const firstURL = new URL(url1);
        const secondURL = new URL(url2);

        //check search params equality
        if(!options.ignoreSearchParams && !isEqual(extractURLSearchParams(firstURL, options.ignoreSearchParamCase), extractURLSearchParams(secondURL, options.ignoreSearchParamCase)))
            return false;

        //check protocol
        if(!options.ignoreProtocol && !isEqual(extractProtocol(firstURL), extractProtocol(secondURL)))
            return false;

        //check host
        if(!options.ignoreHost && !isEqual(extractHost(firstURL), extractHost(secondURL)))
            return false;

        //check path
        if(!options.ignorePath && !isEqual(extractPath(firstURL, options.ignoreTrailingURLSlash), extractPath(secondURL, options.ignoreTrailingURLSlash)))
            return false;
        
        //check port
        if(!options.ignorePort && !isEqual(extractPort(firstURL), extractPort(secondURL)))
            return false;

        return true
    } catch(error) {
        throw new Error(error)
    }
}
