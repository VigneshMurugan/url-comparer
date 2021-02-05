# url-comparer

url-comparer is simple tool to compare equality of two urls

url-comparer accepts three arguments. First 2 arguments are urls. 3rd optional argument is compareOptions

```typescript
interface  compareOptions {
	ignoreHost?: boolean;
	ignorePath?: boolean;
	ignoreProtocol?: boolean;
	ignoreSearchParams?: boolean;
	ignorePort?: boolean;
}
```

```javascript
import urlCompare from 'url-comparer';

urlCompare("http://example.com", "http://example.com") //true

/* --PROTOCOL-- */
urlCompare("https://example.com", "http://example.com", { ignoreProtocol: true }) //true

urlCompare("https://example.com", "http://example.com") // false

/* --HOST-- */
urlCompare("https://example.com/subPath", "http://example2.com/subPath", { ignoreHost: true }) //true

urlCompare("https://example.com/subPath", "http://example2.com/subPath") // false

/* --PORT-- */
urlCompare("http://www.example.com:8081/path/", "http://www.example.com:8080/path/", { ignorePort: true }) //true

urlCompare("http://www.example.com:8081/path/", "http://www.example.com:8080/path/") // false
```