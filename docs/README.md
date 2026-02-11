# HolmesPortfolio check-in app

This web application was created to showcase and practise JavaScript skills.

- It will have a check-in and check-out button
- Collect some data
- Record the time in and out automatically

When a vehicle registration is entered, the system uses an external API to retrieve vehicle details. All visit data can be stored securely within a database (no data is stored in the demo version).

This product also keeps in mind GDPR and WCAG

This application is designed to be used in a reception environment with staff monitoring it,
such as a tablet and kept on a local network.

# Planning & Documentation

## HW Check-in — User Stories

### Visitors

- As a visitor, I want clear options to check in or out, so I know what action to take.

- As a visitor, I want my details hidden until registration is complete, so my privacy is protected.

- As a visitor, I need to know if my car registration is incorrect.

- As a visitor, I want my vehicle details using the government API, so it’s easier to confirm it’s the right car.

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

### Data Collection

The system collects the following information:

- Name
- Date and Time
- mobile number
- Vehicle Registration Plate

A full car registration is required before showing any data preview (GDPR compliance).

### Vehicle Lookup

- Connects to gov.uk to retrieve vehicle details
- Stores vehicle information

### Check-in / Check-out Flow

1. User opens application
2. Selects check-in or check-out
3. Enters registration details
4. System validates details
5. Date and time added automatically
6. Status is updated
7. Data is stored securely (none stored in demo)

### Data Export & Retention

- Security best practices are considered in the system design
- The demo version focuses on core functionality rather than full enterprise security

### Security & GDPR

- Registration plate required before data is visible
- Complies with GDPR requirements

- 📄 User Stories: \docs\UserStories.png
- 🔄 Process Map: \docs\ProcessMap.png
