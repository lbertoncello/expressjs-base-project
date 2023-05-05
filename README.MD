Project folder structure

```
.
│   README.md
│   package.json  
│   ...   
│
└─── app
│   └─── main // 5) Framework and Drivers (Infrastructure Layer)
│   │   │   app.js // 5. Application entry point
│   │   │   server.js // start master and forks other workers
│   │   │   config.js // get config from env or config file
│   │   │   database.js
│   │   │   logger.js
│   │   │   ...
│   │
│   └─── models // 1.a) entities (i.e., Mongoose models)
│   │   │   index.js
│   │   │   orders.model.js
│   │   │   ...
│   │
│   └─── data-access // 1.b) entities (i.e., abstraction of Mongoose models)
│   │   │   index.js
│   │   │   orders.db.js
│   │   │   ...
│   │
│   └─── use-cases // 2) Use cases
│   │   └─── orders
│   │   │   │   index.js
│   │   │   │   post-order.js
│   │   │   │   ...
│   │   └─── ...
│   │
│   └─── controllers // 3) Interface Adapters
│   │   │   order.controller.js
│   │   │   ...
│   │
│   └─── routes // 4) Routes
│   │   │   order.routes.js
│   │   │   ...
│   
└─── ...
```