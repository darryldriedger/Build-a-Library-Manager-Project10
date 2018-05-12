## Build a library manager

## Models
  - Needs Work
  - Meets Expectations
  - Exceeds Expectations


 ## Home Screen
   - Includes links to all of the following pages, and links lead to the correct page:

   - Books:
   - New Book
   - List All
   - List Overdue
   - List Checked Out
   - Patrons:
   - New Patron
   - List All
   - Loans
   - New Loan
   - List All
   - Overdue
   - List Checked Out
   - Uses Pug to render templates instead of front end framework like Angular

## Navigation

- Includes a main navigation menu that appears on every page.

- Main navigation contains working links to:

- Books (all book listings page)
- Patrons (all patron listing page)
- Loans (all loans listing page)

## Books Listing Page

- Displays table of books with the following columns:

- Book Title
- Author
- Genre
- Year Released (First Published)
- Each book title links to the book's detail page.

- Includes option to filter books by “All”, “Overdue”, and “Checked Out”

- Includes a button to create a new book

## New Book Page

Includes a form to add a new book. Form contains the following fields:

Title (required)
Author (required)
Genre (required)
First Published (optional)
When the form is submitted successfully, user is redirected to the Books Listing Page and the new book appears in the list.

An error is displayed if the form is submitted with blank or invalid data in required fields. For example: “This field is required.”

Uses Sequelize model validation for validating your from fields, and not just HTML5 built in validation.

etc...
