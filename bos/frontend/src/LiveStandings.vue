<template>
  <div class="standings-page">
    <header>
      <h1>BATTLE OF SNIPERS</h1>
      <h2>SEASON 7</h2>
      <p :class="{ 'verified-subtitle': verified }"> {{ verified ? "LIVE TOURNAMENT STANDINGS" : "PLAYER VERIFICATION" }} </p>
    </header>

    <!-- Step 1: Verify FF UID -->
    <section v-if="!verified" class="standings-card">
      <h3>Verify Your FF UID</h3>
      <p>Enter your registered Free Fire UID to continue.</p>
      <form @submit.prevent="verifyUid">
        <input v-model="ffUid" type="text" inputmode="numeric" maxlength="20" placeholder="Enter Free Fire UID" autocomplete="off" required 
        @input="ffUid = ffUid.replace(/[^0-9]/g, '')" />
        <button type="submit" :disabled="loading">
          {{ loading ? "VERIFYING..." : "VERIFY & VIEW STANDINGS" }}
        </button>
      </form>
      <p v-if="message" class="error-message">{{ message }}</p>
    </section>

    <!-- Step 2: Show only after successful verification -->
    <section v-else class="standings-card">
      <div v-if="seasonView === 'dashboard'">
        <h3 class="verified-success-title">UID Verified Successfully!</h3>
        <div class="player-details">
          <div class="player-info-row">
            <p><strong>Player: </strong>{{ playerName }}</p>
            <button class="page-back-btn" @click="goBack"> Back </button>
          </div>
          <p><strong>FF UID: </strong>{{ verifiedUid }}</p>
          <p><strong>Team: </strong>{{ teamName }}</p>
          <p><strong>Group: </strong>{{ playerGroup ? `GROUP ${playerGroup}` : "NOT ASSIGNED YET" }}</p>
        </div>
        <div class="scheduled-matches-section">
          <h2>Scheduled Matches</h2>
          <p v-if="scheduledMatchesLoading"> Loading scheduled matches... </p>
          <p v-else-if="scheduledMatchesError" class="error-message"> {{ scheduledMatchesError }} </p>
          <p v-else-if="scheduledMatches.length === 0"> No scheduled matches available yet. </p>
          <div v-else class="scheduled-matches-list">
            <div v-for="match in scheduledMatches" :key="match._id" class="scheduled-match-card">
              <div class="scheduled-match-header">
                <span>Group {{ match.group }}</span>
                <span>
  {{
    new Date(match.matchDate).toLocaleString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    })
  }}
</span>
              </div>
              <div class="scheduled-match-teams">

  <div class="scheduled-team scheduled-team-left">
    <img
      v-if="match.team1Id?.teamLogo"
      :src="match.team1Id.teamLogo"
      :alt="match.team1Name + ' logo'"
      class="scheduled-team-logo"
    />
    <strong>{{ match.team1Name }}</strong>
  </div>

  <span class="scheduled-match-vs">VS</span>

  <div class="scheduled-team scheduled-team-right">
    <strong>{{ match.team2Name }}</strong>
    <img
      v-if="match.team2Id?.teamLogo"
      :src="match.team2Id.teamLogo"
      :alt="match.team2Name + ' logo'"
      class="scheduled-team-logo"
    />
  </div>

</div>
              <p class="scheduled-match-assigned"> Assigned to: {{ match.assignedTo }} </p>
            </div>
          </div>
        </div>
        
        <!-- PAST SEASONS BUTTON ON DASHBOARD -->
        <div class="past-seasons-entry">
          <button type="button" class="past-seasons-button" @click="openSeasonsPage">
            <span class="past-seasons-icon">🏆</span>
            <span><strong>PAST SEASONS</strong><small>View completed tournaments</small></span>
          </button>
        </div>
        
        <div class="player-group-assignment">
          <p class="group-assignment-label">YOUR TEAM GROUP</p>
          <h2 v-if="playerGroup"> YOU ARE ASSIGNED TO <span>GROUP {{ playerGroup }}</span> </h2>
          <h2 v-else> GROUP NOT ASSIGNED YET </h2>
        </div>

        <div class="points-section">
          <h3>LIVE POINTS TABLE</h3>
          <p v-if="pointsError" class="error-message">{{ pointsError }}</p>
          <div v-for="groupName in ['A', 'B']" :key="groupName" class="points-group">
            <h4>GROUP {{ groupName }}</h4>
            <div class="table-scroll">
              <table>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Logo</th>
                    <th>Team</th>
                    <th>P</th>
                    <th>W</th>
                    <th>L</th>
                    <th>Round Pts</th>
                    <th>Total Pts</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(team, index) in pointsGroups[groupName]" :key="team.registrationId || team._id || index">
                    <td class="rank-cell">
  <span>{{ index + 1 }}</span>

  <span
    v-if="team.rankChange > 0"
    class="rank-change rank-up"
    :aria-label="`Moved up ${team.rankChange} positions`"
  >
    ↑ {{ team.rankChange }}
  </span>

  <span
    v-else-if="team.rankChange < 0"
    class="rank-change rank-down"
    :aria-label="`Moved down ${-team.rankChange} positions`"
  >
    ↓ {{ -team.rankChange }}
  </span>
</td>
                    <td class="logo-cell">
                      <img v-if="team.teamLogo" :src="team.teamLogo" :alt="team.teamName + ' logo'" class="points-team-logo"/>
                      <span v-else class="no-logo">—</span>
                    </td>
                    <td>{{ team.teamName }}</td>
                    <td>{{ (team.won || 0) + (team.lost || 0) }}</td>
                    <td>{{ team.won || 0 }}</td>
                    <td>{{ team.lost || 0 }}</td>
                    <td>{{ team.roundsPoints || 0 }}</td>
                    <td class="total-points"> {{ team.totalPoints || 0 }} </td>
                    <td>
                      <span  v-if="team.qualificationStatus === 'Q'" class="qualification-badge qualified"> Q </span>
                      <span v-else-if="team.qualificationStatus === 'E'" class="qualification-badge eliminated"> E </span>
                      <span v-else>—</span>
                    </td>
                  </tr>
                  <tr v-if="pointsGroups[groupName].length === 0">
                    <td colspan="9">No teams in this group yet.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <!-- SEASONS LIST PAGE -->
      <div v-else-if="seasonView === 'seasons'" class="season-page">
        <button type="button" class="season-back-button" @click="backToDashboard"> Back </button>
        <h2>🏆 PAST SEASONS</h2>
        <p v-if="seasonsLoading">Loading seasons...</p>
        <p v-else-if="seasonsError" class="error-message"> {{ seasonsError }} </p>
        <p v-else-if="seasons.length === 0"> No completed seasons available yet. </p>
        <div v-else class="seasons-grid">
          <button  v-for="season in seasons" :key="season._id || season.seasonNumber" type="button" class="season-card" @click="openSeason(season.seasonNumber)">
            <span class="season-card-label">BATTLE OF SNIPERS</span>
            <strong>{{ season.title }}</strong>
            <span class="season-card-status">{{ season.status }}</span>
            <span class="season-card-action">VIEW SEASON </span>
          </button>
        </div>
      </div>
      
      <!-- SELECTED SEASON DETAILS PAGE -->
      <div v-else-if="seasonView === 'details'" class="season-page">
        <button type="button" class="season-back-button" @click="backToSeasons"> Back </button>
        <button type="button" class="season-back-button" @click="openSeasonMatches"> Matches </button>
        <button v-if="hasPlayoffs(selectedSeason) && Number(selectedSeason.seasonNumber) !== 5" type="button" class="season-back-button" @click="openSeasonPlayoffs"> 🏆 Playoffs </button>
        <template v-if="selectedSeason">
          <h2>{{ selectedSeason.title }}</h2>
          <p class="season-page-subtitle">Final Standings</p>
        </template>
        <p v-if="seasonDetailsLoading">Loading season details...</p>
        <p v-else-if="seasonDetailsError" class="error-message"> {{ seasonDetailsError }} </p>
        <!-- SEASON 5: GRAND FINAL INSTEAD OF STANDINGS -->
        <div v-else-if="selectedSeason && Number(selectedSeason.seasonNumber) === 5" class="season-five-final">
          <div class="season-five-final-header">
            <span class="season-five-kicker">BATTLE OF SNIPERS</span>
            <h3>🏆 GRAND FINAL 🏆</h3>
            <span class="season-five-format">BO5</span>
          </div>
          <div class="season-five-date"> TOURNAMENT FINAL </div>
          <div class="season-five-team winner">
            <span>Strange Gaming</span>
            <strong>3</strong>
          </div>
          <div class="season-five-team runner-up">
            <span>MRAK</span>
            <strong>2</strong> 
          </div>
          <div class="season-five-champion">
            <span class="season-five-trophy">♛</span>    
            <span class="season-five-champion-label"> BOS SEASON 5 CHAMPION </span>
            <strong>Strange Gaming</strong>
            <span class="season-five-runner-up"> 🥈 Runner-up: MRAK </span>
          </div>
        </div>
        
        <!-- SEASON 4: GROUP A AND GROUP B -->
        <div v-else-if="selectedSeason && [4, 6].includes(Number(selectedSeason.seasonNumber))" class="season-groups-grid">
          <section v-for="group in getSeasonGroups(selectedSeason)" :key="group.name" class="season-group-table">
            <h3>GROUP {{ group.name }}</h3>
            <div class="season-table-scroll">
              <table class="season-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Team</th>
                    <th v-for="column in getSeasonColumns(selectedSeason)" :key="column.key">{{ column.label }}</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="team in group.teams" :key="`${group.name}-${team.rank}`">
                    <td>{{ team.rank }}</td>
                    <td>{{ team.name }}</td>
                    <td v-for="column in getSeasonColumns(selectedSeason)" :key="column.key">{{ getSeasonStat(team, column.key) }}</td>
                    <td><span v-if="team.status === 'CHAMPION'" class="season-result-badge season-champion"> 🏆 CHAMPION </span>
                      <span v-else-if="team.status === 'RUNNER-UP'" class="season-result-badge season-runner-up"> 🥈 RUNNER-UP </span>
                      <span v-else-if="team.status === 'Q'" class="season-qualification-badge season-qualified"> Q </span>
                      <span v-else-if="team.status === 'E'" class="season-qualification-badge season-eliminated"> E </span>
                      <span v-else-if="Number(team.rank) <= 8" class="season-qualification-badge season-qualified"> Q </span>
                      <span v-else class="season-qualification-badge season-eliminated"> E </span>
                    </td>
                  </tr>

          <tr v-if="group.teams.length === 0">
            <td :colspan="getSeasonColumns(selectedSeason).length + 3">
              No teams in this group yet.
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</div>
        <div v-else-if="selectedSeason" class="season-table-scroll">
          <table class="season-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Team</th>
                <th v-for="column in getSeasonColumns(selectedSeason)" :key="column.key"> {{ column.label }} </th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="team in selectedSeason.standings" :key="team.rank">
                <td>{{ team.rank }}</td>
                <td>{{ team.name }}</td>
                <td v-for="column in getSeasonColumns(selectedSeason)" :key="column.key"> {{ getSeasonStat(team, column.key) }} </td>
                <td>
                  <span v-if="team.status === 'CHAMPION'" class="season-result-badge season-champion"> 🏆 CHAMPION </span>
                  <span v-else-if="team.status === 'RUNNER-UP'" class="season-result-badge season-runner-up"> 🥈 RUNNER-UP </span>
                  <span v-else-if="team.status === 'E'" class="season-qualification-badge season-eliminated"> E </span>
                  <span v-else-if="selectedSeason.seasonNumber === 4 && team.status === 'Q'" class="season-qualification-badge season-qualified"> Q </span>
                  <span v-else-if="Number(team.rank) <= 4" class="season-qualification-badge season-qualified"> Q </span>
                  <span v-else class="season-qualification-badge season-eliminated"> E </span>
                </td>
              </tr>
              <tr v-if="!selectedSeason.standings?.length">
                <td :colspan="getSeasonColumns(selectedSeason).length + 3"> 
                  No standings available for this season.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      
      <!-- SEASON 1 AND SEASON 3 PLAYOFF BRACKET -->
      <div v-if="seasonView === 'playoffs' && selectedSeason?.playoffs" class="playoff-section">
        <button type="button" class="season-back-button" @click="backFromPlayoffs"> Back </button>

        <div class="playoff-heading">
          <span class="playoff-kicker">BATTLE OF SNIPERS</span>
          <h2>PLAYOFF BRACKET</h2>
          <p>{{ selectedSeason.title.toUpperCase() }} · ROAD TO CHAMPION</p>
        </div>

        <!-- SEASON 1 FORMAT -->
        <div
          v-if="selectedSeason.seasonNumber === 1"
          class="playoff-bracket season-one-bracket"
        >
          <div class="semi-finals-column">

            <article
              v-for="semi in selectedSeason.playoffs.semiFinals"
              :key="semi.matchNumber"
              class="playoff-match semi-final-card"
            >
              <div class="playoff-card-heading">
                <span>SEMI-FINAL {{ semi.matchNumber }}</span>
                <span class="playoff-format">{{ semi.format }}</span>
              </div>

              <p class="playoff-date">{{ semi.date }}</p>

              <div
                v-for="teamKey in ['team1', 'team2']"
                :key="teamKey"
                class="playoff-team-row"
                :class="{
                  'playoff-team-winner': semi.winner === semi[teamKey]
                }"
              >
                <span class="playoff-team-name">{{ semi[teamKey] }}</span>

                <strong class="playoff-score">
                  {{ semi[teamKey === 'team1' ? 'score1' : 'score2'] }}
                </strong>
              </div>
              <div class="playoff-route-note">
  <span class="route-winner" v-if="semi.winner">
    ✓ {{ semi.winner }} → GRAND FINAL
  </span>

  <span class="route-loser" v-if="semi.winner">
    ✕ {{ semi.winner === semi.team1 ? semi.team2 : semi.team1 }} → ELIMINATED
  </span>
</div>
            </article>

          </div>

          <div class="playoff-connectors" aria-hidden="true">
            <div class="connector-line connector-top"><span>→</span></div>
            <div class="connector-line connector-bottom"><span>→</span></div>
          </div>

          <article
            v-if="selectedSeason.playoffs.grandFinal"
            class="playoff-match grand-final-card"
          >
            <div class="playoff-card-heading grand-final-heading">
              <span>♛ GRAND FINAL ♛</span>
              <span class="playoff-format">
                {{ selectedSeason.playoffs.grandFinal.format }}
              </span>
            </div>

            <p class="playoff-date">
              {{ selectedSeason.playoffs.grandFinal.date }}
            </p>

            <div
              v-for="teamKey in ['team1', 'team2']"
              :key="teamKey"
              class="final-team-row"
              :class="{
                'playoff-team-winner':
                  selectedSeason.playoffs.grandFinal.winner ===
                  selectedSeason.playoffs.grandFinal[teamKey]
              }"
            >
              <span>{{ selectedSeason.playoffs.grandFinal[teamKey] }}</span>
              <strong>
                {{ selectedSeason.playoffs.grandFinal[
                  teamKey === 'team1' ? 'score1' : 'score2'
                ] }}
              </strong>
            </div>

            <div class="champion-panel">
              <span class="champion-trophy">♛</span>
              <span class="champion-label">
                {{ selectedSeason.title.toUpperCase() }} CHAMPION
              </span>
              <strong>{{ selectedSeason.playoffs.grandFinal.winner }}</strong>
              <span class="runner-up-label">
                Runner-up: {{ selectedSeason.playoffs.grandFinal.runnerUp }}
              </span>
            </div>
          </article>
        </div>

        <!-- SEASON 3 FORMAT -->
        <div
          v-else-if="selectedSeason.seasonNumber === 3"
          class="season-three-bracket"
        >

          <!-- ROUND 1: SEMI-FINAL 1 AND ELIMINATOR -->
          <div class="playoff-round-column">

            <article
              class="playoff-match semi-final-card"
            >
              <div class="playoff-card-heading">
                <span>SEMI-FINAL 1</span>
                <span class="playoff-format">
                  {{ selectedSeason.playoffs.semiFinals[0]?.format || 'BO3' }}
                </span>
              </div>

              <p class="playoff-date">
                {{ selectedSeason.playoffs.semiFinals[0]?.date }}
              </p>

              <div
                v-for="teamKey in ['team1', 'team2']"
                :key="teamKey"
                class="playoff-team-row"
                :class="{
                  'playoff-team-winner':
                    selectedSeason.playoffs.semiFinals[0]?.winner ===
                    selectedSeason.playoffs.semiFinals[0]?.[teamKey]
                }"
              >
                <span class="playoff-team-name">
                  {{ selectedSeason.playoffs.semiFinals[0]?.[teamKey] }}
                </span>

                <strong class="playoff-score">
                  {{ selectedSeason.playoffs.semiFinals[0]?.[
                    teamKey === 'team1' ? 'score1' : 'score2'
                  ] }}
                </strong>
              </div>
              <div class="playoff-route-note">
  <span class="route-winner">
    ✓ {{ selectedSeason.playoffs.semiFinals[0]?.winner }} → GRAND FINAL
  </span>
  <span class="route-loser" v-if="selectedSeason.playoffs.semiFinals[0]?.winner">
  ✕ {{
    selectedSeason.playoffs.semiFinals[0].winner === selectedSeason.playoffs.semiFinals[0].team1
      ? selectedSeason.playoffs.semiFinals[0].team2
      : selectedSeason.playoffs.semiFinals[0].team1
  }} → SEMI-FINAL 2
</span>
</div>
            </article>

            <article
              v-if="selectedSeason.playoffs.eliminator"
              class="playoff-match semi-final-card eliminator-card"
            >
              <div class="playoff-card-heading">
                <span>ELIMINATOR</span>
                <span class="playoff-format">
                  {{ selectedSeason.playoffs.eliminator.format || 'BO1' }}
                </span>
              </div>

              <p class="playoff-date">
                {{ selectedSeason.playoffs.eliminator.date }}
              </p>

              <div
                v-for="teamKey in ['team1', 'team2']"
                :key="teamKey"
                class="playoff-team-row"
                :class="{
                  'playoff-team-winner':
                    selectedSeason.playoffs.eliminator.winner ===
                    selectedSeason.playoffs.eliminator[teamKey]
                }"
              >
                <span class="playoff-team-name">
                  {{ selectedSeason.playoffs.eliminator[teamKey] }}
                </span>

                <strong class="playoff-score">
                  {{ selectedSeason.playoffs.eliminator[
                    teamKey === 'team1' ? 'score1' : 'score2'
                  ] }}
                </strong>
              </div>
              <div class="playoff-route-note">
  <span class="route-winner">
    ✓ {{ selectedSeason.playoffs.eliminator.winner }} → SEMI-FINAL 2
  </span>
  <span class="route-loser" v-if="selectedSeason.playoffs.eliminator?.winner">
  ✕ {{
    selectedSeason.playoffs.eliminator.winner === selectedSeason.playoffs.eliminator.team1
      ? selectedSeason.playoffs.eliminator.team2
      : selectedSeason.playoffs.eliminator.team1
  }} → ELIMINATED
</span>
</div>
            </article>

          </div>

          <!-- ROUND 2: SEMI-FINAL 2 -->
          <div class="playoff-round-column playoff-round-middle">

            <article
              class="playoff-match semi-final-card"
            >
              <div class="playoff-card-heading">
                <span>SEMI-FINAL 2</span>
                <span class="playoff-format">
                  {{ selectedSeason.playoffs.semiFinals[1]?.format || 'BO3' }}
                </span>
              </div>

              <p class="playoff-date">
                {{ selectedSeason.playoffs.semiFinals[1]?.date }}
              </p>

              <div
                v-for="teamKey in ['team1', 'team2']"
                :key="teamKey"
                class="playoff-team-row"
                :class="{
                  'playoff-team-winner':
                    selectedSeason.playoffs.semiFinals[1]?.winner ===
                    selectedSeason.playoffs.semiFinals[1]?.[teamKey]
                }"
              >
                <span class="playoff-team-name">
                  {{ selectedSeason.playoffs.semiFinals[1]?.[teamKey] }}
                </span>

                <strong class="playoff-score">
                  {{ selectedSeason.playoffs.semiFinals[1]?.[
                    teamKey === 'team1' ? 'score1' : 'score2'
                  ] }}
                </strong>
              </div>
              <div class="playoff-route-note">
  <span class="route-winner">
    ✓ {{ selectedSeason.playoffs.semiFinals[1]?.winner }} → GRAND FINAL
  </span>
<span class="route-loser" v-if="selectedSeason.playoffs.semiFinals[1]?.winner">
  ✕ {{
    selectedSeason.playoffs.semiFinals[1].winner === selectedSeason.playoffs.semiFinals[1].team1
      ? selectedSeason.playoffs.semiFinals[1].team2
      : selectedSeason.playoffs.semiFinals[1].team1
  }} → ELIMINATED
</span>
</div>
            </article>

          </div>

          <!-- ROUND 3: GRAND FINAL -->
          <div class="playoff-round-column playoff-round-final">

            <article
              v-if="selectedSeason.playoffs.grandFinal"
              class="playoff-match grand-final-card"
            >
              <div class="playoff-card-heading grand-final-heading">
                <span>♛ GRAND FINAL ♛</span>
                <span class="playoff-format">
                  {{ selectedSeason.playoffs.grandFinal.format || 'BO5' }}
                </span>
              </div>

              <p class="playoff-date">
                {{ selectedSeason.playoffs.grandFinal.date }}
              </p>

              <div
                v-for="teamKey in ['team1', 'team2']"
                :key="teamKey"
                class="final-team-row"
                :class="{
                  'playoff-team-winner':
                    selectedSeason.playoffs.grandFinal.winner ===
                    selectedSeason.playoffs.grandFinal[teamKey]
                }"
              >
                <span>
                  {{ selectedSeason.playoffs.grandFinal[teamKey] }}
                </span>

                <strong>
                  {{ selectedSeason.playoffs.grandFinal[
                    teamKey === 'team1' ? 'score1' : 'score2'
                  ] }}
                </strong>
              </div>

              <div class="champion-panel">
                <span class="champion-trophy">♛</span>
                <span class="champion-label">
                  {{ selectedSeason.title.toUpperCase() }} CHAMPION
                </span>
                <strong>
                  {{ selectedSeason.playoffs.grandFinal.winner }}
                </strong>
                <span class="runner-up-label">
                  Runner-up: {{ selectedSeason.playoffs.grandFinal.runnerUp }}
                </span>
              </div>
            </article>

          </div>
        </div>

        <!-- DYNAMIC PLAYOFF FORMAT -->
        <div
          v-else-if="
            Array.isArray(selectedSeason.playoffs.rounds) &&
            selectedSeason.playoffs.rounds.length > 0
          "
          class="dynamic-playoff-bracket"
        >
          <!-- Automatically render every playoff round -->
          <div
            v-for="(round, roundIndex) in selectedSeason.playoffs.rounds"
            :key="round.name || roundIndex"
            class="playoff-round-column"
          >
            <h3 class="dynamic-round-title">
              {{ round.name || `ROUND ${roundIndex + 1}` }}
            </h3>

            <!-- Automatically render every match in this round -->
            <article
              v-for="(match, matchIndex) in (round.matches || [])"
              :key="match._id || matchIndex"
              class="playoff-match"
            >
              <div class="playoff-card-heading">
                <span>
                  {{ match.name || round.name || `Match ${matchIndex + 1}` }}
                </span>

                <span class="playoff-format">
                  {{ match.format || 'BO3' }}
                </span>
              </div>

              <p v-if="match.date" class="playoff-date">
                {{ match.date }}
              </p>

              <div
                v-for="teamKey in ['team1', 'team2']"
                :key="teamKey"
                class="playoff-team-row"
                :class="{
                  'playoff-team-winner':
                    match.winner &&
                    match.winner === match[teamKey]
                }"
              >
                <span class="playoff-team-name">
                  {{ match[teamKey] || 'TBD' }}
                </span>

                <strong class="playoff-score">
                  {{
                    match[
                      teamKey === 'team1' ? 'score1' : 'score2'
                    ] ?? '-'
                  }}
                </strong>

                <span
  v-if="
    match.winner &&
    match.winner === match[teamKey] &&
    ![4, 6].includes(Number(selectedSeason.seasonNumber))
  "
  class="playoff-win-mark"
>
  WIN
</span>
              </div>
              <div v-if="match.winner && match.name !== 'Grand Final' && round.name !== 'GRAND FINAL'" class="playoff-route-note">
                <span class="route-winner"> ✓ {{ match.winner }} → {{round.name === 'GRAND FINAL' || match.name === 'Grand Final' ? 'CHAMPION' : (match.nextMatchId || 'NEXT ROUND')}} </span>

  <span class="route-loser">
    ✕ {{
      match.winner === match.team1
        ? match.team2
        : match.team1
    }} → {{
    match.loserNextMatchId ||
    (round.name === 'TRIPLE THREAT'
      ? 'CONTINUES'
      : 'ELIMINATED')
  }}
  </span>

</div>
<div
  v-if="
    match.winner &&
    (
      round.name === 'GRAND FINAL' ||
      match.name === 'Grand Final'
    )
  "
  class="champion-panel"
>
  <span class="champion-trophy">♛</span>

  <span class="champion-label">
    {{ selectedSeason.title.toUpperCase() }} CHAMPION
  </span>

  <strong>{{ match.winner }}</strong>

  <span class="runner-up-label">
    Runner-up:
    {{
      match.winner === match.team1
        ? match.team2
        : match.team1
    }}
  </span>
</div>
            </article>
          </div>
        </div>
      </div>
      
      <!-- SEASON MATCHES PAGE -->
      <div v-if="seasonView === 'matches'" class="season-page">
        <div class="matches-header-actions">
          <button type="button" class="season-back-button" @click="backToSeasonDetails"> Back </button>
          <div class="match-search-box">
            <input type="text" v-model="matchSearchQuery" placeholder="Search team or date..." class="match-search-input"/>
          </div>
        </div>
        <h2>{{ selectedSeason ? selectedSeason.title : "Season Matches" }} — Matches</h2>

<p class="match-search-count" v-if="matchSearchQuery">
  Showing {{ filteredSeasonMatches.length }}
  of {{ selectedSeason.matches.length }} matches
</p>
        <div v-if="!selectedSeason">
          <p>Season details are not loaded.</p>
        </div>
        <div v-else-if="filteredSeasonMatches.length === 0">
  <p>
    {{ matchSearchQuery
      ? "No matching matches found."
      : "No matches added yet. Match schedules will appear here."
    }}
  </p>
</div>
        <div v-else class="season-matches-list">
          <div v-for="(match, index) in filteredSeasonMatches" :key="match._id || match.matchNumber || index" class="season-match-card">
            <h3>Match {{ match.matchNumber || index + 1 }}</h3>
            <p v-if="match.date"><strong>Date:</strong> {{ match.date }}</p>
            <!-- Seasons with their own match columns -->
            <!-- SEASON 5: MATCH RESULTS TABLE -->
<template
  v-if="Number(selectedSeason.seasonNumber) === 5 && match.results?.length"
>
  <div class="table-scroll">
    <table class="season-table">
      <thead>
        <tr>
          <th>Rank</th>
          <th>Team</th>
          <th>Kill Points (KP)</th>
        </tr>
      </thead>

      <tbody>
        <tr
          v-for="result in match.results"
          :key="result.rank + '-' + result.name"
        >
          <td>{{ result.rank }}</td>
          <td>{{ result.name }}</td>
          <td>{{ result.kp }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
            <template v-else-if="selectedSeason.matchColumns?.length && match.teams?.length && typeof match.teams[0] === 'object'">
              <p v-if="match.winner"><strong>Winner: </strong><span class="winner-text"> {{ match.winner }} </span></p>
              <div class="table-scroll">
                <table class="season-table">
                  <thead>
                    <tr>
                      <th v-for="column in selectedSeason.matchColumns" :key="column.key"> {{ column.label }} </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(team, teamIndex) in match.teams" :key="team.rank || team.teamName || teamIndex">
                      <td v-for="column in selectedSeason.matchColumns" :key="column.key"> {{ team[column.key] ?? "—" }} </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </template>
      
            <!-- Keep the existing format for Season 1 and other legacy matches -->
            <template v-else>
              <p v-if="match.time"><strong>Time:</strong> {{ match.time }}</p>
              <p v-if="match.group"><strong>Group:</strong> {{ match.group }}</p>
              <p v-if="match.match"><strong>Teams: </strong> {{ match.match }}</p>
              <p v-else-if="match.teams"><strong>Teams: </strong> {{ match.teams }}</p>
              <p v-if="match.winner"><strong>Winner: </strong><span class="winner-text">{{ match.winner }}</span></p>
              <p v-if="match.loser"><strong>Loser: </strong><span class="loser-text">{{ match.loser }}</span></p>
              <p v-if="match.schedule"><strong>Schedule: </strong> {{ match.schedule }}</p>
            </template>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
const API_BASE_URL = "https://battle-of-snipers.onrender.com";
export default {
  name: "LiveStandings",

  data() {
    return {
      ffUid: "",
      verified: false,
      loading: false,
      message: "",
      verifiedUid: "",
      playerName: "",
      teamName: "",
      playerGroup: null,
      groups: {
        A: [],
        B: []
      },
      groupsLoading: false,
      groupsError: "",
      pointsGroups: {
        A: [],
        B: []
      },
      pointsLoading: false,
      pointsError: "",
      pointsInterval: null,
      scheduledMatches: [],
      scheduledMatchesLoading: false,
      scheduledMatchesError: "",
      seasons: [],
      seasonsLoading: false,
      seasonsError: "",
      selectedSeason: null,
      selectedSeasonNumber: null,
      seasonDetailsLoading: false,
      seasonDetailsError: "",
      seasonView: "dashboard",
      playoffReturnView: "details",
      matchSearchQuery: ""
    };
  },

  beforeUnmount() {
    if (this.pointsInterval) {
      clearInterval(this.pointsInterval);
    }
  },

  computed: {
  filteredSeasonMatches() {
    if (!this.selectedSeason?.matches) {
      return [];
    }

    const query = this.matchSearchQuery
      .trim()
      .toLowerCase();

    if (!query) {
      return this.selectedSeason.matches;
    }

    return this.selectedSeason.matches.filter(
      (match, index) => {

        // Match number
        const matchNumber = String(
          match.matchNumber || index + 1
        );

        // Match date
        const matchDate = String(
          match.date || ""
        );

        // Legacy team names
        let teamNames = "";

        if (typeof match.match === "string") {
          teamNames += " " + match.match;
        }

        if (typeof match.teams === "string") {
          teamNames += " " + match.teams;
        }

        // Object-based team data
        if (Array.isArray(match.teams)) {
          teamNames += " " + match.teams
            .map(team =>
              typeof team === "string"
                ? team
                : team.teamName || team.name || ""
            )
            .join(" ");
        }

        // Season 5 results
        if (Array.isArray(match.results)) {
          teamNames += " " + match.results
            .map(result => result.name || "")
            .join(" ");
        }

        const searchableText = [
          matchNumber,
          matchDate,
          teamNames,
          match.winner || "",
          match.loser || "",
          match.group || ""
        ]
          .join(" ")
          .toLowerCase();

        return searchableText.includes(query);
      }
    );
  }
},

  methods: {  
    getSeasonColumns(season) {
      if (season?.standingsColumns?.length) {
        return season.standingsColumns;
      }
      
      // Fallback for existing seasons such as Season 1
      return [
        { key: "matches", label: "Matches" },
        { key: "wins", label: "Wins" },
        { key: "losses", label: "Loss" },
        { key: "points", label: "Points" },
        { key: "damage", label: "Damage" }
      ];
    },

    getSeasonGroups(season) {
  return ["A", "B"].map(group => ({
    name: group,
    teams: (season?.standings || []).filter(
      team => team.group === group
    )
  }));
},

// NEW FUNCTION: Check whether this season has playoffs
    hasPlayoffs(season) {
      if (!season || !season.playoffs) {
        return false;
      }

      const playoffs = season.playoffs;

      // Future dynamic playoff format
      if (Array.isArray(playoffs.rounds)) {
        return playoffs.rounds.some(
          round =>
            Array.isArray(round.matches) &&
            round.matches.length > 0
        );
      }

      // Existing playoff formats
      return (
        (Array.isArray(playoffs.semiFinals) &&
          playoffs.semiFinals.length > 0) ||
        Boolean(playoffs.eliminator) ||
        Boolean(playoffs.grandFinal)
      );
    },

    getSeasonStat(team, key) {
      const value = team?.stats?.[key] !== undefined ? team.stats[key] : team?.[key];
      if (value === undefined || value === null || value === "") {
        return "—"; 
      }
      
      if (key === "damage") {
        return Number(value).toLocaleString("en-IN");
      }
      return value;
    },

    async loadGroups() {
      this.groupsLoading = true;
      this.groupsError = "";
      
      try {
        const response = await fetch(
          "https://battle-of-snipers.onrender.com/api/standings/teams",
          {
            cache: "no-store"
          }
        );
       
        const result = await response.json();
        if (!response.ok) {
          throw new Error(
            result.message || "Could not load teams."
          );
        }
        
        this.groups = {
          A: result.groups?.A || [],
          B: result.groups?.B || []
        };
      } catch (error) {
        this.groupsError = error.message || "Unable to load teams.";
      } finally {
        this.groupsLoading = false;
      }
    },
    
    async loadPointsTable() {
      this.pointsLoading = true;
      this.pointsError = "";
      
      try {
        const response = await fetch(
          "https://battle-of-snipers.onrender.com/api/standings/points",
          { cache: "no-store" }
        );
        
        const result = await response.json();
        if (!response.ok) {
          throw new Error(
            result.message || "Could not load points table."
          );
        }

        this.pointsGroups = {
          A: result.groups?.A || [],
          B: result.groups?.B || []
        };
      } catch (error) {
        this.pointsError =
        error.message || "Unable to load points table.";
      } finally {
        this.pointsLoading = false;
      }
    },
    
    async loadScheduledMatches() {
      this.scheduledMatchesLoading = true;
      this.scheduledMatchesError = "";
      
      try {
        const response = await fetch(
          "https://battle-of-snipers.onrender.com/api/scheduled-matches/for-player",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              ffUid: this.verifiedUid
            }),
            cache: "no-store"
          }
        );
        
        const result = await response.json();
        if (!response.ok) {
          throw new Error(
            result.message || "Could not load scheduled matches."
          );
        }
        
        this.scheduledMatches = result.scheduledMatches || [];
      } catch (error) {
        this.scheduledMatchesError = error.message || "Unable to load scheduled matches.";
      } finally {
        this.scheduledMatchesLoading = false;
      }
    },
    
    async loadSeasons() {
      this.seasonsLoading = true;
      this.seasonsError = "";
      
      try {
        const response = await fetch(`${API_BASE_URL}/api/seasons`, {
          cache: "no-store"
        });
        
        const result = await response.json();
        if (!response.ok) {
          throw new Error(result.message || "Could not load seasons.");
        }
        this.seasons = result.seasons || [];
      } catch (error) {
        this.seasonsError = error.message || "Unable to load seasons.";
      } finally {
        this.seasonsLoading = false;
      }
    },
    
    async openSeason(seasonNumber) {
      this.selectedSeasonNumber = seasonNumber;
      this.seasonView = "details";
      this.selectedSeason = null;
      this.seasonDetailsLoading = true;
      this.seasonDetailsError = "";

      try {
        const response = await fetch(
          `${API_BASE_URL}/api/seasons/${seasonNumber}`,
          { cache: "no-store" }
        );
        
        const result = await response.json();
        if (!response.ok) {
          throw new Error(result.message || "Could not load season.");
        }
        this.selectedSeason = result.season;
      } catch (error) {
        this.seasonDetailsError = error.message || "Unable to load season details.";
      } finally {
        this.seasonDetailsLoading = false;
      }
    },
    
    openSeasonsPage() {
      this.selectedSeason = null;
      this.selectedSeasonNumber = null;
      this.seasonView = "seasons";

      if (this.seasons.length === 0) {
        this.loadSeasons();
      }
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    
    backToDashboard() {
      this.seasonView = "dashboard";
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    
    backToSeasons() {
      this.selectedSeason = null;
      this.selectedSeasonNumber = null;
      this.seasonView = "seasons";
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    
    openSeasonMatches() {
      this.seasonView = "matches";
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    
    backToSeasonDetails() {
      this.seasonView = "details";
      window.scrollTo({ top: 0, behavior: "smooth" });
    },

    openSeasonPlayoffs() {
  if (!this.selectedSeason?.playoffs) {
    return;
  }

  this.playoffReturnView = this.seasonView;
  this.seasonView = "playoffs";
  window.scrollTo({ top: 0, behavior: "smooth" });
},

backFromPlayoffs() {
  this.seasonView = this.playoffReturnView || "details";
  window.scrollTo({ top: 0, behavior: "smooth" });
},

    async verifyUid() {
      if (this.loading) return;

      this.loading = true;
      this.message = "";
      this.verified = false;

      try {
        const response = await fetch(
          "https://battle-of-snipers.onrender.com/api/verify-ff-uid",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              ffUid: this.ffUid.trim()
            })
          }
        );

        const result = await response.json();

        if (!response.ok || !result.verified) {
          throw new Error(
            result.message || "FF UID verification failed."
          );
        }

        this.verifiedUid = result.ffUid;
        this.playerName = result.ffName;
        this.teamName = result.teamName;
        this.playerGroup = result.group || null;
        this.verified = true;
        this.loadPointsTable();
        this.loadScheduledMatches();
        this.loadSeasons();
        
        if (this.pointsInterval) {
          clearInterval(this.pointsInterval);
        }
        
        this.pointsInterval = setInterval(() => {
          if (this.verified) {
            this.loadPointsTable();
          }
        }, 5000);
      } catch (error) {
        this.message = error.message || "Unable to verify UID. Try again.";
      } finally {
        this.loading = false;
      }
    },
    
    goBack() {
      this.resetVerification();
      window.scrollTo({ top: 0, behavior: "smooth" });
    },

    resetVerification() {
      this.ffUid = "";
      this.verified = false;
      this.message = "";
      this.verifiedUid = "";
      this.playerName = "";
      this.teamName = "";
      this.playerGroup = null;
      this.scheduledMatches = [];
      this.scheduledMatchesLoading = false;
      this.scheduledMatchesError = "";
      if (this.pointsInterval) {
        clearInterval(this.pointsInterval);
        this.pointsInterval = null;
      }
    }
  }
};
</script>

<style scoped>
.standings-page {
  min-height: 100vh;
  min-height: 100dvh;
  padding: 40px 20px;
  background: #0b0b0f;
  color: #fff;
  font-family: Arial, sans-serif;
  text-align: center;
}

.standings-page header h1 {
  color: #ffb000;
  overflow-wrap: anywhere;
}

.standings-page header h2 {
  margin-bottom: 8px;
}

.standings-page header p {
  color: #ccc;
  letter-spacing: 1px;
}

.standings-card {
  width: 100%;
  max-width: 700px;
  margin: 40px auto;
  padding: 30px 20px;
  background: #17171e;
  border: 1px solid #38333a;
  border-radius: 14px;
}

.standings-card input {
  display: block;
  width: 100%;
  max-width: 420px;
  margin: 22px auto 12px;
  padding: 14px;
  border: 1px solid #383844;
  border-radius: 9px;
  background: #0e0e13;
  color: #fff;
  font-size: 16px;
  outline: none;
}

.standings-card input:focus {
  border-color: #ffb000;
}

.standings-card button {
  width: 100%;
  max-width: 420px;
  padding: 14px;
  border: none;
  border-radius: 9px;
  background: #ffb000;
  color: #111;
  font-weight: 800;
  cursor: pointer;
}

.standings-card button:disabled {
  opacity: 0.65;
  cursor: wait;
}

.error-message {
  margin-top: 18px;
  color: #ff7777;
}

.player-details {
  margin: 24px auto;
  padding: 16px;
  background: #0e0e13;
  border-radius: 10px;
  text-align: left;
  overflow-wrap: anywhere;
}

.results-placeholder {
  margin-top: 25px;
  padding: 20px;
  background: #0e0e13;
  border-radius: 10px;
}

.groups-container {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
  margin-top: 20px;
  text-align: left;
}

.group-card {
  min-width: 0;
  padding: 16px;
  background: #17171e;
  border: 1px solid #383844;
  border-radius: 10px;
  overflow-wrap: anywhere;
}

.group-card h4 {
  margin-top: 0;
  color: #ffb000;
  text-align: center;
}

.team-row {
  display: flex;
  align-items: center;
  gap: 9px;
  padding: 10px 0;
  border-bottom: 1px solid #383844;
}

.team-number {
  color: #ffb000;
  flex-shrink: 0;
}

.team-logo {
  width: 36px;
  height: 36px;
  object-fit: cover;
  border-radius: 50%;
  flex-shrink: 0;
}

@media (max-width: 600px) {
  .groups-container {
    grid-template-columns: 1fr;
  }
}

.points-section {
  margin-top: 25px;
  padding: 20px;
  background: #0e0e13;
  border-radius: 10px;
  text-align: left;
}

.points-section > h3,
.points-group h4 {
  color: #ffb000;
  text-align: center;
}

.points-group {
  margin-top: 24px;
}

.table-scroll {
  width: 100%;
  overflow-x: auto;
}

.table-scroll table {
  width: 100%;
  min-width: 620px;
  border-collapse: collapse;
  font-size: 13px;
}

.table-scroll th,
.table-scroll td {
  padding: 12px 9px;
  border-bottom: 1px solid #383844;
  text-align: center;
  white-space: nowrap;
}

.table-scroll th {
  color: #ffb000;
  background: #17171e;
}

.table-scroll td:nth-child(2),
.table-scroll th:nth-child(2) {
  text-align: left;
}

.total-points {
  color: #ffb000;
  font-weight: 800;
}


.logo-cell {
  width: 58px;
  text-align: center !important;
}

.points-team-logo {
  width: 36px;
  height: 36px;
  object-fit: cover;
  border-radius: 50%;
  border: 2px solid #ffb000;
  vertical-align: middle;
  display: inline-block;
}

.team-name-cell {
  text-align: left !important;
  font-weight: 600;
}

.standings-page header {
  position: relative;
}

.page-back-btn {
  position: absolute;
  top: 30px;
  right: 6%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: auto !important;
  max-width: none !important;
  margin: 0;
  padding: 14px 20px !important;
  background: #111217 !important;
  color: #f2f2f2 !important;
  border: 1px solid #383844 !important;
  border-radius: 10px;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
}

.page-back-btn:hover {
  background: #1b1c22 !important;
  border-color: #ffb000 !important;
  color: #ffb000 !important;
}

@media (max-width: 600px) {
  .standings-page {
    padding-top: 0 !important;
  }

  .standings-page header {
    padding-top: 0 !important;
    margin-top: 0 !important;
  }

  .standings-page header h1 {
    margin-top: 2;
  }

  .player-details {
    display: block;
  }

  .player-info-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
  }

  .player-details p {
    margin: 6px 0 !important;
    line-height: 1.3;
  }

  .player-info-row p {
    flex: 1;
    min-width: 0;
    margin: 6px 0 !important;
    line-height: 1.3;
  }

  .player-info-row .page-back-btn {
    position: static !important;
    flex-shrink: 0;
    width: auto !important;
    margin: 0 !important;
    padding: 7px 10px !important;
    font-size: 12px;
  }

  .player-group-assignment {
    display: none;
  }

  .verified-subtitle,
  .verified-success-title {
    display: none;
  }
}

.qualification-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 30px;
  padding: 5px 9px;
  border-radius: 6px;
  font-weight: 800;
  font-size: 13px;
}

.qualification-badge.qualified {
  color: #22c55e;
  background: rgba(34, 197, 94, 0.14);
  border: 1px solid rgba(34, 197, 94, 0.45);
}

.qualification-badge.eliminated {
  color: #ef4444;
  background: rgba(239, 68, 68, 0.14);
  border: 1px solid rgba(239, 68, 68, 0.45);
}


.scheduled-matches-section {
  margin-top: 28px;
  padding: 20px;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.12);
}

.scheduled-matches-section h2 {
  margin: 0 0 18px;
  color: #ffcc00;
  font-size: 22px;
}

.scheduled-matches-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 16px;
}

.scheduled-match-card {
  padding: 16px;
  border-radius: 12px;
  background: rgba(15, 20, 32, 0.8);
  border: 1px solid rgba(255, 204, 0, 0.3);
}

.scheduled-match-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 8px;
  color: #ffcc00;
  font-size: 13px;
}

.scheduled-match-teams {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  margin: 22px 0;
  color: #ffffff;
}

.scheduled-match-teams span {
  color: #ff5252;
  font-weight: 800;
}

.scheduled-match-assigned {
  margin: 0;
  color: #b8c0ce;
  font-size: 13px;
}

.scheduled-matches-section p {
  overflow-wrap: anywhere;
}

@media (max-width: 480px) {
  .scheduled-matches-section {
    padding: 14px;
  }

  
  .scheduled-match-teams {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4px;
    width: 100%;
    margin: 22px 0;
  }

  .scheduled-team {
    display: flex;
    align-items: center;
    flex: 1 1 0;
    min-width: 0;
    gap: 4px;
  }

  .scheduled-team-left {
    justify-content: flex-start;
  }

  .scheduled-team-right {
    justify-content: flex-end;
  }

  .scheduled-team strong {
    flex: 0 1 auto;
    min-width: 0;
    max-width: calc(100% - 26px);
    font-size: 11px;
    line-height: 1.2;
    overflow-wrap: anywhere;
  }

  .scheduled-team-left strong {
    text-align: left;
  }

  .scheduled-team-right strong {
    text-align: right;
  }

  .scheduled-team-logo {
    width: 22px;
    height: 22px;
    flex: 0 0 22px;
    object-fit: contain;
  }

  .scheduled-match-vs {
    flex: 0 0 28px;
    text-align: center;
    color: #ff5252;
    font-weight: 900;
    font-size: 13px;
  }
}

/* Historical seasons */
.seasons-section {
  margin-top: 28px;
  padding: 22px;
  border-radius: 14px;
  background: #0e0e13;
  border: 1px solid #383844;
  text-align: left;
}

.seasons-heading h2 {
  margin: 0 0 8px;
  color: #ffcc00;
}

.seasons-heading p {
  color: #b8c0ce;
  font-size: 13px;
}

.seasons-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 15px;
  margin-top: 20px;
}

.season-card {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 13px;
  width: 100%;
  padding: 22px;
  color: #fff;
  background: linear-gradient(145deg, #20202a, #121219);
  border: 1px solid rgba(255, 204, 0, 0.35);
  border-radius: 12px;
  text-align: left;
  cursor: pointer;
  transition: transform 0.2s ease, border-color 0.2s ease;
}

.season-card:hover {
  transform: translateY(-3px);
  border-color: #ffcc00;
}

.season-card-label {
  color: #ffcc00;
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 1.4px;
}

.season-card strong {
  font-size: 23px;
}

.season-card-status {
  color: #b8c0ce;
  font-size: 12px;
}

.season-card-action {
  margin-top: 8px;
  color: #ffcc00;
  font-size: 11px;
  font-weight: 800;
}

.season-standings {
  margin-top: 25px;
}

.season-standings h3 {
  color: #ffcc00;
  margin: 20px 0;
}

.season-close-btn {
  padding: 9px 13px;
  color: #ffcc00;
  background: #17171e;
  border: 1px solid #383844;
  border-radius: 8px;
  cursor: pointer;
}

.season-table-scroll {
  width: 100%;
  overflow-x: auto;
}

.season-table {
  width: 100%;
  min-width: 600px;
  border-collapse: collapse;
}

.season-table th,
.season-table td {
  padding: 12px 10px;
  text-align: left;
  white-space: nowrap;
  border-bottom: 1px solid #383844;
  font-size: 12px;
}

.season-table th {
  color: #ffcc00;
  background: #17171e;
}

.season-table td {
  color: #e2e3e8;
}

@media (max-width: 600px) {
  .seasons-section {
    padding: 14px;
  }

  .seasons-grid {
    grid-template-columns: 1fr;
  }
}


/* Past Seasons dashboard button */
.past-seasons-entry {
  margin: 28px 0;
}

.past-seasons-button {
  display: flex;
  align-items: center;
  gap: 15px;
  width: 100%;
  max-width: none !important;
  padding: 22px;
  color: #fff !important;
  background: linear-gradient(135deg, #20202a, #101015) !important;
  border: 1px solid rgba(255, 176, 0, 0.45) !important;
  border-radius: 14px !important;
  text-align: left;
  cursor: pointer;
}

.past-seasons-button:hover {
  border-color: #ffb000 !important;
  transform: translateY(-2px);
}

.past-seasons-icon {
  font-size: 32px;
}

.past-seasons-button strong {
  display: block;
  color: #ffb000;
  font-size: 19px;
}

.past-seasons-button small {
  display: block;
  margin-top: 6px;
  color: #c5c5cf;
  font-size: 12px;
}

.past-seasons-arrow {
  margin-left: auto;
  color: #ffb000;
  font-size: 25px;
}

/* Page-like seasons views */
.season-page {
  margin: 28px 0;
  padding: 24px;
  background: #0e0e13;
  border: 1px solid #383844;
  border-radius: 14px;
  text-align: left;
}

.season-page h2 {
  margin-top: 22px;
  color: #ffb000;
}

.season-page-subtitle {
  margin-bottom: 22px;
  color: #c5c5cf;
  font-size: 14px;
}

.season-back-button {
  width: auto !important;
  max-width: none !important;
  padding: 10px 15px !important;
  color: #ffb000 !important;
  background: #20202a !important;
  border: 1px solid #383844 !important;
  border-radius: 8px !important;
  cursor: pointer;
}

.season-back-button:hover {
  border-color: #ffb000 !important;
}

.season-page .seasons-grid {
  margin-top: 24px;
}

.season-page .season-card {
  max-width: none;
}

@media (max-width: 600px) {
  .season-page {
    padding: 15px;
  }

  .past-seasons-button {
    padding: 16px;
  }

  .past-seasons-button strong {
    font-size: 16px;
  }
}


/* Season matches page */
.season-matches-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 14px;
  margin-top: 20px;
}

.season-match-card {
  padding: 18px;
  background: #17171e;
  border: 1px solid #383844;
  border-radius: 10px;
}

.season-match-card h3 {
  margin-top: 0;
  color: #ffcc00;
}

.season-match-card p {
  color: #e2e3e8;
  font-size: 13px;
}


.winner-text {
  color: #22c55e;
  font-weight: 700;
}

.loser-text {
  color: #ef4444;
  font-weight: 700;
}


/* BOS Season 1 - Esports Playoff Bracket */
.playoff-section {
  margin-top: 34px;
  padding: 24px;
  overflow: hidden;
  background:
    radial-gradient(ellipse at 80% 0%, #39200d 0%, transparent 45%),
    linear-gradient(145deg, #151116, #09090d 72%);
  border: 1px solid #75401f;
  border-radius: 16px;
  box-shadow: 0 0 24px #ff6b1512;
}

.playoff-heading {
  margin-bottom: 28px;
  text-align: center;
}

.playoff-kicker {
  color: #ff9e37;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 4px;
}

.playoff-heading h2 {
  margin: 8px 0;
  color: #ffbf47;
  font-size: clamp(25px, 4vw, 38px);
  font-weight: 900;
  letter-spacing: 2px;
  text-shadow: 0 0 18px #ff780744;
}

.playoff-heading p {
  color: #aaa5ad;
  font-size: 11px;
  letter-spacing: 3px;
}

.playoff-bracket {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 54px minmax(0, 1fr);
  align-items: stretch;
  gap: 12px;
}

.semi-finals-column {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  gap: 24px;
  min-width: 0;
}

.playoff-match {
  min-width: 0;
  padding: 16px;
  background: linear-gradient(145deg, #20171a, #101014);
  border: 1px solid #663b2b;
  border-radius: 12px;
}

.playoff-card-heading {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  color: #ffb13b;
  font-size: 13px;
  font-weight: 900;
}

.playoff-format {
  padding: 4px 7px;
  color: #ffd58a;
  background: #432711;
  border: 1px solid #82501e;
  border-radius: 5px;
  font-size: 10px;
}

.playoff-date {
  margin: 10px 0;
  color: #aaa5ad;
  font-size: 12px;
}

.playoff-team-row,
.final-team-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  margin-top: 8px;
  padding: 11px 9px;
  color: #eeeaf0;
  background: #0b0b0f;
  border: 1px solid #343039;
  border-radius: 7px;
}

.playoff-team-name,
.final-team-row > span:first-child {
  min-width: 0;
  overflow-wrap: anywhere;
  font-size: 13px;
  font-weight: 700;
}

.playoff-score,
.final-team-row strong {
  color: #f5f0e7;
  font-size: 22px;
}

.playoff-team-winner {
  background: linear-gradient(100deg, #422a0b, #21180d) !important;
  border-color: #d99b31 !important;
}

.playoff-team-winner .playoff-score,
.final-team-row.playoff-team-winner strong {
  color: #ffca55;
}

.playoff-win-mark {
  color: #ffc34d;
  font-size: 10px;
  font-weight: 900;
}

.playoff-connectors {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: stretch;
  min-width: 0;
}

.connector-line {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffbd45;
  font-size: 30px;
  text-shadow: 0 0 12px #ff8b28;
}

.connector-line span {
  display: block;
  width: 100%;
  text-align: center;
}

.grand-final-card {
  align-self: center;
  border-color: #c18a2c;
  box-shadow: 0 0 24px #ffb52c12;
}

.grand-final-heading {
  color: #ffd16c;
}

.champion-panel {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 7px;
  margin-top: 18px;
  padding: 18px 8px;
  text-align: center;
  background: radial-gradient(ellipse, #4a300d, #17120b 72%);
  border: 1px solid #b8872e;
  border-radius: 10px;
}

.champion-trophy {
  color: #ffd05c;
  font-size: 32px;
}

.champion-label {
  color: #ffca55;
  font-size: 10px;
  font-weight: 900;
  letter-spacing: 2px;
}

.champion-panel strong {
  color: #fff0c4;
  font-size: clamp(17px, 2vw, 24px);
  overflow-wrap: anywhere;
}

.runner-up-label {
  color: #aaa5ad;
  font-size: 12px;
}

@media (max-width: 700px) {
  .playoff-section {
    padding: 14px;
  }

  .playoff-bracket {
    grid-template-columns: 1fr;
    gap: 14px;
  }

  .semi-finals-column {
    gap: 14px;
  }

  .playoff-connectors {
    flex-direction: row;
    justify-content: space-around;
    padding: 4px 0;
  }

  .connector-line {
    font-size: 24px;
  }

  .grand-final-card {
    width: auto;
  }
}

/* Season standings: qualification status */
.season-team-cell {
  white-space: nowrap;
}

.season-qualification-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 25px;
  margin-left: 10px;
  padding: 4px 7px;
  border-radius: 5px;
  font-size: 11px;
  font-weight: 800;
}

.season-qualified {
  color: #22c55e;
  background: rgba(34, 197, 94, 0.14);
  border: 1px solid rgba(34, 197, 94, 0.45);
}

.season-eliminated {
  color: #ef4444;
  background: rgba(239, 68, 68, 0.14);
  border: 1px solid rgba(239, 68, 68, 0.45);
}

/* Add spacing between Season navigation buttons */
.season-page > .season-back-button {
  margin-right: 10px;
  margin-bottom: 10px;
}

/* Season champion and runner-up badges */

.season-result-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  padding: 6px 10px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 800;
  white-space: nowrap;
}

.season-champion {
  color: #ffca55;
  background: rgba(255, 176, 0, 0.14);
  border: 1px solid rgba(255, 176, 0, 0.5);
}

.season-runner-up {
  color: #d1d5db;
  background: rgba(148, 163, 184, 0.14);
  border: 1px solid rgba(148, 163, 184, 0.45);
}


.playoff-bracket {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 54px minmax(0, 1fr);
  align-items: stretch;
  gap: 12px;
  width: 100%;
  box-sizing: border-box;
}

.semi-finals-column {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  gap: 24px;
  min-width: 0;
  width: 100%;
}

.playoff-match {
  width: 100%;
  min-width: 0;
  box-sizing: border-box;
  padding: 16px;
  overflow-wrap: normal;
}

.playoff-team-name {
  min-width: 0;
  overflow-wrap: anywhere;
  word-break: normal;
}

/* SEASON 3 PLAYOFF BRACKET */
.season-three-bracket {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr);
  gap: 24px;
  align-items: center;
  width: 100%;
}

.playoff-round-column {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 22px;
  min-width: 0;
}

.playoff-round-middle {
  padding-top: 70px;
}

.playoff-round-final {
  padding-top: 35px;
}

.playoff-flow-label {
  color: #f5c451;
  font-size: 12px;
  font-weight: 700;
  text-align: center;
  line-height: 1.6;
  overflow-wrap: anywhere;
}

.season-three-bracket .playoff-match {
  width: 100%;
  min-width: 0;
  box-sizing: border-box;
}

@media (max-width: 900px) {
  .season-three-bracket {
    grid-template-columns: 1fr;
  }

  .playoff-round-middle,
  .playoff-round-final {
    padding-top: 0;
  }

  .playoff-round-column {
    gap: 14px;
  }
}

/* SEASON 5 GRAND FINAL CARD */
.season-five-final {
  width: 100%;
  max-width: 520px;
  box-sizing: border-box;
  margin: 30px auto;
  padding: 28px;
  overflow: hidden;
  text-align: center;
  color: #fff;
  background:
    radial-gradient(ellipse at 50% 0%, #4a2a0b 0%, transparent 65%),
    linear-gradient(145deg, #1b1512, #0c0c11 75%);
  border: 1px solid #b87920;
  border-radius: 16px;
  box-shadow: 0 0 25px rgba(255, 176, 0, 0.09);
}

.season-five-final-header {
  position: relative;
  margin-bottom: 24px;
}

.season-five-kicker {
  display: block;
  color: #ffbd4a;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 3px;
}

.season-five-final-header h3 {
  margin: 12px 0;
  color: #ffd166;
  font-size: 26px;
  font-weight: 900;
}

.season-five-format {
  display: inline-block;
  padding: 6px 13px;
  color: #ffdc98;
  background: #432711;
  border: 1px solid #8d5721;
  border-radius: 7px;
  font-weight: 800;
}

.season-five-date {
  margin-bottom: 18px;
  color: #c5c5cf;
  font-size: 12px;
  letter-spacing: 2px;
}

.season-five-team {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-top: 12px;
  padding: 17px;
  background: #101014;
  border: 1px solid #38333a;
  border-radius: 10px;
  text-align: left;
}

.season-five-team span {
  min-width: 0;
  font-size: 17px;
  font-weight: 700;
  overflow-wrap: anywhere;
}

.season-five-team strong {
  flex-shrink: 0;
  font-size: 28px;
}

.season-five-team.winner {
  color: #ffcf65;
  background: linear-gradient(110deg, #3b290d, #1b160e);
  border-color: #d79a22;
}

.season-five-team.runner-up strong {
  color: #e8e8ee;
}

.season-five-champion {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  margin-top: 24px;
  padding: 26px 15px;
  background: radial-gradient(ellipse at center, #35240b, #15110c 75%);
  border: 1px solid #a8741a;
  border-radius: 12px;
}

.season-five-trophy {
  color: #ffd166;
  font-size: 48px;
}

.season-five-champion-label {
  color: #ffcf65;
  font-size: 12px;
  font-weight: 900;
  letter-spacing: 3px;
}

.season-five-champion > strong {
  color: #fff0c2;
  font-size: 27px;
  overflow-wrap: anywhere;
}

.season-five-runner-up {
  color: #c5c5cf;
  font-size: 13px;
}

@media (max-width: 600px) {
  .season-five-final {
    padding: 20px 14px;
  }

  .season-five-final-header h3 {
    font-size: 22px;
  }

  .season-five-team {
    padding: 14px;
  }

  .season-five-team span {
    font-size: 15px;
  }

  .season-five-champion > strong {
    font-size: 23px;
  }
}

/* Dynamic playoff bracket for all seasons */
.dynamic-playoff-bracket {
  display: grid;
  grid-template-columns: repeat(
    auto-fit,
    minmax(min(100%, 260px), 1fr)
  );
  gap: 24px;
  align-items: start;
  width: 100%;
  box-sizing: border-box;
}

.dynamic-round-title {
  margin: 0 0 8px;
  color: #ffd166;
  font-size: 18px;
  font-weight: 800;
  text-align: center;
  overflow-wrap: anywhere;
}

.dynamic-playoff-bracket .playoff-round-column {
  min-width: 0;
  width: 100%;
}

.dynamic-playoff-bracket .playoff-match {
  width: 100%;
  box-sizing: border-box;
}

@media (max-width: 600px) {
  .dynamic-playoff-bracket {
    grid-template-columns: minmax(0, 1fr);
    gap: 18px;
  }
}

.playoff-progression {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 12px;
  padding-top: 10px;
  border-top: 1px solid #49351f;
  color: #ffc34d;
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.5px;
}

.progression-arrow {
  font-size: 20px;
  line-height: 1;
  color: #ffbd45;
  text-shadow: 0 0 10px #ff8b28;
}

.matches-header-actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 15px;
  margin-bottom: 30px;
}

.match-search-box {
  width: 300px;
  max-width: 100%;
  margin: 0;
  padding: 0;
  background: transparent;
  border: none;
  box-sizing: border-box;
  display: flex;
  align-items: center;
}

.search-icon {
  font-size: 20px;
}

.match-search-box .match-search-input {
  display: block;
  width: 100%;
  max-width: none;
  margin: 0;
  padding: 12px 15px;
  background: #111217;
  border: 1px solid #383844;
  border-radius: 10px;
  color: white;
  font-size: 14px;
  outline: none;
  box-sizing: border-box;
}

.match-search-input::placeholder {
  color: #888;
}

.match-search-count {
  text-align: left;
  color: #ffb000;
  font-size: 13px;
  margin-bottom: 15px;
}

@media (max-width: 600px) {
  .matches-header-actions {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    width: 100%;
    margin-bottom: 20px;
  }

  .matches-header-actions .season-back-button {
    flex: 0 0 auto;
    width: auto !important;
    margin: 0 !important;
    padding: 10px 12px !important;
    white-space: nowrap;
  }

  .match-search-box {
    flex: 1;
    min-width: 0;
    width: auto;
    max-width: none;
  }

  .match-search-box .match-search-input {
    width: 100%;
    min-width: 0;
    padding: 10px 8px;
    font-size: 12px;
  }
}

.player-group-assignment {
  margin: 28px 0;
  padding: 30px 20px;
  text-align: center;
  border: 1px solid rgba(255, 176, 0, 0.45);
  border-radius: 16px;
  background: linear-gradient(135deg, #191922, #101015);
}

.group-assignment-label {
  color: #aaa;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 2px;
}

.player-group-assignment h2 {
  color: #fff;
  font-size: 26px;
  font-weight: 800;
}

.player-group-assignment h2 span {
  color: #ffb000;
}

.player-group-assignment p {
  color: #aaa;
  line-height: 1.6;
}

.player-group-assignment strong {
  color: #fff;
}

/* MOBILE LIVE STANDINGS - REAL TABLE */
@media (max-width: 600px) {

  .standings-page {
    padding: 10px 5px;
    box-sizing: border-box;
  }

  .standings-card {
    width: 100%;
    max-width: 100%;
    padding: 12px 6px;
    box-sizing: border-box;
  }

  .points-section {
    width: 100%;
    padding: 10px 3px;
    box-sizing: border-box;
    overflow: hidden;
  }

  .points-group {
    width: 100%;
    min-width: 0;
  }

  .points-section .table-scroll {
    width: 100%;
    overflow-x: hidden;
  }

  .points-section .table-scroll table {
    width: 100%;
    min-width: 0;
    max-width: 100%;
    table-layout: fixed;
    border-collapse: collapse;
    font-size: 10px;
  }

  .points-section .table-scroll th,
  .points-section .table-scroll td {
    padding: 7px 2px;
    white-space: normal;
    overflow-wrap: anywhere;
    word-break: normal;
    box-sizing: border-box;
    text-align: center;
    font-size: 10px;
  }

  /* Rank */
  .points-section .table-scroll th:nth-child(1),
  .points-section .table-scroll td:nth-child(1) {
    width: 6%;
  }

  /* Logo */
  .points-section .table-scroll th:nth-child(2),
  .points-section .table-scroll td:nth-child(2) {
    width: 10%;
  }

  /* Team */
  .points-section .table-scroll th:nth-child(3),
  .points-section .table-scroll td:nth-child(3) {
    width: 24%;
    text-align: left;
    overflow-wrap: anywhere;
  }

  /* Played, Wins, Losses */
  .points-section .table-scroll th:nth-child(4),
  .points-section .table-scroll td:nth-child(4),
  .points-section .table-scroll th:nth-child(5),
  .points-section .table-scroll td:nth-child(5),
  .points-section .table-scroll th:nth-child(6),
  .points-section .table-scroll td:nth-child(6) {
    width: 7%;
  }

  /* Round Points */
  .points-section .table-scroll th:nth-child(7),
  .points-section .table-scroll td:nth-child(7) {
    width: 14%;
  }

  /* Total Points */
  .points-section .table-scroll th:nth-child(8),
  .points-section .table-scroll td:nth-child(8) {
    width: 14%;
  }

  /* Status */
  .points-section .table-scroll th:nth-child(9),
  .points-section .table-scroll td:nth-child(9) {
    width: 11%;
  }

  .points-section .points-team-logo {
    width: 22px;
    height: 22px;
    max-width: 100%;
    object-fit: contain;
  }

  .points-section .logo-cell {
    width: auto;
  }

  .points-section .qualification-badge {
    min-width: 20px;
    padding: 3px 4px;
    font-size: 10px;
  }

  .points-section .total-points {
    font-size: 10px;
  }
}

/* VERY SMALL MOBILE */
@media (max-width: 360px) {

  .points-section .table-scroll th,
  .points-section .table-scroll td {
    padding: 6px 1px;
    font-size: 8px;
  }

  .points-section .points-team-logo {
    width: 18px;
    height: 18px;
  }

  .points-section .qualification-badge {
    min-width: 17px;
    padding: 2px;
    font-size: 9px;
  }
}

/* MOBILE RESPONSIVE - ALL PAST SEASON TABLES */
@media (max-width: 600px) {

  .season-page .season-table-scroll {
    width: 100%;
    max-width: 100%;
    overflow-x: hidden;
    box-sizing: border-box;
  }

  .season-page .season-groups-grid,
  .season-page .season-group-table {
    width: 100%;
    min-width: 0;
    box-sizing: border-box;
  }

  .season-page .season-table {
    width: 100%;
    min-width: 0 !important;
    max-width: 100%;
    table-layout: fixed;
    border-collapse: collapse;
    box-sizing: border-box;
    font-size: 9px;
  }

  .season-page .season-table th,
  .season-page .season-table td {
    padding: 7px 2px;
    font-size: 9px;
    white-space: normal;
    overflow-wrap: anywhere;
    word-break: normal;
    text-align: center;
    box-sizing: border-box;
  }

  /* Rank */
  .season-page .season-table th:first-child,
  .season-page .season-table td:first-child {
    width: 6%;
  }

  /* Team */
  .season-page .season-table th:nth-child(2),
  .season-page .season-table td:nth-child(2) {
    width: 20%;
    text-align: left;
  }

  /* Status */
  .season-page .season-table th:last-child,
  .season-page .season-table td:last-child {
    width: 16%;
    text-align: center;
  }


/* Champion / Runner-up badges on mobile */
.season-page .season-table th:last-child,
.season-page .season-table td:last-child {
  width: 21% !important;
  text-align: center;
}

.season-page .season-result-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  max-width: 100%;
  padding: 3px 2px;
  gap: 1px;
  font-size: 7px;
  line-height: 1.2;
  white-space: normal;
  overflow-wrap: anywhere;
  text-align: center;
  box-sizing: border-box;
}

  .season-page .season-table td:last-child {
    white-space: nowrap;
  }

  .season-page .season-qualification-badge {
    min-width: 17px;
    padding: 3px 4px;
    font-size: 9px;
    box-sizing: border-box;
  }
}

/* SEASON 1 PLAYOFFS - MOBILE LAYOUT */
@media (max-width: 600px) {

  .season-one-bracket {
    display: flex !important;
    flex-direction: column;
    width: 100%;
    gap: 16px;
  }

  .season-one-bracket .semi-finals-column {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .season-one-bracket .playoff-match {
    width: 100%;
    padding: 14px;
    box-sizing: border-box;
  }

  .season-one-bracket .playoff-connectors {
    display: none;
  }

  .season-one-bracket .playoff-team-row {
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto auto;
    align-items: center;
    gap: 10px;
    padding: 10px;
  }

  .season-one-bracket .playoff-team-name {
    min-width: 0;
    overflow-wrap: anywhere;
    word-break: normal;
    font-size: 13px;
  }

  .season-one-bracket .grand-final-card {
    width: 100%;
    align-self: stretch;
    margin-top: 4px;
  }

  .playoff-route-note {
    display: flex;
    flex-direction: column;
    gap: 7px;
    margin-top: 12px;
    padding: 10px;
    background: #17120d;
    border: 1px solid #49351f;
    border-radius: 8px;
    font-size: 11px;
    font-weight: 800;
  }

  .route-winner {
    color: #4ade80;
  }

  .route-loser {
    color: #f87171;
  }
}

@media (max-width: 600px) {
  .season-three-bracket {
    display: flex;
    flex-direction: column;
    gap: 14px;
    width: 100%;
  }

  .season-three-bracket .playoff-round-column {
    width: 100%;
    min-width: 0;
    padding-top: 0;
    gap: 14px;
  }

  .season-three-bracket .playoff-match {
    width: 100%;
    box-sizing: border-box;
    padding: 14px;
  }

  .season-three-bracket .playoff-team-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
  }

  .season-three-bracket .playoff-route-note {
    display: flex;
    flex-direction: column;
    gap: 7px;
    margin-top: 12px;
    padding: 10px;
    text-align: center;
    background: #17120d;
    border: 1px solid #49351f;
    border-radius: 8px;
    font-size: 11px;
    font-weight: 800;
  }
}


.scheduled-match-teams {
  display: flex;
  align-items: center;
  width: 100%;
  gap: 6px;
  box-sizing: border-box;
  margin: 22px 0;
}

.scheduled-team {
  display: flex;
  align-items: center;
  flex: 1 1 0;
  width: 0;
  max-width: none;
  min-width: 0;
  gap: 4px;
}

.scheduled-team-left {
  justify-content: flex-start;
}

.scheduled-team-right {
  justify-content: flex-end;
}

.scheduled-team strong {
  flex: 1 1 auto;
  min-width: 0;
  font-size: 12px;
  line-height: 1.25;
  overflow-wrap: anywhere;
}

.scheduled-team-left strong {
  text-align: left;
}

.scheduled-team-right strong {
  text-align: right;
}

.scheduled-team-logo {
  width: 24px;
  height: 24px;
  flex: 0 0 24px;
  object-fit: contain;
  border-radius: 50%;
  background: #fff;
  padding: 2px;
}

.scheduled-match-vs {
  flex: 0 0 auto;
  color: #ff5252;
  font-size: 13px;
  font-weight: 900;
  text-align: center;
  white-space: nowrap;
}

/* Past Seasons - Premium Dark Cards */
.season-card {
  background: linear-gradient(145deg, #20202a, #101016) !important;
  color: #ffffff !important;
  border: 1px solid rgba(255, 190, 50, 0.4);
  border-radius: 14px;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.3);
}

.season-card-label {
  color: #ffbd45 !important;
}

.season-card strong {
  color: #ffffff !important;
}

.season-card-status {
  color: #c4c9d4 !important;
}

.season-card-action {
  color: #ffbd45 !important;
  font-weight: 800;
}

.season-card:hover {
  background: linear-gradient(145deg, #292936, #15151e) !important;
  border-color: #ffbd45;
  box-shadow: 0 5px 18px rgba(255, 189, 69, 0.12);
}

.rank-cell {
  white-space: nowrap;
  font-weight: 700;
}

.rank-change {
  display: inline-flex;
  align-items: center;
  margin-left: 5px;
  font-size: 11px;
  font-weight: 800;
  white-space: nowrap;
}

.rank-up {
  color: #22c55e;
}

.rank-down {
  color: #ef4444;
}

</style>
