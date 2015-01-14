
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
  width = statenamewidth + fullpanelwidth_top * top_panel_var.length;
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

  xlim = [[0, 0.1], [0, 0.1], [0, 0.1], [0, 0.1], [0, 0.1], [0, 0.1], [0, 0.1]];
  nxticks = [6, 6, 6, 6, 6, 6];
  xlab = ["Etiology", "Etiology", "Etiology", "Etiology", "Etiology", "Etiology", "Etiology"];
  title = ["01KEN", "02GAM", "03MAL", "04ZAM", "05SAF", "06THA","07BAN"];
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
  //d3.selectAll("g.dotplot g.y.axis line").attr("stroke", "#bbb");
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
  d3.selectAll("circle.pt" + i).attr("stroke-width", "3").moveToFront();
  return d3.select("text#state" + i).attr("fill", "violetred");
};

lowlight_state = function(d, i) {
  d3.selectAll("circle.pt" + i).attr("stroke-width", "1").moveToBack();
  return d3.select("text#state" + i).attr("fill", "black");
};

top_panel_var = ["01KEN1", "02GAM1", "03MAL1", "04ZAM1", "05SAF1", "06THA1","07BAN1"];
d3.json("data2.json", plot);

d3.select("#agep0").on("input", function() {
  update(+this.value,this.id);
});
d3.select("#agep1").on("input", function() {
  update(+this.value,this.id);
});
d3.select("#agep2").on("input", function() {
  update(+this.value,this.id);
});
d3.select("#agep3").on("input", function() {
  update(+this.value,this.id);
});
d3.select("#agep4").on("input", function() {
  update(+this.value,this.id);
});
d3.select("#agep5").on("input", function() {
  update(+this.value,this.id);
});
d3.select("#agep6").on("input", function() {
  update(+this.value,this.id);
});
top_panel_var_age0 = ["01KEN0", "02GAM0", "03MAL0", "04ZAM0", "05SAF0", "06THA0","07BAN0"]
top_panel_var_age1 = ["01KEN1", "02GAM1", "03MAL1", "04ZAM1", "05SAF1", "06THA1","07BAN1"]
id = "agep0";
update(30,"agep0");
update(35,"agep1");
update(50,"agep2");
update(25,"agep3");
update(60,"agep4");
update(25,"agep5");
update(45,"agep6");

function update(agep,id) {
	d3.json("data2.json", function(data) {
			n_pathogens = data.pathogen.length
			margin = margin_top
		    xrange = [margin.left + margin.inner, margin.left + panelwidth_top - margin.inner];
			xlim = [0, 0.1];
			xscale = d3.scale.linear();
			xscale.domain(xlim).range(xrange);
			j=id.substring(id.length,id.length-1);
			points = d3.selectAll("g#dotplot"+j).selectAll("circle").transition();
			xvar_age0 = top_panel_var_age0[j];
			xvar_age1 = top_panel_var_age1[j];
			x_age0 = data[xvar_age0];
			x_age1 = data[xvar_age1];
			//points.duration(750).attr("fill", "#FF3");
			points.duration(750).attr("cx", function(d,i) { return xscale((agep * x_age1[i] + (100-agep) * x_age0[i])/100);
			}).attr("r",function(d,i) { return 0.1*xscale((agep * x_age1[i] + (100-agep) * x_age0[i])/100);
			});
})};

function updateData() {
	color = ["red","brown","yellow","green","blue","purple"];
	d3.json("data2.json", function(data) {
			n_pathogens = data.pathogen.length
			margin = margin_top
		    xrange = [margin.left + margin.inner, margin.left + panelwidth_top - margin.inner];
			xlim = [0, 0.1];
			xscale = d3.scale.linear();
			xscale.domain(xlim).range(xrange);
			
			xrange_new = [margin.left + margin.inner, margin.left + panelwidth_top*6.5 - margin.inner]
			xscale_new = d3.scale.linear();
			xscale_new.domain(xlim).range(xrange_new);
			
			title_y = [35,65,95,125,155,185,215];
			for (j = 1; j < 7; j++) { 
				rect = d3.selectAll("g#dotplot"+j).selectAll("rect").transition();
				rect.duration(1000).attr("transform", "translate(0,0) scale(0,1) rotate(0)");
				yaxis = d3.selectAll("g#dotplot"+j).selectAll("g.y.axis").transition();
				yaxis.duration(1000).attr("transform", "translate(0,0) scale(0,1) rotate(0)");
				xaxis = d3.selectAll("g#dotplot"+j).selectAll("g.x.axis").transition();
				xaxis.duration(1000).attr("transform", "translate(0,0) scale(0,1) rotate(0)");
				title = d3.selectAll("g#dotplot"+j).selectAll("g.title").transition();
				title.select("text").duration(1000).style("fill", color[j-1]);
				title.duration(1000).delay(1000).attr("transform", "translate(950,"+ title_y[j] +") scale(1,1) rotate(0)");
				points = d3.selectAll("g#dotplot"+j).selectAll("circle").transition();
				points.duration(1000).attr("fill", color[j-1]);
				d3.selectAll("g#dotplot"+j).transition().duration(1000).delay(1000).attr("transform", "translate(" + (statenamewidth) + ",0) scale(1,1) rotate(0)");
				//d3.selectAll("div#compinput").remove();
			};
			//relocate input box
			d3.select("div#compinput0").selectAll("input").transition().duration(1000).delay(1000).style("left", "1200px").style("position","absolute").style("top","100px");
			d3.select("div#compinput0").selectAll("text").transition().duration(1000).delay(1000).style("left", "1235px").style("position","absolute").style("top","105px");
			d3.select("div#compinput1").selectAll("input").transition().duration(1000).delay(1000).style("left", "1200px").style("position","absolute").style("top","130px");
			d3.select("div#compinput1").selectAll("text").transition().duration(1000).delay(1000).style("left", "1235px").style("position","absolute").style("top","135px");			
			d3.select("div#compinput2").selectAll("input").transition().duration(1000).delay(1000).style("left", "1200px").style("position","absolute").style("top","160px");
			d3.select("div#compinput2").selectAll("text").transition().duration(1000).delay(1000).style("left", "1235px").style("position","absolute").style("top","165px");	
			d3.select("div#compinput3").selectAll("input").transition().duration(1000).delay(1000).style("left", "1200px").style("position","absolute").style("top","190px");
			d3.select("div#compinput3").selectAll("text").transition().duration(1000).delay(1000).style("left", "1235px").style("position","absolute").style("top","195px");
			d3.select("div#compinput4").selectAll("input").transition().duration(1000).delay(1000).style("left", "1200px").style("position","absolute").style("top","220px");
			d3.select("div#compinput4").selectAll("text").transition().duration(1000).delay(1000).style("left", "1235px").style("position","absolute").style("top","225px");
			d3.select("div#compinput5").selectAll("input").transition().duration(1000).delay(1000).style("left", "1200px").style("position","absolute").style("top","250px");
			d3.select("div#compinput5").selectAll("text").transition().duration(1000).delay(1000).style("left", "1235px").style("position","absolute").style("top","255px");	
			d3.select("div#compinput6").selectAll("input").transition().duration(1000).delay(1000).style("left", "1200px").style("position","absolute").style("top","280px");
			d3.select("div#compinput6").selectAll("text").transition().duration(1000).delay(1000).style("left", "1235px").style("position","absolute").style("top","285px");			
			j=0;
			title = d3.selectAll("g#dotplot"+j).selectAll("g.title").transition();
			title.duration(1000).delay(1000).attr("transform", "translate(950,"+ title_y[j] +") scale(1,1) rotate(0)");
			//rect.duration(1000).attr("transform", "translate(0,0) scale(0,1) rotate(0)");
			d3.selectAll("g#dotplot"+j).selectAll("g.title").attr("transform", "translate(0,0) scale(0,1) rotate(0)");
			d3.selectAll("g.dotplot svg").attr("width", panelwidth_top*8);
			rect = d3.selectAll("g#dotplot"+j).selectAll("rect").transition();
			rect.duration(1000).delay(2000).attr("width", panelwidth_top*6.5);
			//x y axis
			nxticks = 6;
			height = 530;
			xticks= Array.apply(0, Array(nxticks)).map(function (x, y) { return (0.1*y/(nxticks-1)); });
			xline = d3.selectAll("g#dotplot"+j).selectAll("g.x.axis line").transition().duration(1000).delay(2000).attr("x1", function(d,i){ return xscale_new(xticks[i])}).attr("x2", function(d,i){ return xscale_new(xticks[i])});
			xtext = d3.selectAll("g#dotplot"+j).selectAll("g.x.axis text").transition().duration(1000).delay(2000).attr("x", function(d,i){ 
				if (i<6) {return xscale_new(xticks[i]);} 
				else {return margin.left + panelwidth_top*7/2}
				} );
			yline = d3.selectAll("g#dotplot"+j).selectAll("g.y.axis line").transition().duration(1000).delay(2000).attr("x2", function(d,i){ return xscale_new(margin.left + panelwidth_top*7)});	 

			
			for (k = 0; k < 7; k++) { 
				points = d3.selectAll("g#dotplot"+k).selectAll("circle").moveToFront().transition();
				xvar_age0 = top_panel_var_age0[k];
				xvar_age1 = top_panel_var_age1[k];
				x_age0 = data[xvar_age0];
				x_age1 = data[xvar_age1];
				points.duration(750).delay(2000).attr("cx", function(d,i) { return xscale_new((50 * x_age1[i] + (100-50) * x_age0[i])/100);
			}).attr("r",function(d,i) { return 0.12*xscale((50 * x_age1[i] + (100-50) * x_age0[i])/100);
			});};
			
})}


