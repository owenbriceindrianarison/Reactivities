# Reactivities

The project consists in adding activities defined with certain parameters where other users will then interact with these activities.

A fullstack demo project using .Net 7 and react 18 (with typescript) and redux toolkit

Pattern used on the back: CQRS + Mediator Pattern

## Authors

- [Brice Owen Indrianarison](https://github.com/owenbriceindrianarison)

## Tech Stack

**Client:** React 18, Redux toolkit, Semanti UI

**Server:** .Net 7

## Run Locally

Clone the project

```bash
  git clone https://github.com/owenbriceindrianarison/Reactivities.git
```

Go to the project directory

```bash
  cd Reactivities
```

Install dependencies

```bash
  cd server && dotnet restore
  cd .. && cd web && npm install
```

Start the server

```bash
  cd server/API
  dotnet run

  cd web
  npm run start
```

## Appendix

### Feature done

- API : CQRS + Mediator Pattern - CRUD
- Web : CRUD Activity + Configure Axios & Persist Data Change
- Web : Routing
- API : Fluent Validation
- API : Handling API Error responses
- API : Handling exceptions
- Web : Axios interceptor to handle API error responses
- Web : Form with Formik/Yup & Reusable form input
- API : Identity
  - Adding a user entity
  - Adding an IdentityDbContext
  - Configuring Identity in the startp class
  - Adding Account controller
  - Creating a Token service
  - Creating an auth policy
  - Registering & Login
  - Getting Current User
- Web : Registration & Login & Axios Interceptor
- API : EF Relationship - Loading Related entities - AutoMapper queryable extensions - Adding an infrastructure project
- Web : Attendance
- API : Image Upload
  - Photo storage option
  - Adding photo upload service
  - Using the Cloudinary API
- Web : Pofile Page
  - User photos
  - Photo upload widget
  - React dropzone
  - React Cropper
  - Main photo
  - Delete Photos
- Realtime message :
  - SignaR Transports
  - SignalR Client package

### Feature to do

- Followers
- Paging, Sorting, Filtering
