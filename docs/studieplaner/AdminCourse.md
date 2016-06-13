Story: Administrate Course


PRIORITY 1. In order to administrate courses.
As a teacher I want to add/edit/delete courses on the website calendar.

Scenario 1: Create new Course
Given that I am logged in on the website as a valid user.
When I click new Course Then I should be able to fill in all attributes for a new Course.
Or IF the date is already occupied by another course, THEN I should a dialog to warn me about the conflict.

Scenario 2: Edit existing Course
Given that I am logged in on the website as a valid user.
When I click on a existing Course
And I then click Edit
Then I should be able to fill in the new attributes for the current Course.
Or IF the new date is already occupied by another course,
THEN I should a dialog to warn me about the conflict.

Scenario 3: Delete existing Course
Given that I am logged in on the website as a valid user.
When I click on a existing Course
And I then click Delete And I get a ”Confirm Delete” dialog
Then I the deleted course should be deleted from the calendar.
