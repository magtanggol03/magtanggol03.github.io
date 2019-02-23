import scrapy


class OWLSpider4(scrapy.Spider):
    name = "players"

    def start_requests(self):
        
        urls = ['https://www.winstonslab.com/teams/']
        
        for url in urls:
            yield scrapy.Request(url=url, callback=self.parse_url)

    def parse_url(self, response):
        urls = []

        owl = response.css('div.col-sm-4')[5]
        
        for link in owl.css('div.name a::attr(href)').extract():
            team_url = 'https://www.winstonslab.com/teams/' + link
            urls.append(team_url)

        for team in urls:            
            yield scrapy.Request(url = team, callback=self.parse)
        
    def parse(self, response):

        player_details = {}
        team_name = response.css('label.value::text').extract()[0]
        players = response.css('div.player-wrap')
        subs = response.css('div.sub')
    
        for play in players:
            play_details = play.css('div.name.clear-both img::attr(title)').extract()
            nation = play_details[0]
            role = play_details[1]
            name = play.css('div.name.clear-both a::attr(title)').extract()[0]
            main = 1

            player_details[name] = {'team':team_name, 'role':role, 'main':main, 'country':nation}
            

        for sub in subs:
            name = sub.css('a::attr(title)').extract()[0]
            play_details = sub.css('img::attr(title)').extract()
            nation = play_details[0]
            role = play_details[1]
            main = 0

            player_details[name] = {'team':team_name, 'role':role, 'main':main, 'country':nation}           
            

        yield {'player_details':player_details}
        

               

        
        
