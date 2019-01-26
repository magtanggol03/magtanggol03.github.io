import scrapy


class OWLSpider3(scrapy.Spider):
    name = "playbyplay"

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

            for gameNum in range(1, 6):
                for roundNum in range(1,7):

                    frmData = {'matchID':match_id, 'gameNumber':str(gameNum), 'roundNumber':str(roundNum)}
            
                    yield scrapy.FormRequest('https://www.winstonslab.com/matches/getMatchData.php', formdata = frmData, callback=self.parse, meta=frmData)
        
    def parse(self, response):

        match_details = eval(str(response.body)[2:-1])

        yield {'matchID':response.meta['matchID'],
               'gameNum':response.meta['gameNumber'],
               'roundNum':response.meta['roundNumber'],
               'match_details': match_details}
        

               

        
        
