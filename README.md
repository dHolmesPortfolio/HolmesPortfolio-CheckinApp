# HolmesPortfolio check-in app

This web application was created to showcase and practise JavaScript skills.

- It has a check-in and check-out button
- Collects some data and connects to an API
- Record the time in and out automatically

(No data is stored in the demo version, and no real api is used for car details due to api key needed, It does use the .gov.uk holiday API for the nearest holiday).

This product also keeps in mind GDPR and WCAG

This application is designed to be used in a reception environment with staff monitoring it,
such as a tablet and kept on a local network.

# Planning & Documentation

## HW Check-in — User Stories

### Visitors

- As a visitor, I want clear options to check in or out, so I know what action to take.

- As a visitor, I want my details hidden until registration is complete, so my privacy is protected.

- As a visitor, I need to know if my car registration is incorrect.

- As a visitor, I want my vehicle details using the government API, so it’s easier to confirm it’s the right car. (not possible in Demo as this required an API key)

- As a visitor, I want to toggle between check-in and check-out, so I don’t have to enter dates and times manually.

- As a visitor, I want the date and time added automatically.

### Staff

- As staff, I want all visit data recorded safely for car parking and fire registers.

- As staff, I want to export the data when needed, so I can generate reports.

### GDPR & Security

- As an admin, I want the login hidden by default, so the public interface stays simple.

- For GDPR, I want data to clear after export, so personal information is not kept longer than needed.

- For GDPR, I want data encrypted and password protected, so it remains compliant and secure.

## HW Check-in — Process Map

### Core Features

- Option for users to check in or check out
- Application records visit status
- Displays “Checked In” or “Checked Out” state
- All visit data is recorded
- Data can be exported when required (not in demo)

### Data Collection (DOES NOT STORE DATA, THIS IS A DEMO)

The system collects the following information:

- Name
- Date and Time
- Mobile number
- Vehicle Registration Plate

A full car registration is required and matches before showing any data preview (GDPR compliance).

### Holiday aAPI Lookup

- Connects to gov.uk API to retrieve nearest holiday

### Check-in / Check-out Flow

1. User opens application
2. Selects check-in or check-out
3. Enters registration details
4. System validates details
5. Date and time added automatically

### Data Export & Retention

- The demo version focuses on core functionality rather than full enterprise security

### Security & GDPR

- Registration plate required before data is visible
- Complies with GDPR requirements - no data, just refresh

- 📄 User Stories: \docs\UserStories.png
- 🔄 Process Map: \docs\ProcessMap.png
