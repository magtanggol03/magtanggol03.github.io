import scrapy


class OWLSpider(scrapy.Spider):
    name = "owlanalysis"

    def start_requests(self):
        
        urls = ['https://www.winstonslab.com/events/event.php?id=86#matches']
        
        for url in urls:
            yield scrapy.Request(url=url, callback=self.parse_url)

    def parse_url(self, response):
        urls = []

        for link in response.css('table.table-striped.table-hover tbody tr'):
            match_url = link.css('td.past-matches-match a::attr(href)').extract()[0]
            match_url = 'http://www.winstonslab.com'+match_url
            urls.append(match_url)

        for link in urls:
            url = response.urljoin(link)
            matchID = link[-4:]
            yield scrapy.Request(url=url, meta = {'matchID':matchID}, callback=self.parse)
        
    def parse(self, response):

        num_maps =  max(4, int(response.css('div.scores.spoiler span::text').extract()[0]) + int(response.css('div.scores.spoiler span::text').extract()[1]))
        fk_total = response.css('div.number::text').extract()
        map_details = {'map_name': response.css('div.mapname::text').extract()[0:num_maps],
         'score1': response.css('div.score1 span::text').extract()[::2],
         'score2': response.css('div.score2 span::text').extract()[::2],
         'details_1': response.css('div.score1 span::text').extract()[1::2],
         'details_2': response.css('div.score2 span::text').extract()[1::2]}

        stat_tables = response.css('table.table')

        
        def parse_table(table):
            stats = {}
            i = 0
            for row in table.css('tr'):
                if i == 0:
                    pass
                else:
                    name = row.css('td a::text').extract()[0]
                    game_stat = row.css('td::text').extract()
                    
                    kills = game_stat[3]
                    deaths = game_stat[4]
                    kd_diff = game_stat[5]
                    ults = game_stat[6]
                    fk_diff = game_stat[7].replace('\n', "").replace('\t',"")

                    player_dict = {'name':name, 'kills':kills, 'deaths':deaths, 'kd_diff':kd_diff, 'ults':ults, 'fk_diff':fk_diff}

                    stats['player_'+str(i)] = player_dict
                i+=1

            return(stats)
        
        if len(stat_tables) == 12:
            stats = {'total_team1':parse_table(stat_tables[0]),
                     'total_team2':parse_table(stat_tables[1]),
                     'map1_team1':parse_table(stat_tables[2]),
                     'map1_team2':parse_table(stat_tables[3]),
                     'map2_team1':parse_table(stat_tables[4]),
                     'map2_team2':parse_table(stat_tables[5]),
                     'map3_team1':parse_table(stat_tables[6]),
                     'map3_team2':parse_table(stat_tables[7]),
                     'map4_team1':parse_table(stat_tables[8]),
                     'map4_team2':parse_table(stat_tables[9]),
                     'map5_team1':parse_table(stat_tables[10]),
                     'map5_team2':parse_table(stat_tables[11])}
        else:
            stats = {'total_team1':parse_table(stat_tables[0]),
                     'total_team2':parse_table(stat_tables[1]),
                     'map1_team1':parse_table(stat_tables[2]),
                     'map1_team2':parse_table(stat_tables[3]),
                     'map2_team1':parse_table(stat_tables[4]),
                     'map2_team2':parse_table(stat_tables[5]),
                     'map3_team1':parse_table(stat_tables[6]),
                     'map3_team2':parse_table(stat_tables[7]),
                     'map4_team1':parse_table(stat_tables[8]),
                     'map4_team2':parse_table(stat_tables[9]),
                     'map5_team1':'N/A',
                     'map5_team2':'N/A'}
        
        yield {'date': response.css('span.match-date span::text').extract()[0],
         'team1' : response.css('div.team1-name a::text').extract()[0],
         'team2' : response.css('div.team2-name a::text').extract()[0],
         'team1_score': response.css('div.scores.spoiler span::text').extract()[0],
         'team2_score': response.css('div.scores.spoiler span::text').extract()[1],
         'map_details': map_details,
         'fights_1': fk_total[0],
         'fights_2': fk_total[1],
         'kills_1': fk_total[2],
         'kills_2': fk_total[3],
         'stats': stats,
         'matchID' : response.meta['matchID']
        }

               

        
        
