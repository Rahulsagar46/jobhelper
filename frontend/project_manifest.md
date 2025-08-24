# UI design description

## General rules

- UI should be modern and minimalist
- Use professional color pallete
- Use decent and smooth transitions with shadows and hover effects wherever seems reasaonable
- UI should be compatible with smaller form factors like tablets and mobile phone usage
- All CSS related things has to be placed in a seperate folder.
- Use theming to ensure one central location to choose color pallete
- Use React JS with JSX as the primary language
- The component structure has to be modular and reusable
- Regarding interfaces with back end APIs and OAuth APIs please keep seperate modules and import them into the UI source codes
- Please use python django framework for building backend APIs
- Implement necessary backend API / Authentication functions with basic functionality (like data sanitation after form submit).
  For example: If you build a form in the UI and once the form is submitted, in production the data will be saved to database and there will be a function in the back end API that the UI calls. Please implement this API function but instead of putting data in a database just print out the submitted form elements.
- You are going to build a job listing UI with a feature to provide support information regarding interview process and frequently asked interview questions etc
- Plan code structure in such a way that a human will have to maintain, extend and fine tune your code in the future
- Make sure to follow all principles so as to ensure pretty fast loading times.
- Once the development is done, please include a artifact hierarchy of the code displaying differnt modules at different hierarchy levels.
- For developing a first version of this project use dummy data wherever needed and please keep all the dummy data in one location so that it will be easy for manipulating the data and testing

## Page definition

- Signup / login page
- on-boarding page
- Home page

### Signup / login page

- Provide a page where old users can login and new users can sign up
- Login can be done by following methods
  - using email and password
  - using Linked-in
  - using Gmail
- Please include a hero page in this page
- For sign up collect basic information like Full name, emaild ID and password.
- When the user logs in for the first time or sign up, an onboarding page is shown.
- Please implement data sanitation for form submissions

### on-boarding page

- This only displayed once per user (when the user logs in for the first time)
- In this page, ask basic information like, location, experience level in VLSI domain,
  interested verticals in VLSI domains (use random list for now) for which he / she wants to search for jobs
- Also, give an option to choose 5 favorite companies that user can select from the list of supported companies (use a random list for now).
- This entire process can be skipped if the user wish it
- If the page is not skipped and some preferences are added, this has to be saved to the database

### Home page

- Home page contains 3 columns
  - Left Panel
  - Middle (Main) panel
  - Right panel

#### Left panel

- Left panel is the smallest section that can be compressible (hidden or expanded horizontally on demand)
- Left panel contains tabs like Application documents, Job filter preferences, Notes, Shortcuts to favorite company job listings, saved jobs and applied jobs
- Each subsection on the left panel must be clearly divided for visual clarity
- For the favorite company shortcut in the left panel, display upto 5 companies with their logos which when clicked will display the jobs from those companies that meet the filter criteria

#### Middle (Main) panel

- Middle panel is where the job postings are displayed.
- Job postings can be dsiplayed as grid of Job cards or a list of job cards with the possibility to change the apperance by user click
- Use pagination to display all the results
- Number of entries per page can be changed in pagination with a max limit of 50 per page
- In the pagination block always show total jobs found and the range of job postings that are currently being shown in current page
- Each Job card when clicked will open the Job description in an internal tab in the main section. So, user can easily navigate to search results and recently opened job card details. Keep of limit with maximum of 5 tabs in the Middle panel
- Middle panel must occupy most of the space as this is the most important information for the user
- Each Job posting when opened in full description mode shows three circular progress meters on the top showing the match of the CV with Job description in terms of Experience level, skill level and overall

#### Right panel

Right panel again contains 3 sections: - Top section contains comparative analysis on demand for the Job description and application documents already uploaded. You dont need to implement the functionality but implement UI - Middle section contains information about the interview process of the selected Job (based on the experience level, location and company) and tips to crack this interview (Use some dummy text for this) - Third section contains a chat option to chat with an LLM which helps in clarifying any doubts regarding the job description, company profile and interview process.
