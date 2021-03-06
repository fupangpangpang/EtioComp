
var highlight_state, lowlight_state, plot;
var combine, axispos_bot, col, dotplots, fullpanelheight_bot, fullpanelwidth_bot, fullpanelwidth_top, hbot, height, hpos, htop, i, lower_xlim, lower_xvar, lower_yvar, margin_bot, margin_top, n_states, nxticks, panelheight_bot, panelheight_top, panelwidth_bot, panelwidth_top, points, row, scatterplots, state_names, statenamewidth, svg, this_dotplot, this_g, this_scatterplot, title, top_panel_var, vpos, width, xlab, xlim, yscale, _results;

plot = function(data) {
    n_pathogens = data.pathogen.length;
  htop = 700;
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

  xlim = [[0, 0.5], [0, 0.5], [0, 0.5], [0, 0.5], [0, 0.5], [0, 0.5], [0, 0.5]];
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
  for (j=0;j<7;j++) {
	if (highlight_ind[j]){
	  d3.selectAll("g#dotplot"+j).selectAll("circle").attr("opacity",0.2);
	   d3.selectAll("g#dotplot"+j).selectAll("g.ciline").selectAll("line").attr("opacity",0.2);
	   d3.selectAll("g#dotplot"+j).selectAll("circle.pt" + i).attr("stroke-width", "3").attr("opacity",1).moveToFront();
	   d3.selectAll("g#dotplot"+j).selectAll("g.ciline").selectAll("line.pt"+ i).attr("opacity",1).moveToFront();
	};
  };
  return d3.select("text#state" + i).attr("fill", "violetred");
};

lowlight_state = function(d, i) {
  for (j=0;j<7;j++) {
	if (highlight_ind[j]){
	d3.selectAll("g#dotplot"+j).selectAll("circle").attr("opacity",1).attr("stroke-width", "1").moveToBack();
	d3.selectAll("g#dotplot"+j).selectAll("g.ciline").selectAll("line").attr("opacity",1).moveToBack();

  };};
  return d3.select("text#state" + i).attr("fill", "black");
};

top_panel_var = ["KEN_CXR_AGE_0","GAM_CXR_AGE_0","MAL_CXR_AGE_0","ZAM_CXR_AGE_0","SAF_CXR_AGE_0","THA_CXR_AGE_0","BAN_CXR_AGE_0"];
d3.json("perchdata.json", plot);

d3.select("#agep0").on("input", function() {
  if (combine) {
    update(+this.value,"agep0");
	update(+this.value,"agep1");
	update(+this.value,"agep2");
	update(+this.value,"agep3");
	update(+this.value,"agep4");
	update(+this.value,"agep5");
	update(+this.value,"agep6");
  } else {
    update(+this.value,this.id);
  }
  
});
d3.select("#agep1").on("input", function() {
  if (combine) {
    update(+this.value,"agep0");
	update(+this.value,"agep1");
	update(+this.value,"agep2");
	update(+this.value,"agep3");
	update(+this.value,"agep4");
	update(+this.value,"agep5");
	update(+this.value,"agep6");
  } else {
    update(+this.value,this.id);
  }
  });
d3.select("#agep2").on("input", function() {
  if (combine) {
    update(+this.value,"agep0");
	update(+this.value,"agep1");
	update(+this.value,"agep2");
	update(+this.value,"agep3");
	update(+this.value,"agep4");
	update(+this.value,"agep5");
	update(+this.value,"agep6");
  } else {
    update(+this.value,this.id);
  }
  });
d3.select("#agep3").on("input", function() {
  if (combine) {
    update(+this.value,"agep0");
	update(+this.value,"agep1");
	update(+this.value,"agep2");
	update(+this.value,"agep3");
	update(+this.value,"agep4");
	update(+this.value,"agep5");
	update(+this.value,"agep6");
  } else {
    update(+this.value,this.id);
  }
  });
d3.select("#agep4").on("input", function() {
  if (combine) {
    update(+this.value,"agep0");
	update(+this.value,"agep1");
	update(+this.value,"agep2");
	update(+this.value,"agep3");
	update(+this.value,"agep4");
	update(+this.value,"agep5");
	update(+this.value,"agep6");
  } else {
    update(+this.value,this.id);
  }
  });
d3.select("#agep5").on("input", function() {
  if (combine) {
    update(+this.value,"agep0");
	update(+this.value,"agep1");
	update(+this.value,"agep2");
	update(+this.value,"agep3");
	update(+this.value,"agep4");
	update(+this.value,"agep5");
	update(+this.value,"agep6");
  } else {
    update(+this.value,this.id);
  }
  
});
d3.select("#agep6").on("input", function() {

  if (combine) {
    update(+this.value,"agep0");
	update(+this.value,"agep1");
	update(+this.value,"agep2");
	update(+this.value,"agep3");
	update(+this.value,"agep4");
	update(+this.value,"agep5");
	update(+this.value,"agep6");
  } else {
    update(+this.value,this.id);
  }
  

});
d3.select("#option2").on("change", function() {
  if (this.checked){
	combine= true;
  } else {
	combine= false;
  };
});
top_panel_var_age0 = ["KEN_CXR_AGE_0","GAM_CXR_AGE_0","MAL_CXR_AGE_0","ZAM_CXR_AGE_0","SAF_CXR_AGE_0","THA_CXR_AGE_0","BAN_CXR_AGE_0"];
top_panel_var_age1 = ["KEN_CXR_AGE_1","GAM_CXR_AGE_1","MAL_CXR_AGE_1","ZAM_CXR_AGE_1","SAF_CXR_AGE_1","THA_CXR_AGE_1","BAN_CXR_AGE_1"];
site = ["KEN","GAM","MAL","ZAM","SAF","THA","BAN"];

update(53,"agep0");
update(63,"agep1");
update(68,"agep2");
update(77,"agep3");
update(74,"agep4");
update(49,"agep5");
update(39,"agep6");

var statOptions = {
    "Points": "PTS",
    "Goals": "G",
    "Assists": "A",
    "Penalty Minutes": "PIM"
};
 selectUI = d3.select("div#chart").append("form").append("select");

// create the options
selectUI.selectAll("option").data(d3.keys(statOptions)).enter().append("option").text(function(d) {
    return d;
});


var updatenot=false;

function update(agep,id) {
	d3.json("perchdata.json", function(data) {
			n_pathogens = data.pathogen.length;
			margin = margin_top;
			xrange = [margin.left + margin.inner, margin.left + panelwidth_top - margin.inner];

			if (updatenot) {
		    xrange_new = [margin.left + margin.inner, margin.left + panelwidth_top*6.5 - margin.inner];
			} else {
		    xrange_new = xrange;
			}
			xlim = [0, 0.5];
			xscale = d3.scale.linear();
			xscale.domain(xlim).range(xrange);
			xscale_new = d3.scale.linear();
			xscale_new.domain(xlim).range(xrange_new);
			j=id.substring(id.length,id.length-1);
			points = d3.selectAll("g#dotplot"+j).selectAll("circle").transition();
			ciline = d3.selectAll("g#dotplot"+j).selectAll("g.ciline").selectAll("line").transition();
			xvar_site = site[j];
			Wid = "W"+agep;
			x_site = data[xvar_site];
			x_W = x_site[Wid];

			//points.duration(750).attr("fill", "#FF3");
			points.duration(750).attr("cx", function(data1,index1) { return xscale_new((x_W.mean[index1]));})
			.attr("r",function(data1,index1) { return 2*Math.pow(x_W.mean[index1]/x_W.sd[index1],.75);});
			ciline.duration(750).attr("x1", function(data2,index2) { return xscale_new((x_W.p025[index2]));})
			.attr("x2",function(data2,index2) { return xscale_new(x_W.p975[index2]);});
});
			document.getElementById(id).value=agep;
			};


var zoom = d3.behavior.zoom()
    .scaleExtent([1, 10])
    .on("zoom", zoomed);

var container=d3.selectAll("g#dotplot0").selectAll("circle");	
function zoomed() {
  container.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
}
function updateData() {
	updatenot = true;
	panelheight_top_new = panelheight_top+5*7*40
	color = ['rgb(228,26,28)','rgb(55,126,184)','rgb(77,175,74)','rgb(152,78,163)','rgb(255,127,0)','rgb(255,255,51)','rgb(166,86,40)'];
	d3.json("perchdata.json", function(data) {
			n_pathogens = data.pathogen.length;
			margin = margin_top;
		    xrange = [margin.left + margin.inner, margin.left + panelwidth_top - margin.inner];
			xlim = [0, 0.5];
			xscale = d3.scale.linear();
			
			xscale.domain(xlim).range(xrange);
			
			xrange_new = [margin.left + margin.inner, margin.left + panelwidth_top*6.5 - margin.inner]
			xscale_new = d3.scale.linear();
			xscale_new.domain(xlim).range(xrange_new);
			
			ylim=[0.5, n_pathogens + 0.5];
			yrange = [margin.top + panelheight_top_new - margin.inner, margin.top + margin.inner];
			yscale.domain(ylim).range(yrange);

			title_y = [35,65,95,125,155,185,215];
			for (j = 1; j < 7; j++) { 
				rect = d3.selectAll("g#dotplot"+j).selectAll("rect").transition();
				rect.duration(1000).attr("transform", "translate(0,0) scale(0,1) rotate(0)");
				yaxis = d3.selectAll("g#dotplot"+j).selectAll("g.y.axis").transition();
				yaxis.duration(1000).attr("transform", "translate(0,0) scale(0,1) rotate(0)");
				xaxis = d3.selectAll("g#dotplot"+j).selectAll("g.x.axis").transition();
				xaxis.duration(1000).attr("transform", "translate(0,0) scale(0,1) rotate(0)");
				points = d3.selectAll("g#dotplot"+j).selectAll("circle").transition();
				points.duration(1000).attr("fill", color[j]);
				title = d3.selectAll("g#dotplot"+j).selectAll("g.title").transition();
				title.select("text").duration(1000).style("fill", color[j]).style("cursor","pointer");
				title.duration(1000).delay(1000).attr("transform", "translate(950,"+ title_y[j] +") scale(1,1) rotate(0)");
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
			d3.selectAll("g#dotplot"+j).call(zoom);
			
			title = d3.selectAll("g#dotplot"+j).selectAll("g.title").transition();
			title.select("text").duration(1000).style("fill", color[j]).style("cursor","pointer");
			points = d3.selectAll("g#dotplot"+j).selectAll("circle").transition();
			points.duration(1000).attr("fill", color[j]);
			title = d3.selectAll("g#dotplot"+j).selectAll("g.title").transition();
			title.duration(1000).delay(1000).attr("transform", "translate(950,"+ title_y[j] +") scale(1,1) rotate(0)");
			names = d3.selectAll("g#statenames").selectAll("text").transition();
			names.duration(1000).delay(2000).attr("y", function(d, i) {return yscale(data.rank[i])+5*3;});
			//highlight site
			 title = ["01KEN", "02GAM", "03MAL", "04ZAM", "05SAF", "06THA","07BAN"];
			
			for (i=0;i<7;i++) {
				d3.selectAll("g#dotplot"+i).selectAll("g.title").data([i]).on("click", highlight_site);
			};
			//create button;

			axispos = {
				xtitle: 5,
				ytitle: 30,
				xlabel: 5,
				ylabel: 5
				};
			//rect.duration(1000).attr("transform", "translate(0,0) scale(0,1) rotate(0)");
			d3.selectAll("g#dotplot"+j).selectAll("g.title").attr("transform", "translate(0,0) scale(0,1) rotate(0)");
			d3.selectAll("g.dotplot svg").attr("width", panelwidth_top*8).attr("height", panelheight_top_new*1.1);
			d3.selectAll("div#chart svg").attr("width", panelwidth_top*9).attr("height", panelheight_top_new*1.5);
			rect = d3.selectAll("g#dotplot"+j).selectAll("rect").transition();
			rect.duration(1000).delay(2000).attr("width", panelwidth_top*6.5).attr("height", panelheight_top_new).attr("fill","none");
			//x y axis
			nxticks = 6;
			height = 530;
			xticks= Array.apply(0, Array(nxticks)).map(function (x, y) { return (0.5*y/(nxticks-1)); });
			xline = d3.selectAll("g#dotplot"+j).selectAll("g.x.axis line").transition().duration(1000).delay(2000).attr("x1", function(d,i){ return xscale_new(xticks[i])}).attr("x2", function(d,i){ return xscale_new(xticks[i])});
			xtext = d3.selectAll("g#dotplot"+j).selectAll("g.x.axis text").transition().duration(1000).delay(2000).attr("x", function(d,i){ 
				if (i<6) {return xscale_new(xticks[i]);} 
				else {return margin.left + panelwidth_top*7/2}
				} ).attr("y", margin.top + panelheight_top_new + axispos.xtitle);
			yline = d3.selectAll("g#dotplot"+j).selectAll("g.y.axis line").transition().duration(1000).delay(2000).attr("x2", function(d,i){ return margin.left + panelwidth_top*6.5});	
			//d3.selectAll("g.dotplot g.y.axis line").transition().delay(2000).attr("stroke", "#bbb")			

			agep = [+document.getElementById("agep0").value,+document.getElementById("agep1").value,+document.getElementById("agep2").value,+document.getElementById("agep3").value,+document.getElementById("agep4").value,+document.getElementById("agep5").value,+document.getElementById("agep6").value]
			for (k = 0; k < 7; k++) { 
				points = d3.selectAll("g#dotplot"+k).selectAll("circle").transition();
			xvar_site = site[k];
			Wid = "W"+agep[k];
			x_site = data[xvar_site];
			x_W = x_site[Wid];
			points.duration(750).delay(2000).attr("cx", function(d,i) { return xscale_new((x_W.mean[i]));})
			.attr("cy", function(d, i) {return yscale(data.rank[i])+5*k;})
			.attr("r",function(d,i) { return 2*Math.pow(x_W.mean[i]/x_W.sd[i],.75);});
			ciline = d3.selectAll("g#dotplot"+k).selectAll("g.ciline").selectAll("line").transition();
			ciline.duration(750).delay(2000).attr("x1", function(d,i) { return xscale_new((x_W.p025[i]));})
			.attr("x2",function(d,i) { return xscale_new(x_W.p975[i]);})
			.attr("y1", function(d,i) { return yscale(data.rank[i])+5*k;})
			.attr("y2", function(d,i) { return yscale(data.rank[i])+5*k;})
			.attr("stroke", color[k])
			.attr("stroke-width", 2);			
			};

})}
highlight_ind = [true,true,true,true,true,true,true];
highlight_site=function(d,i) {
  if (highlight_ind[d]){
  d3.selectAll("g#dotplot"+d).selectAll("circle").attr("opacity",0.2);
  highlight_ind[d]=false;
  d3.selectAll("g#dotplot"+d).selectAll("g.title").select("text").attr("opacity",0.2);
  d3.selectAll("g#dotplot"+d).selectAll("g.ciline").selectAll("line").attr("opacity",0.2);
}  else {
	d3.selectAll("g#dotplot"+d).selectAll("circle").attr("opacity",1).moveToFront();
  highlight_ind[d]=true;
    d3.selectAll("g#dotplot"+d).selectAll("g.title").select("text").attr("opacity",1);
  d3.selectAll("g#dotplot"+d).selectAll("g.ciline").selectAll("line").attr("opacity",1);

}
  
};

function removeA(arr) {
    var what, a = arguments, L = a.length, ax;
    while (L > 1 && arr.length) {
        what = a[--L];
        while ((ax= arr.indexOf(what)) !== -1) {
            arr.splice(ax, 1);
        }
    }
    return arr;
}



