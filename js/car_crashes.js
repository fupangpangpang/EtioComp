
var highlight_state, lowlight_state, plot;
var axispos_bot, col, dotplots, fullpanelheight_bot, fullpanelwidth_bot, fullpanelwidth_top, hbot, height, hpos, htop, i, lower_xlim, lower_xvar, lower_yvar, margin_bot, margin_top, n_states, nxticks, panelheight_bot, panelheight_top, panelwidth_bot, panelwidth_top, points, row, scatterplots, state_names, statenamewidth, svg, this_dotplot, this_g, this_scatterplot, title, top_panel_var, vpos, width, xlab, xlim, yscale, _results;

plot = function(data) {
    n_pathogens = data.pathogen.length;
  htop = 530;
  hbot = 500;
  height = htop + hbot;
  margin_top = {
    left: 5,
    top: 70,
    right: 25,
    bottom: 40,
    inner: 0
  };
  fullpanelwidth_top = 180;
  panelwidth_top = fullpanelwidth_top - margin_top.left - margin_top.right;
  panelheight_top = htop - margin_top.top - margin_top.bottom;
  statenamewidth = 101;
  width = statenamewidth + fullpanelwidth_top * 6;
  margin_bot = {
    left: 80,
    top: 20,
    right: 25,
    bottom: 40,
    inner: 5
  };
  axispos_bot = {
    xtitle: 25,
    ytitle: 50,
    xlabel: 5,
    ylabel: 5
  };
  fullpanelwidth_bot = width / 3;
  panelwidth_bot = fullpanelwidth_bot - margin_bot.left - margin_bot.right;
  fullpanelheight_bot = hbot / 2;
  panelheight_bot = fullpanelheight_bot - margin_bot.top - margin_bot.bottom;
  svg = d3.select("div#chart").append("svg").attr("height", height).attr("width", width);

  xlim = [[0, 0.1], [0, 0.1], [0, 0.1], [0, 0.1], [0, 0.1], [0, 0.1]];
  nxticks = [6, 6, 6, 6, 4, 5];
  xlab = ["Etiology", "Etiology", "Etiology", "Etiology", "Etiology", "Etiology"];
  title = ["01KEN", "02GAM", "03MAL", "04ZAM", "05SAF", "06THA"];
  dotplots = [];
  for (i in top_panel_var) {
    this_dotplot = scatterplot().width(panelwidth_top).height(panelheight_top).margin(margin_top).titlepos(10).xNA({
      handle: false
    }).yNA({
      handle: false
    }).xlim(xlim[i]).ylim([0.5, n_pathogens + 0.5]).yticks(d3.range(n_pathogens).map(function(d) {
      return d + 1;
    })).xlab(xlab[i]).ylab("").pointsize(3).dataByInd(false).xvar(top_panel_var[i]).yvar("rank").title(title[i]);
    dotplots.push(this_dotplot);
    this_g = svg.append("g").attr("class", "dotplot").attr("id", "dotplot" + i).attr("transform", "translate(" + (statenamewidth + i * fullpanelwidth_top) + ",0)");
    this_g.datum({
      data: data,
      indID: data.abbrev
    }).call(this_dotplot);
    points = this_dotplot.pointsSelect().on("mouseover", highlight_state).on("mouseout", lowlight_state);
  }
  d3.selectAll("g.dotplot g.y.axis line").attr("stroke", "#bbb");
  yscale = dotplots[0].yscale();
  state_names = svg.append("g").attr("id", "statenames").selectAll("empty").data(data.pathogen).enter().append("text").text(function(d) {
    return d;
  }).attr("x", statenamewidth).attr("y", function(d, i) {
    return yscale(data.rank[i]);
  }).style("font-size", "8pt").style("dominant-baseline", "middle").style("text-anchor", "end").attr("id", function(d, i) {
    return "state" + i;
  }).on("mouseover", highlight_state).on("mouseout", lowlight_state);
};

highlight_state = function(d, i) {
  d3.selectAll("circle.pt" + i).attr("fill", "Orchid").attr("r", 5).moveToFront();
  return d3.select("text#state" + i).attr("fill", "violetred");
};

lowlight_state = function(d, i) {
  d3.selectAll("circle.pt" + i).attr("fill", "slateblue").attr("r", 3).moveToBack();
  return d3.select("text#state" + i).attr("fill", "black");
};

top_panel_var = ["01KEN1", "02GAM1", "03MAL1", "04ZAM1", "05SAF1", "06THA1"];
d3.json("data2.json", plot);

d3.select("#agep0").on("input", function() {
  update(+this.value);
});
top_panel_var_age0 = ["01KEN", "02GAM", "03MAL", "04ZAM", "05SAF", "06THA"]
top_panel_var_age1 = ["01KEN1", "02GAM1", "03MAL1", "04ZAM1", "05SAF1", "06THA1"]
update(50)
function update(agep) {
	d3.json("data2.json", function(data) {
			n_pathogens = data.pathogen.length
			margin = margin_top
		    xrange = [margin.left + margin.inner, margin.left + panelwidth_top - margin.inner];
			xlim = [0, 0.1];
			xscale = d3.scale.linear();
			xscale.domain(xlim).range(xrange);
			for (j in top_panel_var) {
			points = d3.selectAll("g#dotplot"+j).selectAll("circle").transition();
			xvar_age0 = top_panel_var_age0[j];
			xvar_age1 = top_panel_var_age1[j];
			x_age0 = data[xvar_age0];
			x_age1 = data[xvar_age1];
			points.duration(750).attr("fill", "#FF3");
			points.duration(750).attr("cx", function(d,i) { return xscale((agep * x_age1[i] + (100-agep) * x_age0[i])/100);});
				}
			})
}


