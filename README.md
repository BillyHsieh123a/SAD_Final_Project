# Polaritique

**"EMBRACE THE POWER OF CONTRAST, WHERE EVERY PIECE TELLS A STORY OF TIMELESS STYLE AND BOLD INDIVIDUALITY."**

## Table of Contents
- [Overview](#overview)
- [Frontend](#frontend)
- [Backend](#backend)
- [Database](#database)
- [System Demo](#system-demo)
- [Future Prospects](#future-prospects)

## Overview

Polaritique aims to enhance the online shopping experience by integrating virtual try-on technology powered by Hugging Face API. This allows customers to upload photos and visualize how clothing and accessories would look on them. Additionally, the system provides outfit recommendations based on body shape and personal preferences.

### Challenges in Online Shopping
- Solving the issue of not being able to try on products before purchasing.
- Enhancing interaction between customers and brands.

## Frontend

### References
For the frontend design, we drew inspiration from various online fashion retail platforms, including ASOS and GU (Japan).

### Frontend Design

#### Functionality
- The design concept combines elements of **polarity** and **boutique**.
- The interface follows a **black-and-white minimalist aesthetic**, offering users a smooth browsing experience and a high-end fashion feel.

#### Key Features
- **Homepage Browsing**: Users can explore products categorized by gender and clothing type (e.g., outerwear).
- **Product Search**: A search bar is available for quick product lookup.
- **Shopping Cart**: Fetches and updates cart contents dynamically.
- **User Account**: Displays order history categorized as In Progress, Completed, Canceled, or Returned.
- **Virtual Try-On**: Users can upload images, which are processed by the backend API to generate try-on previews.
- **Checkout Process**: Users can set their default recipient information, modify addresses, and choose payment methods.

#### Tech Stack
- The frontend is built using **HTML, CSS, and JavaScript** without any frontend frameworks.

### Design & Implementation
- UI/UX design was created using **Figma**.
- Implementation follows a structured approach to ensure seamless user interaction.

## Backend

### Backend Design & Implementation

#### Persistent Connection with Database
- The system uses **psycopg2** to connect to the database only once per session, improving efficiency.
- However, if a database connection failure occurs, data retrieval and modifications may be affected.

#### Modularized File Structure
- Each **HTML file** is paired with its corresponding **JavaScript file** containing API calls.
- **Flask Blueprint** is used to separate different functionalities, making the system easier to maintain.

### Try-On Image Generation Challenges
- **Image Processing Issues**: Ensuring accurate and realistic virtual try-on results.
- **Model Fitting Issues**: Improving the precision of clothing alignment on different body types.

## Database

### Database Design
- The system uses a structured database schema to store user information, product details, orders, and transaction history.

## System Demo

[Watch the System Demo on YouTube](https://youtu.be/zoOFwGNFLf4)

## Future Prospects

Looking ahead, we plan to enhance the platform with the following features:
- **Admin Management System**: Admins will be able to:
  - Identify and manage user accounts (e.g., flag suspicious orders, delete or suspend users).
  - Add products with a one-click setup.
- **Membership System**: Introduce membership benefits and exclusive discounts.
- **Product Customization**: Allow users to personalize product options.
- **Enhanced Virtual Try-On**: Improve AI accuracy and expand compatibility with more clothing types.
