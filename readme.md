# COMP 2132 Final Project - Dice Game

## Requirements

### General Requirements
- The game page should be carefully designed and styled with CSS to present a highquality user experience. Submitting a project with poor or little styling will result in a
greatly reduced final mark.
- There must be at least 6 images used.
- All paths used in HTML, CSS and Javascript files must be relative paths. Do NOT use
server root paths that begin with / or client specific paths like C:/
- HTML, CSS and Javascript files must be free of serious errors (warnings are ok).
- Code must be well tabbed and use descriptive variable names.
- Javascript code must include the use of one or more functions authored by you, and one
or more Objects authored by you.
- Must include at least one Javascript animation (for example, a fade in effect).
- jQuery may be used if desired.
- CSS should be compiled from SASS. SASS file(s) should demonstrate the use of SASS variables and at least one SASS mixin. Both .css and .scss files should be included with the project submission.
- Project must be published to a public repository on Github.com

### Dice Game Requirements

Create a dice game where a user plays against the computer. The user and the computer each
roll a pair of dice 3 times. After the third roll of the dice the player with highest score wins.

The scoring for the game works as follows:
- If any of the players two dice comes up as a 1 then the score for that round for the player
is 0. eg: if the player rolls a 6 and 1, they get a score of 0
- If the player rolls a pair of the same numbers then the players score is the total of the
two dice times 2. eg: if he player rolls 5 and 5, they get a score of (5+5)*2=20
- If the player rolls any other combination of dice other than the ones mentioned above
then the players score is the total value of the two dice, eg: player rolls a 3 and 2, player
gets a score of 3+2=5
The game should provide a text or graphical output showing the following:
- The current rolled dice values for the player and the computer.
- The score for this round for the player and the computer.
- The accumulated total score for the player and computer
The game should provide a button that will do the following: roll a pair dice for the player and
another pair of dice for the computer, calculate the score for each of the player’s then update
the browser display to reflect the state of the game.
After three rolls of the dice the game should total up the scores and display a message
displaying who the winner was.
The game should provide a button that will reset the game and start a new game
