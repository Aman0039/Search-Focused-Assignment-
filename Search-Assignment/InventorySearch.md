# Inventory Search Application

A full-stack search application built using Node.js, Express, MongoDB, and a simple HTML/CSS/JS frontend.

This project demonstrates backend filtering, flexible search handling, and URL-based frontend state management.


---

## Live Demo

Deployment Link: https://inventory-search-wygs.onrender.com/

- please click on search button to render the product then only you can see the products.

---

## Features

### Search
- Flexible product search (e.g., "iphone13" → "iphone 13")
- Case-insensitive matching
- Regex-based implementation

### Filters
- Category filter
- Price range filter (`minPrice`, `maxPrice`)

### URL State Management
- Search parameters stored in URL
- Shareable search links
- Page reload preserves results

### Deployment
- Backend and frontend served via Express.js
- Deployed on Render

---

## Tech Stack

- Backend: Node.js, Express.js  
- Database: MongoDB (Atlas)  
- Frontend: HTML, CSS, JavaScript  
- Deployment: Render  

---

## Project Structure
```
root/
├── server.js
├── package.json
├── routes/
│ ├── searchRoutes.js
│ ├── inventoryRoutes.js
│ ├── supplierRoutes.js
├── models/
│ ├── Inventory.js
├── public/
│ ├── index.html
│ ├── script.js
│ ├── style.css