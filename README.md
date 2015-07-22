# register-noop
register noop loader in node.js

```npm install register-noop```

Useful if you are using webpack and hacking some isomorphic things, which import some files that are not javascript in node.js.

For example, to manage stylesheet in webpack you do:
```
var React =  require("react");
require("./style1.sass");
require("./style2.css");

module.export = React.createClass({...});
```

This throws error if you render this on server, since node can not require .sass or anything not js.

With ```register-noop```, you can do this by simply adding comma-delimited file extensions to package.json:
```json
{
  "main": "...",
  "config": {
    "ignore_ext": ".sass,.css"
  }
}
```
