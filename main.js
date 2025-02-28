let jsonData = [];
let selectedWeek = null;

fetch("assets/json/teams_season2.json")
  .then(response => response.json())
  .then(data => {
    jsonData = data;
  });

function selectWeek(weekNumber) {
  selectedWeek = weekNumber;
  document.getElementById("content").innerHTML = 
  
  
  `<h2>Week ${weekNumber} - Select a Team</h2><div id="teamsContainer"></div>`;

  
  showTeams();
}

function showTeams() {
  const container = document.getElementById("teamsContainer");
  container.innerHTML = "<h3>Select a Team</h3>";

  jsonData.forEach(team => {
    const btn = document.createElement("button");
    btn.textContent = team.Team;
    btn.onclick = () => showPlayers(team.Team);
    container.appendChild(btn);
  });
}

function showPlayers(teamName) {
  const team = jsonData.find(t => t.Team === teamName);
  const container = document.getElementById("teamsContainer");
  container.innerHTML = `<h2>${team.Team} Roster</h2>
  <button onclick="showTeams()"><- Back to Teams</button>`;

  team.roster.forEach(player => {
    const btn = document.createElement("button");
    btn.textContent = player.name;
    btn.onclick = () => editStats(teamName, player.name);
    container.appendChild(btn);
  });
}

function editStats(teamName, playerName) {
  const team = jsonData.find(t => t.Team === teamName);
  const player = team.roster.find(p => p.name === playerName);
  const gameStats = player.stats.find(s => s.game_number === selectedWeek);

  document.getElementById("teamsContainer").innerHTML = `
    <h2>Edit Stats for ${player.name} (Week ${selectedWeek})</h2>
    <label>Points: <input type="number" id="points" value="${gameStats.Points}"></label><br>
    <label>Field Goals Made: <input type="number" id="fgm" value="${gameStats.FieldGoalsMade}"></label><br>
    <label>Field Goal Attempts: <input type="number" id="fga" value="${gameStats.FieldGoalAttempts}"></label><br>
    <label>Threes Made: <input type="number" id="threesMade" value="${gameStats.ThreesMade}"></label><br>
    <label>Threes Attempts: <input type="number" id="threesAttempts" value="${gameStats.ThreesAttempts}"></label><br>
    <label>Free Throws Made: <input type="number" id="ftm" value="${gameStats.FreeThrowsMade}"></label><br>
    <label>Free Throws Attempts: <input type="number" id="fta" value="${gameStats.FreeThrowsAttempts}"></label><br>
    <label>Total Rebounds: <input type="number" id="rebounds" value="${gameStats.Rebounds}"></label><br>
    <label>Offensive Rebounds: <input type="number" id="offRebounds" value="${gameStats.Offrebounds}"></label><br>
    <label>Defensive Rebounds: <input type="number" id="defRebounds" value="${gameStats.Defrebounds}"></label><br>
    <label>Assists: <input type="number" id="assists" value="${gameStats.Assists}"></label><br>
    <label>Blocks: <input type="number" id="blocks" value="${gameStats.Blocks}"></label><br>
    <label>Steals: <input type="number" id="steals" value="${gameStats.Steals}"></label><br>
    <label>Turnovers: <input type="number" id="turnovers" value="${gameStats.Turnovers}"></label><br>
    <label>Personal Fouls: <input type="number" id="fouls" value="${gameStats.PersonalFouls}"></label><br>
    <button onclick="showPlayers('${teamName}')"><- Back to Players</button>
    <button onclick="saveStats('${teamName}', '${playerName}')">Save Stats</button>
  `;
}

function saveStats(teamName, playerName) {
  const team = jsonData.find(t => t.Team === teamName);
  const player = team.roster.find(p => p.name === playerName);
  const gameStats = player.stats.find(s => s.game_number === selectedWeek);

  gameStats.Points = parseInt(document.getElementById("points").value);
  gameStats.FieldGoalsMade = parseInt(document.getElementById("fgm").value);
  gameStats.FieldGoalAttempts = parseInt(document.getElementById("fga").value);
  gameStats.ThreesMade = parseInt(document.getElementById("threesMade").value);
  gameStats.ThreesAttempts = parseInt(document.getElementById("threesAttempts").value);
  gameStats.FreeThrowsMade = parseInt(document.getElementById("ftm").value);
  gameStats.FreeThrowsAttempts = parseInt(document.getElementById("fta").value);
  gameStats.Rebounds = parseInt(document.getElementById("rebounds").value);
  gameStats.Offrebounds = parseInt(document.getElementById("offRebounds").value);
  gameStats.Defrebounds = parseInt(document.getElementById("defRebounds").value);
  gameStats.Assists = parseInt(document.getElementById("assists").value);
  gameStats.Blocks = parseInt(document.getElementById("blocks").value);
  gameStats.Steals = parseInt(document.getElementById("steals").value);
  gameStats.Turnovers = parseInt(document.getElementById("turnovers").value);
  gameStats.PersonalFouls = parseInt(document.getElementById("fouls").value);

  alert(`Updated ${playerName}'s stats for Week ${selectedWeek}`);
}
