# Patient Booking System

This mockup is a simple patient appointment booking platform built with React and Vite. The app allows a patient to choose a physician, select an available appointment time, submit their contact details, reason for visit, and create a booking request. It also includes a basic physician/admin view where upcoming bookings can be seen and updated with statuses such as pending, confirmed, or cancelled.

## How to Run the Project

1. Run the script:
./run.sh
2. Open the local URL shown in the terminal, usually:
http://localhost:5173/


The app includes:

- Physician selection
- Available appointment time selection
- Patient details form
- Reason-for-visit field
- Booking creation
- Admin booking list
- Booking statuses
- Double-booking prevention
- Local storage persistence so bookings remain after refreshing the page

## Key Technical/Product Decisions

- I used React with Vite because it provides a lightweight and fast setup for building a frontend  without unnecessary infrastructure.
- I used Mock data instead of a backend database because the exercise focuses on product functionality, implementation, and tradeoffs rather than being product ready.
- I stored bookings in local storage so submitted appointments persist after refreshing the page.
- New appointment requests are created with a default status of 'pending', since a physician or admin would typically review the request before confirming it.
- I prevented double booking by disabling already booked appointment slots for active bookings. Cancelled bookings free up the appointment slot again.
- I kept the app structure simple by separating the main app state in `App.jsx` from reusable UI components such as physician cards, appointment slot selection, the booking form, and the admin bookings view.

## What I Would Improve With More Time

- Improve the layout and navigation for a smoother user experience
- Although I tried to make it mobile friendly, with more time  I  would improve mobile responsiveness and visual polish
- Add a real backend and database so bookings could be stored securely and shared across users/devices.
- Add authentication and separate accounts for patients, physicians, and admins.
- Add stronger form validation
- Add email or SMS notifications when an appointment is requested, confirmed, or cancelled.
- Add calendar integration so confirmed appointments could sync with a physician's calendar.
- Improve accessibility and keyboard navigation for the booking flow.
- Add automated tests for booking creation, status updates, etc

## Tech Stack 

- React
- Vite
- JavaScript
- CSS
- Mock data
- localStorage
