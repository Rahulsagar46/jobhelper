# UI design description

## Basic template

Every page has a header pane containing company branding on the left side and settings and account management on the right side

- Footer contains copyright, support, complaints, feedback links

## Page Overview

### Login & Signup page

A login and sign-up page with options to login using Linked-in, Gmail or with email ID and password.

OAuth with Linked-in and Gmail has to be implemented

### Onboarding page

This page is only shown once immediately after the first sign-in.
An option to choose preferences like location, experience level, domain and choosing favorite companies. (This step has to be optional. user has the option to skip this step and do this a later point in time)

Second step of onboarding is to request CV upload, educational details, experience details etc. In this regard features like autofilling data from uploaded CV or possibilites to enter the data manually has to be supported. Additionally, the possibility to fetch the details from Linked-in should also be tried

### Home page

In this page, there will following components:

#### Left side pane

- could be collapesed to leave more space for the Job info container
- Contains shortcuts to favorite company Job postings
- Preference settings for job search
- Notes
- Uploaded documents overview
- Saved jobs

#### Main body

- Once the user logs into his / her account, the main body displays job offerings from our scraped job postings. If the user has setup a Job search preference, favorite companies in the past, the results displayed will reflect the preferences chosen. If No preference is set by the user, jobs from top companies based on the location of the user are displayed

- Pagination will be both at bottom and top of the Main body with an option to change number of entries per page. This setting is stored for the user for future page loads

- Each job entry description shows basic information about the job like location, job title, company etc.

- Main body section can be tabbed. In this sense, user can open up multiple tabs in the main body container. With first tab reserved for job positng list and the subsequent tabs for showing full job descriptions.

#### Right side pane

Right side pane shows content related to interview process for the chosen job description, experience level and the company

- on top of this pane is a call to action to upload CV and application documents
- If already uploaded, call to action to provide comparative anylsis of CV vs Job description and potential suggestions to improve CV to fit the JD.
- useful suggestions about missing skills and probably links to learning resources.
- At the bottom of pane is an AI chatbox to ask more questions about the provided suggestions and details or about the job description
