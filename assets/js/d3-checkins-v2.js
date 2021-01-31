
winWidth = d3.min([720, window.innerWidth])
winHeight = window.innerHeight
var setup = d3.marcon()
  .top(40)
  .bottom(40)
  .left(winWidth * 0.1)
  .right(winWidth * 0.1)
  .width(winWidth * 0.5)
  .height(winHeight * 0.8)
  .element('.chart')

setup.render()

var width = setup.innerWidth(); var height = setup.innerHeight(); var svg = setup.svg()

var x = d3.scaleLinear()
  .range([0, width])
  .domain([0, 3])

var y = d3.scaleLinear()
  .range([0, height])
  .domain([0, 13])

var sizeScale = d3.scaleLinear()
  .range([0.5, 2])

var boxDim = 15

var legend = d3.select('#legend-1').append('g')
  .attr('class', 'legend-group')

function stepOne () {
  d3.csv('../assets/data/checkins.csv', function (raw) {
    var dailyHours = d3.nest()
      .key(function (d) { return d['week'] })
      .rollup(function (v) { return d3.sum(v, function (d) { return d.hours }) })
      .entries(raw)
    // draw squares
    var boxes = svg.selectAll('.week')
      .data(dailyHours.filter(function (d, i) { return d.key == 1 }))

    var tempBoxDim = 30
    boxes
      .exit()
      .transition()
      .ease(d3.easeExp)
      .duration(250)
      .attr('x', 0)
      .transition()
      .ease(d3.easeExp)
      .duration(250)
      .attr('y', 0)
      .remove()

    boxes
      .transition()
      .ease(d3.easeElasticOut)
      .duration(1000)

      .attr('height', d => tempBoxDim)
      .attr('width', d => tempBoxDim)
      .attr('transform', d => 'translate(-' + tempBoxDim / 2 + ',-' + tempBoxDim / 2 + ')')
      .style('fill', '#f2f2f2')

    boxes
      .enter()
      .append('rect')
      .attr('class', function (d, i) { return 'week week-' + d.key })
      .attr('rx', 1)
      .attr('ry', 1)
      .style('fill', '#f2f2f2')
      .attr('x', function (d, i) {
        return x((d.key - 1) % 4)
      })
      .attr('y', function (d, i) {
        return y(Math.floor((d.key - 1) / 4))
      })
      .transition()
      .ease(d3.easeElasticOut)
      .duration(1000)

      .attr('height', d => tempBoxDim)
      .attr('width', d => tempBoxDim)
      .attr('transform', d => 'translate(-' + tempBoxDim / 2 + ',-' + tempBoxDim / 2 + ')')
  })
}

function stepTwo () {
  d3.csv('../assets/data/checkins.csv', function (raw) {
    var dailyHours = d3.nest()
      .key(function (d) { return d['week'] })
      .rollup(function (v) { return d3.sum(v, function (d) { return d.hours }) })
      .entries(raw)

    var boxes = svg.selectAll('.week')
      .data(dailyHours)

    console.log(dailyHours)
    sizeScale.domain([0, 72])

    boxes
      .exit()
      .remove()

    boxes
      .transition()
      .ease(d3.easeExp)
      .duration(function (d, i) { return 500 + 10 * i })
      .attr('height', d => boxDim)
      .attr('width', d => boxDim)
      .attr('transform', d => 'translate(-' + (boxDim) / 2 + ',-' + (boxDim) / 2 + ')')
      .style('fill', '#f2f2f2')

    boxes
      .enter()
      .append('rect')
      .attr('class', function (d, i) { return 'week week-' + d.key })
      .attr('rx', 1)
      .attr('ry', 1)
      .attr('height', d => boxDim)
      .attr('width', d => boxDim)
      .attr('transform', d => 'translate(-' + boxDim / 2 + ',-' + boxDim / 2 + ')')
      .style('fill', '#f2f2f2')
      .transition()
      .ease(d3.easeExp)
      .duration(250)
      .attr('x', function (d, i) {
        return x((d.key - 1) % 4)
      })
      .transition()
      .ease(d3.easeExp)
      .duration(250)
      .attr('y', function (d, i) {
        return y(Math.floor((d.key - 1) / 4))
      })
  })
}

function stepThree () {
  boxes = svg.selectAll('.week-1')

  boxes
    .transition()
    .ease(d3.easeExp)
    .duration(500)
    .style('fill', '#ef4631')
    .attr('width', 20)
    .attr('height', 20)
    .attr('transform', 'translate(-10,-10)')

  boxes = svg.selectAll('.week-52')

  boxes
    .transition()
    .ease(d3.easeExp)
    .duration(500)
    .style('fill', '#f2f2f2')
    .attr('width', boxDim)
    .attr('height', boxDim)
    .attr('transform', 'translate(-' + boxDim / 2 + ',-' + boxDim / 2 + ')')
}

function stepFour () {
  boxes = svg.selectAll('.week')

  boxes
    .transition()
    .ease(d3.easeExp)
    .duration(500)
    .style('fill', '#f2f2f2')
    .attr('width', boxDim)
    .attr('height', boxDim)
    .attr('transform', 'translate(-' + boxDim / 2 + ',-' + boxDim / 2 + ')')

  boxes = svg.selectAll('.week-52')
  boxes
    .transition()
    .ease(d3.easeExp)
    .duration(500)
    .style('fill', '#ef4631')
    .attr('width', 20)
    .attr('height', 20)
}

function stepFive () {
  d3.csv('../assets/data/checkins.csv', function (raw) {
    var dailyHours = d3.nest()
      .key(function (d) { return d['week'] })
      .key(function (d) { return d['project'] })
      .rollup(function (v) { return d3.sum(v, function (d) { return d.hours }) })
      .entries(raw)

    processed = []
    dailyHours.forEach(k => {
      maxVal = 0
      total = k.values.length
      curr = ''
      k.values.forEach(d => {
        if (+d.value > +maxVal) {
          maxVal = d.value
          curr = d.key
        }
      })
      processed.push({ 'key': k.key, 'value': [curr, total] })
    })

    var colorProjects = { 'learning': '#7a86c8',
      'bizdev': '#ef4631',
      'project-1': '#f47f71',
      'project-4': '#10b9ce',
      'project-8': '#72dde9',
      'internal': '#2292ec',
      'project-5': '#ff9138',
      'project-10': '#ffb478',
      'geospatial-1': '#3f50b0' }
    // draw squares

    var idx = 0
    processed.forEach(function (week) {
      week['idx'] = idx
      idx += 1
    })
    var boxes = svg.selectAll('.week')
      .data(processed)

    sizeScale.domain([0, 12])

    boxes
      .exit()
      .remove()

    boxes
      .transition()
      .ease(d3.easeExp)
      .duration(function (d, i) { return 500 + 10 * i })
      .attr('height', d => boxDim)
      .attr('width', d => boxDim)
      .attr('transform', d => 'translate(-' + boxDim / 2 + ',-' + boxDim / 2 + ')')
      .style('fill', d => colorProjects[d.value[0]])
      .attr('x', function (d, i) {
        return x((d.key - 1) % 4)
      })
      .transition()
      .ease(d3.easeExp)
      .duration(250)
      .attr('y', function (d, i) {
        return y(Math.floor((d.key - 1) / 4))
      })
  })
}

function stepSix () {
  d3.csv('../assets/data/checkins.csv', function (raw) {
    var dailyHours = d3.nest()
      .key(function (d) { return d['week'] })
      .key(function (d) { return d['project'] })
      .rollup(function (v) { return d3.sum(v, function (d) { return d.hours }) })
      .entries(raw)

    processed = []
    dailyHours.forEach(k => {
      maxVal = 0
      total = k.values.length
      curr = ''
      k.values.forEach(d => {
        if (+d.value > +maxVal) {
          maxVal = d.value
          curr = d.key
        }
      })
      processed.push({ 'key': k.key, 'value': [curr, total] })
    })

    z = {
      'bizdev': 1,
      'project-8': 2,
      'project-10': 300,
      'learning': 400,
      'geospatial-1': 5000,
      'project-5': 6000,
      'project-1': 7000,
      'project-4': 8000,
      'internal': 9000
    }

    processed.sort((a, b) => (z[a.value[0]] > z[b.value[0]]) ? 1 : ((z[b.value[0]] > z[a.value[0]]) ? -1 : 0))
    console.log(processed)

    var idx = 0
    processed.forEach(function (week) {
      week['idx'] = idx
      idx += 1
    })

    path = svg.selectAll('.line').data([])

    path
      .exit()
      .transition()
      .duration(500)
      .ease(d3.easeExp)
      .attr('stroke-dasharray', function (d) {
        return this.getTotalLength()
      })
      .attr('stroke-dashoffset', function (d) {
        return this.getTotalLength()
      })
      .remove()

    processed.forEach(function (b, i) {
      var box = svg.selectAll('.week-' + b.key)

      sizeScale.domain([0, 12])

      box
        .transition()
        .ease(d3.easeExp)
        .duration(250)
        .attr('x', x(b.idx % 4))
        .transition()
        .ease(d3.easeExp)
        .duration(250)
        .attr('y', y(Math.floor(b.idx / 4)))
    })
  })
}

function stepSeven () {
  stepFive()

  var line = d3.line()
    .x(d => x(d.x))
    .y(d => y(d.y))

  var data = [
    { x: -0.5, y: 8.5 },
    { x: 2.5, y: 8.5 },
    { x: 2.5, y: 7.5 },
    { x: 3.5, y: 7.5 }
  ]

  svg.append('path')
    .data([data])
    .attr('class', 'line')
    .attr('d', line)
    .attr('fill', 'none')
    .attr('stroke', 'black')
    .attr('stroke-dasharray', function (d) {
      return this.getTotalLength()
    })
    .attr('stroke-dashoffset', function (d) {
      return this.getTotalLength()
    })

  svg.selectAll('.line')
    .transition()
    .delay(1000)
    .duration(500)
    .ease(d3.easeExp)
    .attr('stroke-dashoffset', 0)
}

function stepEight () {
  d3.csv('../assets/data/checkins.csv', function (raw) {
    var dailyHours = d3.nest()
      .key(function (d) { return d['week'] })
      .key(function (d) { return d['project'] })
      .rollup(function (v) { return d3.sum(v, function (d) { return d.hours }) })
      .entries(raw)

    removeLine()

    processed = []
    vals = []
    dailyHours.forEach(k => {
      maxVal = 0
      total = k.values.length
      curr = ''
      k.values.forEach(d => {
        if (+d.value > +maxVal) {
          maxVal = d.value
          curr = d.key
        }
      })
      vals.push(total)
      processed.push({ 'key': k.key, 'value': [curr, total] })
    })

    var color = d3.scaleQuantize()
      .domain([2, 12])
      .range(['#ffdbb8', '#fe9b6c', '#eb5838'])

    var boxes = svg.selectAll('.week')
      .data(processed)

    boxes
      .exit()
      .remove()

    boxes
      .transition()
      .ease(d3.easeExp)
      .duration(function (d, i) { return 500 + 10 * i })
      .style('fill', d => color(d.value[1]))
      .attr('height', d => boxDim)
      .attr('width', d => boxDim)
      .attr('transform', d => 'translate(-' + boxDim / 2 + ',-' + boxDim / 2 + ')')
  })
}

function stepNine () {
  d3.csv('../assets/data/checkins.csv', function (raw) {
    var dailyHours = d3.nest()
      .key(function (d) { return d['week'] })
      .rollup(function (v) { return d3.sum(v, function (d) { return d.hours }) })
      .entries(raw)

    var boxes = svg.selectAll('.week')
      .data(dailyHours)

    sizeScale.domain([24, 72])

    boxes
      .exit()
      .remove()

    boxes
      .transition()
      .ease(d3.easeExp)
      .duration(function (d, i) { return 500 + 10 * i })
      .attr('width', d => sizeScale(d.value) * boxDim)
      .attr('height', d => sizeScale(d.value) * boxDim)
      .attr('transform', d => 'translate(-' + sizeScale(d.value) * boxDim / 2 + ',-' + sizeScale(d.value) * boxDim / 2 + ')')
      .attr('x', function (d, i) {
        return x((d.key - 1) % 4)
      })
      .attr('y', function (d, i) {
        return y(Math.floor((d.key - 1) / 4))
      })
      .style('opacity', 1)

    path = svg.selectAll('.line').data([])

    path
      .exit()
      .transition()
      .duration(500)
      .ease(d3.easeExp)
      .attr('stroke-dasharray', function (d) {
        return this.getTotalLength()
      })
      .attr('stroke-dashoffset', function (d) {
        return this.getTotalLength()
      })
      .remove()
  })
}

function stepTen () {
  d3.csv('../assets/data/checkins.csv', function (raw) {
    var dailyHours = d3.nest()
      .key(function (d) { return d['week'] })
      .rollup(function (v) { return d3.sum(v, function (d) { return d.hours }) })
      .entries(raw)

    var boxes = svg.selectAll('.week')
      .data(dailyHours)

    sizeScale.domain([24, 72])

    boxes
      .exit()
      .remove()

    boxes
      .transition()
      .duration(1000)
      .ease(d3.easeExp)
      .style('opacity', function (d, i) {
        if (d.key > 16) {
          return 0.3
        } else {
          return 1.0
        }
      })

    var line = d3.line()
      .x(d => x(d.x))
      .y(d => y(d.y))

    var data2 = [
      { x: -0.5, y: -0.5 },
      { x: -0.5, y: 3.5 },
      { x: 3.5, y: 3.5 },
      { x: 3.5, y: -0.5 },
      { x: -0.5, y: -0.5 }
    ]

    removeLine()

    svg.append('path')
      .data([data2])
      .attr('class', 'line line-1')
      .attr('d', line)
      .attr('fill', 'none')
      .attr('stroke', 'black')
      .attr('stroke-dasharray', function (d) {
        return this.getTotalLength()
      })
      .attr('stroke-dashoffset', function (d) {
        return this.getTotalLength()
      })

    svg.selectAll('.line-1')
      .transition()
      .duration(500)
      .ease(d3.easeExp)
      .attr('stroke-dashoffset', 0)
  })
}

function stepEleven () {
  d3.csv('../assets/data/checkins.csv', function (raw) {
    var dailyHours = d3.nest()
      .key(function (d) { return d['week'] })
      .rollup(function (v) { return d3.sum(v, function (d) { return d.hours }) })
      .entries(raw)

    var boxes = svg.selectAll('.week')
      .data(dailyHours)

    sizeScale.domain([24, 72])

    boxes
      .exit()
      .remove()

    boxes
      .transition()
      .duration(1000)
      .ease(d3.easeExp)
      .style('opacity', function (d, i) {
        if (d.key <= 16 || d.key > 28) {
          return 0.3
        } else {
          return 1.0
        }
      })

    var line = d3.line()
      .x(d => x(d.x))
      .y(d => y(d.y))

    var data3 = [
      { x: -0.5, y: 3.5 },
      { x: -0.5, y: 6.5 },
      { x: 3.5, y: 6.5 },
      { x: 3.5, y: 3.5 },
      { x: -0.5, y: 3.5 }
    ]

    removeLine()

    svg.append('path')
      .data([data3])
      .attr('class', 'line line-2')
      .attr('d', line)
      .attr('fill', 'none')
      .attr('stroke', 'black')
      .attr('stroke-dasharray', function (d) {
        return this.getTotalLength()
      })
      .attr('stroke-dashoffset', function (d) {
        return this.getTotalLength()
      })

    svg.selectAll('.line-2')
      .transition()
      .duration(500)
      .ease(d3.easeExp)
      .attr('stroke-dashoffset', 0)
  })
}

function stepTwelve () {
  d3.csv('../assets/data/checkins.csv', function (raw) {
    var dailyHours = d3.nest()
      .key(function (d) { return d['week'] })
      .rollup(function (v) { return d3.sum(v, function (d) { return d.hours }) })
      .entries(raw)

    var boxes = svg.selectAll('.week')
      .data(dailyHours)

    sizeScale.domain([24, 72])

    boxes
      .exit()
      .remove()

    boxes
      .transition()
      .duration(1000)
      .ease(d3.easeExp)
      .style('opacity', function (d, i) {
        if (d.key <= 28) {
          return 0.3
        } else {
          return 1.0
        }
      })

    var line = d3.line()
      .x(d => x(d.x))
      .y(d => y(d.y))

    var data3 = [
      { x: -0.5, y: 6.5 },
      { x: -0.5, y: 12.5 },
      { x: 3.5, y: 12.5 },
      { x: 3.5, y: 6.5 },
      { x: -0.5, y: 6.5 }
    ]

    removeLine()

    svg.append('path')
      .data([data3])
      .attr('class', 'line line-3')
      .attr('d', line)
      .attr('fill', 'none')
      .attr('stroke', 'black')
      .attr('stroke-dasharray', function (d) {
        return this.getTotalLength()
      })
      .attr('stroke-dashoffset', function (d) {
        return this.getTotalLength()
      })

    svg.selectAll('.line-3')
      .transition()
      .duration(500)
      .ease(d3.easeExp)
      .attr('stroke-dashoffset', 0)
  })
}

function stepThirteen () {
  d3.csv('../assets/data/checkins.csv', function (raw) {
    var dailyHours = d3.nest()
      .key(function (d) { return d['week'] })
      .key(function (d) { return d['learning'] })
      .rollup(function (v) { return d3.sum(v, function (d) { return d.hours }) })
      .entries(raw)

    processed = []
    dailyHours.forEach(k => {
      maxVal = 0
      total = k.values.length
      curr = ''
      k.values.forEach(d => {
        if (+d.value > +maxVal) {
          maxVal = d.value
          curr = d.key
        }
      })
      processed.push({ 'key': k.key, 'value': [curr, total] })
    })

    const projects = [...new Set(processed.map(d => d.value[0]))]

    var colorLearnings = { 'data-viz': '#10b9ce',
      'slide-making': '#f47f71',
      'geospatial': '#f7bb09',
      'storytelling': '#72dde9',
      'project-scoping': '#ef4631',
      'project-mgt': '#3f50b0',
      'web-dev': '#7a86c8',
      'client-comms': '#989390',
      'big-query': '#ff9138',
      'data-exploration': '#ffb478',
      'text-analytics': '#686563',
      'machine-learning': '#2292ec',
      'computer-vision': '#66b4f2',
      'product-strategy': '#f9cf55',
      'others': '#cac5be',
      'data-engg': '#3c3a3b' }
    // draw squares

    var boxes = svg.selectAll('.week')
      .data(processed)

    removeLine()

    sizeScale.domain([0, 12])

    boxes
      .exit()
      .remove()

    boxes
      .transition()
      .ease(d3.easeExp)
      .duration(1000)
      .attr('height', d => boxDim)
      .attr('width', d => boxDim)
      .attr('transform', d => 'translate(-' + boxDim / 2 + ',-' + boxDim / 2 + ')')
      .style('fill', d => colorLearnings[d.value[0]])
      .style('opacity', 1)
      .transition()
      .ease(d3.easeExp)
      .duration(1000)
      .attr('x', function (d, i) {
        return x((d.key - 1) % 4)
      })

      .attr('y', function (d, i) {
        return y(Math.floor((d.key - 1) / 4))
      })
  })
}

function stepFourteen () {
  learnings(['project-mgt', 'slide-making', 'client-comms'])
}

function stepFifteen () {
  learnings(['data-viz', 'storytelling', 'web-dev', 'big-query', 'data-exploration', 'machine-learning', 'computer-vision', 'data-engg', 'text-analytics'])
}

function stepSixteen () {
  learnings(['geospatial', 'product-strategy'])
}

function learnings (projs) {
  d3.csv('../assets/data/checkins.csv', function (raw) {
    var dailyHours = d3.nest()
      .key(function (d) { return d['week'] })
      .key(function (d) { return d['learning'] })
      .rollup(function (v) { return d3.sum(v, function (d) { return d.hours }) })
      .entries(raw)

    processed = []
    dailyHours.forEach(k => {
      maxVal = 0
      total = k.values.length
      curr = ''
      k.values.forEach(d => {
        if (+d.value > +maxVal) {
          maxVal = d.value
          curr = d.key
        }
      })
      if (projs.includes(curr)) {
        total = 1.5
      } else {
        total = 0.5
      }
      processed.push({ 'key': k.key, 'value': [curr, total] })
    })

    const projects = [...new Set(processed.map(d => d.value[0]))]

    var boxes = svg.selectAll('.week')
      .data(processed)

    sizeScale.domain([0, 2])

    boxes
      .exit()
      .remove()

    boxes
      .transition()
      .ease(d3.easeExp)
      .duration(1000)
      .attr('width', d => sizeScale(d.value[1]) * boxDim)
      .attr('height', d => sizeScale(d.value[1]) * boxDim)
      .attr('transform', d => 'translate(-' + sizeScale(d.value[1]) * boxDim / 2 + ',-' + sizeScale(d.value[1]) * boxDim / 2 + ')')
      .style('opacity', function (d) {
        if (projs.includes(d.value[0])) {
          return 1
        } else {
          return 0.5
        }
      })
      .transition()
      .ease(d3.easeExp)
      .duration(1000)
      .attr('x', function (d, i) {
        return x((d.key - 1) % 4)
      })

      .attr('y', function (d, i) {
        return y(Math.floor((d.key - 1) / 4))
      })
  })
}

function removeLine () {
  path = svg.selectAll('.line').data([])

  path
    .exit()
    .transition()
    .duration(500)
    .ease(d3.easeExp)
    .attr('stroke-dasharray', function (d) {
      return this.getTotalLength()
    })
    .attr('stroke-dashoffset', function (d) {
      return this.getTotalLength()
    })
    .remove()
}

var sleep = function (ms) {
  var result = $.Deferred()
  setTimeout(result.resolve, ms)
  return result.promise()
}
