---
layout: single
title:  "Overwatch League Stage One Season One Visualization and Analysis"
date:   2018-02-25 00:00:00 +0800
categories: dataviz
permalink: /data-viz/owl-s1s1
---

After an exciting Stage 1, I wanted to do a bit of data analysis and visualization on the different matches in the first 5 weeks of the inaugural season of Overwatch League.
Below we analyze and visualize player and team performances, character utilization and factors that affect the outcome of matches. The analysis below includes only the **62 matches of Stage 1**, not including the finals match of the New York Excelsior, Houston Outlaws and London Spitfire. 

All data used was taken from this amazing website, [Winston's Lab](https://www.winstonslab.com/), which meticulously records and collects statistics from the games. 

If you wanna check out the code I used to clean and analyze the data, you can find [here](https://github.com/magtanggol03/OverwatchStage1Analysis).

All data cleaning and analysis were performed on *Python*, while the final animations and visualizations were generated in Python, and enhanced in *Adobe Illustrator and After Effects*.

## Overwatch Overview

Overwatch is a team and objective based First Person Shooter. A game of Overwatch usually consists of two opposing teams trying to meet a certain objective, or prevent the other team from doing so. Each team is made of six people, with each person being able to choose one the 26 heroes below, each with their own skills and capabilities.

![Heroes](https://storage.googleapis.com/magtanggol-github-io/overwatch/1-heroes.png)

The Overwatch League is a 12 team league that competes in 4 stages to become champion of the league. Ranking is determined by the number of match wins, while ties are decided by map wins differentials. A match is made up of 4 maps, and the winner of the match is the team that has the most map wins, with a fifth map for breaking ties. The objective of each map is determined by its map type. The following are the four map types in Overwatch:

![Map Types](https://storage.googleapis.com/magtanggol-github-io/overwatch/2-maps.png)

When talking about fights, we follow the definition of fights defined by Winston's Lab, wherein each fight begins the moment a character is killed, and a match ends if 14 seconds passes after a kill without another kill occurring. We consider ultimate abilities used 12 seconds prior to a fight start to be included in a match, and all ults used after the fight ends are considered not part of the fight.

---

## Team Performance

First, we set out to understand the different play styles of each team relative to the entire league. Mainly, we look at the team compositions used by each team and their performance on different map types. We summarize this information in "stat cards" for each team. We highlight the top three teams -- namely the New York Excelsior, London Spitfire, and Houston Outlaws -- but stat cards for all teams are available below.

![NYXL](https://storage.googleapis.com/magtanggol-github-io/overwatch/3-NYXL.gif)

Finishing stage one at the top of the leader boards, the New York Excelsior showed an incredibly strong performance in stage one, losing only to one team in 10 matches. Breaking down their win percentages, we see that unlike most teams, **New York Excelsior performs consistently above average, regardless of what the map type**, with an especially strong performance on Control and Hybrid map types. Furthermore, we see that NYXL wins 59% of all the fights in a match, which may be what contributes to outstanding win performances.

In terms of play style, we see that NYXL generally uses the dive comp team for most maps, similar to the rest of the league. The only exception is on control maps, where they tend to favor the less mobile Orisa, probably for her shielding and anti-dive capabilities, which makes sense as the objective of a control point is to hold a point. They also tend towards Junkrat and Pharah, both great characters to continuously spam damage in a certain area.

![SPT](https://storage.googleapis.com/magtanggol-github-io/overwatch/4-SPT.gif)
![HOU](https://storage.googleapis.com/magtanggol-github-io/overwatch/5-HOU.gif)

Comparing the number two and three teams in the league, we see similar performances from both teams. Both teams perform exceptionally well on Assault, Hybrid and Escort maps, even better than NYXL, but seem to have a difficult time maintaining it for Control maps. 

In terms of character usage, we see that the London Spitfire is one of the most faithful teams to the league average. Even on a per map basis, their most used compositions are the same, with a bit of switching around their main DPS character. For the Houston Outlaws, however, we see a huge skew towards Junkrat. This is probably due to the fact that they have in their roster one of the best Junkrat players in the league, and are playing to his strengths.

## Player Segmentation Per Hero

![Player Segmentation](https://storage.googleapis.com/magtanggol-github-io/overwatch/6-hero-played.png)

From the team performance above, it was pretty clear that not all heroes are made equal -- with most teams running the same top 5 characters, Mercy, D.Va, Zenyatta, Winston and Tracer. Genji typically follows as the sixth character, but is usually interchangeable with other damage dealing heroes depending on the requirement. 

Below we take a look at the performance of different players on certain heroes. We identify and segment the players based on their average **fight-win percentage** and **kill-death** ratio on that specific hero. However, as Mercy is not at all a damage dealing character, when looking at Mercy players, we segment them using death/min and fight-win percentage.

We identify the 5 best performing players using these metrics and take a closer look at their individual stats. We disregard players who have played less than 20 minutes on a hero. Note that pick rate here is not in terms of playing time, but on whether a character was picked in a certain round.

![Mercy](https://storage.googleapis.com/magtanggol-github-io/overwatch/7-MERCY.gif)
![Zenyatta](https://storage.googleapis.com/magtanggol-github-io/overwatch/8-ZEN-2.gif)
![Winston](https://storage.googleapis.com/magtanggol-github-io/overwatch/9-WINSTON.gif)
![Dva](https://storage.googleapis.com/magtanggol-github-io/overwatch/10-DVA.gif)
![Tracer](https://storage.googleapis.com/magtanggol-github-io/overwatch/11-TRACER.gif)
![Genji](https://storage.googleapis.com/magtanggol-github-io/overwatch/12-GENJI.gif)

Immediately what stands out is that both **London Spitfire and NYXL have top performing players on each hero**. In fact, Profit from the London Spitfire is the best performing player on both metrics for both Offense heroes, Tracer and Genji. Other teams that also appear frequently on the top 5 are the Seoul Dynasty, Houston Outlaws and Boston Uprising, all part of the upper half of the Overwatch League standing. It is worth noting that Ryujehong, considered one of the best support players in Overwatch, also appears both times as Zenyatta and Mercy.

## Elimination Network

Part of the data that we were able to collect is the play-by-play data of each map - including information on each elimination that has happened in the game. Given this, we plotted each kill in a network just to see how it looks like. **Below is the elimination network relative to Seoul Dynasty**. Each blue line is a kill by Seoul Dynasty, and each red line is a kill by opposing teams. 

![SD Elimination Network](https://storage.googleapis.com/magtanggol-github-io/overwatch/13-SD_ElimNet_2.gif)

One interesting thing to take note is how this graph depicts the **high level strategy** of different teams with regards to dealing with Seoul Dynasty, and vice versa. For example, while most teams focused on dealing with the main DPS of Seoul, Fleta, both Houston Outlaws and NYXL placed greater emphasis on shutting down Tobi, who usually plays Mercy, as seen in Libero getting more than 15 kills on him for NYXL and both Jake and Clockwork getting more than 10 kills on him in one game. On the other hand, you can also see that against Dallas fuel, Seoul DPS focused on shutting down Taimou while Miro focused on diving the backline and taking out Chipshajen, the Mercy player of Dallas.

## Breaking Down Fights

Given the play-by-play data used earlier, we wanted to use this to understand different factors that affect fight wins. To do this, extracted the features of each fight that happened in the first stage of OWL, including the order of kills, whether a fight was initiated by the team or not, ultimate usage, team composition going into the fight, etc. 

Doing this, we were able to extract data on 3,825 fights across all 62 matches, with the following features:

![Dataset](https://storage.googleapis.com/magtanggol-github-io/overwatch/14-dataset.png)

We then tried to explore the different features and checked on whether a feature had a significant effect on winning a fight, the result of which is below.

![Dataset](https://storage.googleapis.com/magtanggol-github-io/overwatch/15-MatchOutcomes.gif)

The factors above were the ones we saw had a significant effect on winning a match. Interestingly, while **getting the first kill was very significant in affecting win outcome, the character killed was not**. The number of ultimates a team had also did not play that big of a factor. Although we include team composition, note that the data is heavily skewed to the Mercy-Winston-Tracer-D.Va combination

While the graphs above gave us an idea on the underlying factors affecting a win, I wanted to see how these different factors interact in terms of affecting wins. To do this, I built a simple model -- not for the purpose of prediction per se, but more of to quantify the combined effects of events on winning a fight. For this purpose, I used a simple decision tree classification model because its feature selection methodology would work well on the very large sparse matrix of features of the fights, and I wanted it to be something easy to interpret and share. 

So we fit our data on a decision tree model with the following result:

![Fitted Model](https://storage.googleapis.com/magtanggol-github-io/overwatch/16-FITTED_MODEL.png)

Running this model against a hold-out test set, **the model got an accuracy score of 79%**. (Note that out benchmark was 60% if we had just predicted every match to be a win). While bigger, deeper trees or more complicated models would probably predict at a higher rate, I chose to limit the complexity of the tree to balance accuracy and interpretability. 

What's interesting is that it combines the insights from the previous graph -- a first kill will most likely determine a fight win, but killing specific characters in the fight improves the chances of winning. If you look at the model above, the root node is the first kill, and every node after represents actions a team can take to negate the initial advantage. If you got the first kill, that advantage is negated if the enemy team eliminates your Mercy, the source of your survivability. If the enemy team gets the first kill, that also is negated if you manage to go after their Mercy.

Below we try to visualize this model by applying it to a real game:

<iframe width="560" height="315" src="https://www.youtube.com/embed/rY6YlSdcAtM" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

&nbsp;  

Note than in the last fight,  the Mercy of  LA Valiant was eliminated, dropping the win probability to 46%. However, the LA Valiant continued on to win the game. A likely cause for the the wrong prediction is that although Mercy was killed by Seoul and was part of the first three kills, it happened too late in the fight to have a significant effect in the overall outcome of the match. I had tried to capture the timing of the kills during a fight by limiting the deaths taken into account to only the first three -- but after seeing this, an improvement might be to add a time element to the features, say, the kills in the first 10 seconds after a fight starts.

Also, even with the amount of data collected, you can see from the video above that there is so much more happening that what we captured. Although this is a start, it would be interesting to see fight win predictions in real-time using factors like individual player stats, player positioning, objective status, etc.

With all this analysis, at the end of the day Overwatch is an objective-based game. Although you win fights, that doesn't mean you win games. So the final question we have to answer is, **how much more likely are teams to win a game if they win more fights?**

![Outcomes](https://storage.googleapis.com/magtanggol-github-io/overwatch/18-outcomes.png)

Looks like it's very likely.



