USE baseballdb;
SELECT 
p.player_id, 
player_name, 
jersey_number, 
position, 
handness, 
team_id, 
s.hits/s.at_bats AS bat_avg  
FROM players AS p
LEFT JOIN season_bat_stats AS s 
ON p.player_id = s.player_id ;