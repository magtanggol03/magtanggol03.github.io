
var setup = d3.marcon()
  .top(20)
  .bottom(20)
  .left(40)
  .right(120)
  .width(500)
  .height(250)
  .element('.chart')

setup.render()

var width = setup.innerWidth(); var height = setup.innerHeight(); var svg = setup.svg()

var color = d3.scaleOrdinal(['#66c2a5', '#fc8d62', '#8da0cb', '#e78ac3', '#a6d854', '#ffd92f'])

var x = d3.scaleBand()
  .range([0, width])

var normalize = true
var view = 'skill'
var time = 'week'
// var view = 'masked_projects'

var parser = {
    	'week': '%V-%Y',
    	'month': '%m',
    	'timestamp': '%Y-%m-%d',
    	'year': '%Y'
}
var y = d3.scaleLinear()
  .rangeRound([height, 0])

var x_axis = d3.axisBottom(x)
  .tickFormat(d3.timeFormat(parser[time]))

var y_axis = d3.axisLeft(y)
    				.ticks(4)
// .tickSize(width)
// .tickFormat(function(d, i, ticks){ return d; });

svg.append('g')
  .attr('class', 'x axis')
  .attr('transform', 'translate(0,' + height + ')')
  .call(x_axis)

// svg.append('g')
//  .attr('class', 'y axis')
//  .call(y_axis)

var tooltip = d3.select('svg').append('div')
	    .attr('class', 'tooltip')
	    .style('opacity', 0)

var colors = { 'admin': '#3f50b0',
  'bizdev': '#2292ec',
  'learning': '#10b9ce',
  'internal': '#f7bb09',
  'geospatial': '#ff9138',
  'project': '#ef4631',
  'transit': '#f47f71',

  'admin-tasks': '#f7bb09',
  'client-strategy': '#3f50b0',
  'others': '#7a86c8',
  'product-strategy': '#ff9138',
  'web-dev': '#ffb478',
  'geospatial-analytics': '#2292ec',
  'customer-analytics': '#66b4f2',
  'project-mgt': '#10b9ce',
  'presentation-skills': '#72dde9',
  'computer-vision': '#ef4631',
  'sat-imt-processing': '#f47f71' }

var url = 'https://gist.githubusercontent.com/magtanggol03/6833f854d1d519095329394a34520604/raw/723974e74ea9fa8a3d670684e3905be24f32fb60/checkins-4'

 	redraw(normalize, time, view)
function redraw (normalize, time, view) {
    	d3.csv(url, function (raw) {
    		raw.forEach(d => {
    			var temp_date = d3.timeParse('%Y-%m-%d')(d.timestamp)
    			d.week = d3.timeFormat('%V-%Y')(temp_date)
    		})

    		var parse = d3.timeParse(parser[time])
    		const projects = [...new Set(raw.map(d => d.masked_projects))]
    const skills = [...new Set(raw.map(d => d.skill))]
    const all_keys = projects.concat(skills)
    var views = { 'masked_projects': projects, 'skill': skills }

    const dates = [...new Set(raw.map(d => parse(d[time])))]

    var dailyHours = d3.nest()
      .key(function (d) { return d[time] })
      .key(function (d) { return d[view] })
      .rollup(function (v) { return d3.sum(v, function (d) { return d.hours }) })
      .object(raw)

    var data = formatData(dailyHours, all_keys, normalize)
		    var x_var = 'date'

    // update the y scale
    y.domain([0, getMaxHours(data)])
    x.domain(dates).padding(0.25)

    // svg.select('.y')
    //  .transition()
    //  .ease(d3.easeExp)
    //  .duration(1000)
    //  .call(y_axis)

    var mod = { 'week': [4, d3.timeFormat('%m-%Y')], 'year': [1, d3.timeFormat('%Y')], 'month': [1, d3.timeFormat('%b')] }

    svg.select('.x')
      .transition()
      .ease(d3.easeExp)
      .duration(500)
      .call(x_axis
        .tickValues(x.domain().filter(function (d, i) { return !((i + 1) % mod[time][0]) }))
        .tickFormat(mod[time][1]))

    var stack = d3.stack()
      .keys(all_keys)
		        .order(d3.stackOrderNone)
		        .offset(d3.stackOffsetNone)

    // each data column (a.k.a "key" or "series") needs to be iterated over
    // the variable alphabet represents the unique keys of the stacks

    all_keys.forEach(function (key, key_index) {
      var bar = svg.selectAll('.bar-' + key)
        .data(stack(data)[key_index], function (d) { return d.data[x_var] + '-' + key })

      bar
        .exit()
        .transition()
        .ease(d3.easeExp)
        .duration(500)
        .style('opacity', 0)
        .remove()

      bar
			   .transition()
				   	.ease(d3.easeExp)
        .duration(1000)
			   .attr('x', function (d) { return x(parse(d.data[x_var])) })
			   .attr('y', function (d) { return y(d[1]) })
			   .attr('height', function (d) { return y(d[0]) - y(d[1]) })

      bar.enter().append('rect')
        .attr('x', function (d) { return x(parse(d.data[x_var])) })
        .attr('width', x.bandwidth())
        .attr('fill', function (d) { return colors[key] })
        .attr('class', function (d) { return 'bar bar-' + key })
        .attr('height', function (d) { return y(d[0]) - y(d[1]) })
        .attr('y', function (d) { return y(d[1]) })
        .style('opacity', 0)
        .transition()
        .ease(d3.easeExp)
        .duration(500)
        .style('opacity', 1)
    })

    var legend = svg.selectAll('.legend-item')
      .data(views[view])

    legend
      .transition()
      .ease(d3.easeExp)
      .duration(500)
      .attr('fill', function (d) { return colors[d] })
      .attr('y', function (d, i) { return i * 20 })

    legend
      .enter().append('rect')
      .transition()
      .ease(d3.easeExp)
      .duration(500)
      .attr('class', function (d) { return 'legend-item' })
      .attr('height', 10)
      .attr('width', 10)
      .attr('x', 350)
      .attr('y', function (d, i) { return i * 20 })
      .attr('fill', function (d) { return colors[d] })

    legend
      .exit()
      .transition()
      .ease(d3.easeExp)
      .duration(1000)
      .attr('y', 0)
      .style('opacity', 0)
      .remove()

    var legendText = svg.selectAll('.legendText')
      .data(views[view])

    legendText
      .exit()
      .transition()
      .ease(d3.easeExp)
      .duration(1000)
      .style('opacity', 0)
      .remove()

    legendText
      .enter().append('text')
      .style('font-size', 10)
      .merge(legendText)
      .style('opacity', 1)
      .attr('y', function (d, i) { return 8 + i * 20 })
      .attr('x', 365)
      .attr('class', function (d) { return 'legendText ' + d })
      .text(function (d) { return d })
  })
}
function sum (obj) {
	  return Object.keys(obj).reduce((sum, key) => sum + parseFloat(obj[key] || 0), 0)
}

function formatData (raw, over, normalize) {
  var flatData = []
  Object.keys(raw).forEach(d => {
    var dict = {}
    var total = sum(raw[d])
    dict.date = d

    over.forEach(p => {
      if (Object.keys(raw[d]).includes(p)) {
        if (normalize) {
          dict[p] = raw[d][p] / total
        } else {
          dict[p] = raw[d][p]
        }
      } else {
        dict[p] = 0
      }
    })
    flatData.push(dict)
  })
  return flatData
}

function getMaxHours (data) {
  sum_list = []

  data.forEach(d => {
    hours = 0
    Object.keys(d).forEach(h => {
      if (h != 'date') {
        hours += d[h]
      }
    })

    sum_list.push(hours)
  })

  return d3.max(sum_list)
}

function ChangeNorm () {
  if (normalize) {
    normalize = false
  } else {
    normalize = true
  }
  redraw(normalize, time, view)
}

function ChangeView () {
  if (view == 'masked_projects') {
    view = 'skill'
  } else {
    view = 'masked_projects'
  }
  redraw(normalize, time, view)
}

function ChangeTime () {
  if (time == 'timestamp') {
    time = 'year'
  } else if (time == 'year') {
    time = 'month'
  } else if (time == 'month') {
    time = 'week'
  } else if (time == 'week') {
    time = 'year'
  }
  redraw(normalize, time, view)
}

function selectClass () {
  var key = this.getAttribute('class').split(' ')[1].replace('bar-', '')
  d3.selectAll('rect.bar')
    .transition()
    .ease(d3.easeExp)
    .duration(200)
    .style('opacity', 0.4)

  d3.selectAll('rect.bar-' + key)
    .transition()
    .ease(d3.easeExp)
    .duration(200)

    .style('opacity', 1)

  d3.selectAll('text.legendText.' + key)
    .transition()
    .ease(d3.easeExp)
    .duration(200)
    .style('fill', colors[key])
    .style('font-weight', 700)
}

function unselectClass () {
  d3.selectAll('rect.bar')
    .transition()
    .ease(d3.easeExp)
    .duration(200)
    .style('opacity', 1)

  d3.selectAll('text.legendText')
    .transition()
    .ease(d3.easeExp)
    .duration(200)
    .style('font-weight', 'normal')
    .style('fill', '#494e52')
}
