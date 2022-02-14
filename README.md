# Warehouse App

This project is to manage the warehouse inventory which consists of creating sales and seeing the sales history.

# Server

Installing server dependencies:

```bash
cd warehouse-api-main
npm install
```

Starting the server:

```bash
npm start
```

# UI

Installing UI dependencies:

```bash
cd frontend
npm install
```

Starting UI:

```bash
npm start
```

Testing UI:

```bash
npm test
```

Building UI prod bundle:

```bash
cd frontend
npm run build
```

# Developer notes / technical decisions

- Create react app is used for a quick start
- App mainly consists of two parts, first part is Product / inventory list and the second part is Sales history
- As these two parts are not directly related to each other in terms of usage, I didn't want to divide the screen, instead I went for tab structure with routing
- Main approach is to divide logic and responsibilities among the components
- So that it becomes easier to maintain states locally (per component), instead of managing all the states centrally
- Regarding error handling, considering BE endpoints not being reliable, I provided try again functionalities for failing calls
- Tailwind is used to reduce the amount of custom CSS and custom CSS is only used for global parts or styling can't be achieved by functional classes
- CSS variables are used to unify some design tokens for example primary color and text color (And 'Noto Sans' font is used for a reason :))

# Possible improvements / nice to haves, if I had more time I would have:

- Solved the issue I had that calling Articles EP multiple times (spent time but couldn't find the solution, apparently call is made in every "ArticleListemItem" component instances on the current page but didn't have time left to understand how to prevent)
- Finished the unit tests
- Implemented adding / removing flows
- Tried to fix a couple of React warnings (When I try I encounter endless loops, don't know why)
