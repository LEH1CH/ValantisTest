# Product List Application

This is a web application that fetches and displays a list of products from an API. Users can navigate through the product list, apply filters based on price, and view detailed information about each product.

## Features

- **Product List**: Display a list of products retrieved from an API.
- **Pagination**: Navigate through the product list using pagination controls.
- **Price Filter**: Filter products by price. Users can specify a price and view products matching that price.
- **Loading Indicator**: Show a loading indicator while fetching data from the API.
- **Duplicate Product Handling**: Handle cases where the API returns duplicate products with the same ID.

## Technologies Used

- **React**: Frontend library for building user interfaces.
- **Axios**: HTTP client for making requests to the API.
- **Bootstrap**: Frontend framework for styling the application.
- **JavaScript (ES6+)**: Programming language for building the application logic.

## Installation
1. Clone the repository to your local machine.
2. Navigate to the project directory.
3. Install dependencies using `npm install`.
4. Start the development server using `npm run dev`.
5. Access the application in your web browser at `http://localhost:5173`.

## Usage

1. Upon loading the application, the list of products will be displayed.
2. Use the pagination controls to navigate between pages of products.
3. Enter a price in the filter input field and click "Filter" to filter products by price.
4. Clear the filter by removing the price value and clicking "Filter" again.
