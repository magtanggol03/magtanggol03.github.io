import scrapy


class OWLSpider2(scrapy.Spider):
    name = "detailedstats"

    def start_requests(self):
        
        urls = ['https://www.winstonslab.com/events/event.php?id=86#matches']
        
        for url in urls:
            yield scrapy.Request(url=url, callback=self.parse_url)

    def parse_url(self, response):
        urls = []

        for link in response.css('table.table-striped.table-hover tbody tr'):
            match_url = link.css('td.past-matches-match a::attr(href)').extract()[0]
            match_id = match_url[-4:]
            urls.append(match_id)

            frmData = {'matchID':match_id, 'gameNumber':'0', 'currentLanguageID':'0'}
            
            yield scrapy.FormRequest('https://www.winstonslab.com/matches/detailedStats.php', formdata = frmData, callback=self.parse, meta={'matchID':match_id})
        
    def parse(self, response):

        table = response.css('tbody')

        def parse_player(table):
            det_stats = {}
            i = 1
            for player in table.css('tr'):
                
                name = player.css('td a::text').extract()[0]
                row_data = player.css('td::text').extract()
                char = row_data[3]
                time_played = row_data[4]
                fw_perc = row_data[6].replace('\n', '').replace('\t','')
                kills_perc = row_data[7]
                kills_10 = row_data[8]
                deaths_10 = row_data[9]
                ults_10 = row_data[10]
                ttcu = row_data[11]
                kpu = row_data[12]
                ue = row_data[13].replace('\n', '').replace('\t','')
                uoof = row_data[14]
                fk = row_data[15]
                fd = row_data[16]

                player_stats = {'name':name,
                                'character':char,
                                'time_played': time_played,
                                'fw_perc': fw_perc,
                                'kills%': kills_perc,
                                'kills/10':kills_10,
                                'deaths/10':deaths_10,
                                'ults/10':ults_10,
                                'ultchargetime':ttcu,
                                'kills/ult':kpu,
                                'ult_eff':ue,
                                'ult_out':uoof,
                                'first_kill':fk,
                                'first_death':fd}

                det_stats['player_'+str(i)] = player_stats
                i+=1
                
            return(det_stats)
                
        det_stats = parse_player(table)
        yield {'matchID':response.meta['matchID'],'det_stats': det_stats}
        

               

        
        
