# Master Node.js

Implementation of
- AAGPL Auction Backend

Auction Configuration
- Team Configuration
    - Use teams.txt file 
    - Use JSON to fill the values for e.g: {"id":1,"name":"AAGSA","pointsRemaining":120,"playersRemaining":12}
- Player Configuration
    - Use player.txt file
    - Use JSON to fill the values fo e.g: {"id":1,"name":"Sanif Ali","points":0,"allocated":0,"teamId":0}
    - points will be 0 at start, allocated (0 = unallocated, 1 = Drop, 2 = allocated), teamId 0

Post Auction
    - Take copy of teams.txt and players.txt. It contain complete list of players with team they are selected for and their points too. 