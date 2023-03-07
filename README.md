# ^.,.^ BlueFox Ninja for CDN

## Build Setup

```bash
# install dependencies
npm install

# build for production with minification
npm run build
```

## Usage

### File include

```HTML
<script src="bluefox.js"></script>
... or
<script src="bluefox.es.js" type="module"></script>
```

### File include(CDN)

```HTML
<script src="https://ooo.bluefox.ooo/js/bluefox.js"></script>
```

### ES6 modules

```JavaScript
import BlueFox from "bluefox.es.js";
```

### for other Domains (ex: scraping)

https://github.com/LobeliaSecurity/BlueFox/tree/main

## Example

```JavaScript
// DOM scope -> https://www.lobeliasecurity.com/BlueFox-Examples/example-1.html

let blueFox = new BlueFox("http://127.0.0.1/burrow"); // your endpoint to report taken values
// https://github.com/LobeliaSecurity/BlueFox/wiki/v0-format-:-JSON
// take -> push
// save -> ret
// capture -> <removed>

blueFox.do(
    {
        "actions":[
            {
                "type":"set",
                "target":"[out]",
                "property":{
                    "textContent":"BlueFox"
                }
            },
            {
                "type":"push",
                "target":"[out]",
                "property":{
                    "textContent":""
                }
            },
            {
                "type":"ret"
            }
        ]
    }
);

/*
    POST(http://127.0.0.1/burrow):application/json -> [{"target":"[out]","property":{"textContent":"BlueFox"}}]
*/
```
