Development LOG
========================

2015.02.16
1. Got a "complaint" from ZW, I will move LOG to LOG.md...

2015.02.12

1. I got an important idea from Scott, I can use t-statitics for size of bubble, which would be estimate/std, I believe it showed exactly how significant the estimate is. Also he mentioned that Bill clffton?? about his experiments on human understanding of area and radius. It seems like people can perceived neither of them, but something inbetween. So we decided to use .75 root of t-statistics. 
2. It works perfectly. Now we have large fat bubble on RSV!!
3. Another idea from Maria yesterady is to have options to shorten the list of pathogens. However I have to struggle again on which data structure I should use!!!
4. Ideas from Dan: build something like [**this**](http://www.wunderground.com/cgi-bin/findweather/getForecast?query=39.367001,-76.671898&sp=KMDBALTI49&MR=1) as deep dive plot by putting age at x axis.
 


2015.02.11

1. I need bring up last question from yesterday to Scott later today
2. It looks like interval is the better solution here. Almost finished. just found out yticks are reversed ordered. Don't know why that author put it in that way. Maybe ranking has its own meaning in original car-crash plot
3. Random thoughts: I just realized I ***NEED*** coffee, too!!~~ :(
4. Still don't know why plotting behave so unstable. I need refresh severals time to make sure page loaded is correct. 
5. Problem with wisker for CI, it overlapped with each other in updated plots.
6. Change the default age structure to truth. perfect transition from this project to my master thesis...

2015.02.10

1. I am gonna start with a question, how to write README for github repo. It looks like something about markdown, just need some more instruction.
2. Look like I just need write something like .RMD, which is special version of .MD. OK Chrome also has extension for viewing markdown file locally.So I just need to update this file to .MD
3. Main thing I need to accomplish today is to create better data structure. Before I tried to list out all the possible scenario for each site, which is consist of 7 sites * 30 pathogens * 101 possible scenario * 3 statistics(mean,2.5,97.5) = 63000. It's a managable data size. However, the ultimate idea is to have more than one, two maybe five different factors. It might cause two issue: 1.data would be uncontrolably colossal, which would decrese loading speed; 2.We have to deal with R everytime we tried to expand capacity of this comparison. So I would prefer to calculate while loading webpage, unless calculation will severely impair the smoothiness of the webpage.
4. Count it again, I found raw dataset is about 7site * # risk factor * 30 pathogens * 500 iterations (this could be bigger) =210000 data points when risk factor is age only. It proved my point, because if we add CXR composition as second risk factor. Then we have 420000 data points for raw datasets, but new dataset will be 6300000, 100 times bigger than before. However I hesitated here because # of iteration could be bigger later and which would increase datasize and especially on # of computation. I think I have to step back because better data structure could significantly decrease searching time even if it's a humongous dataset, but calculation seems to take a lot of time even in R. I am not optimistic on javascript  
5. To save my time, I have to put some nonsense duplicates to appease the initial scatterplot.js. If I have time later, I will overhaul the entire project.   
6. Just realize why the graph is keeping changing. Apparently I didn't correctly loop through each dots on the dot graph. However I cannot do normal way by data("some sort of list")enter() within d3.json function. It's a little odd... 
7. It's really frustrating! I cannot figure out a way to enter data I want for #6 problem!!!
8. !!!WIERDEST THING EVER!!! I worked for almost the whole afternoon and night, trying to figure out the reason why age button behaved unstably!! NOW I just went back...everything is all right???!!!! STILL DON'T KNOW WHY!! function(d,i) for selected circles, i is the index of the objects. Don't bother to data()enter() new data to add the index. 
9. When I tried to apply new data to update animation. It's supposed to be an easy task. but it takes me quite a while because I forgot to add delay and two transition will be conflicted with each other...
10. Now I have a new problem. How to better describe variance of composite data. 


Earlier

Main framework has been finished, fake data was successfully applied to graph. Even real data has been displayed once but in a brutal way. I need to carve out a better data structure or apply quicker javascript solution for real data application.