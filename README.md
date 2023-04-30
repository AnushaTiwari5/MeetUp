# Team M 
## Description
Our project is a web application that can be used to make event organization easier. Organizers can create different polls for various times and locations of the event, and participants can respond to these polls with their availability to attend. The organizer can view the responses in a statistical representation, and a probabilistic model is used to show the organizer the time/location with the most likelihood of attendance. 

## Changes made after Sprint 3 and Member Contribution
- Viewing statistics of responses to the polls of an event			
    -   Completed by Teimur Khan
    -   Organizers can view the responses to the polls of their event as a bar chart for an easy understanding of the likelihood of attendance. 

-	Getting recommendation on the poll with the greatest likelihood of attendance
    -   Completed by Teimur Khan
    -   Organizers can get recommendations of the poll with the greatest likelihood of attendance with the help of the probabilistic model.
    -   Added Finalize Time/Location functionality once a poll ends.

-	Building connections with other users
    -   Completed by Haowei Qing    
    -   Organizers can connect with other users using their email.
    -   User can decide to disconnect some connections.

-   Merging and styling of new pages
    - Completed by Anusha Tiwari

## Overview of Individual Contributions
-	Anusha Tiwari
    -   Worked mainly on the client-side of the application.
    -   Developed landing page, navigation bar, event invitation and user response.
    -   Worked on merging and integrating code of all members on both the frontend and the backend. 
    -   Worked on styling of all client-side pages.
    -   Wrote README and Instructions documents for final submission

-	Teimur Khan 
    -   Worked mainly on the server-side of the application.
    -	Created the tables and queries needed to insert and fetch data from the application into the database for all pages.
    -	Developed logic and front-end of displaying the poll responses as a bar chart.	
    -   Developed probabilistic model to recommend the poll with the most attendance using a [weighted maximum likelihood estimator (see Setion III and IV).](http://www.eg.bucknell.edu/~phys310/skills/data_analysis/mle_intro.pdf)

-	Haowei Qing
    -	Developed create poll page.
    -	Designed and implemented user authentication system.
    -	Developed user connection function with both front and backend.
    -	Developed user dashboard function with both front and backend.
    -	Contributed to some styling and merging.

## Instructions on how to compile and run
-   The application can be accessed using the ec2 link mentioned below. 
-   The application requires a user to be logged in. You could either created your own account, or log in using the credentials listed below. 
-   Further instructions on how to interact with and test the application are mentioned in the provided Instructions_TeamM.pdf

## AWS Link
-   http://ec2-54-174-186-17.compute-1.amazonaws.com:3000
-   PORT: 3000

## Test Credentials
-   Email: meetupevents518@gmail.com
-   Password: MeetupTest123
