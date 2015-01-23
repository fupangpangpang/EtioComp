library("coda")
library(rjson)
dir_list = c("01KEN_CXR_AGE_0","01KEN_CXR_AGE_1","02GAM_CXR_AGE_0","02GAM_CXR_AGE_1",
             "03MAL_CXR_AGE_0","03MAL_CXR_AGE_1","04ZAM_CXR_AGE_0","04ZAM_CXR_AGE_1",
             "05SAF_CXR_AGE_0","05SAF_CXR_AGE_1","06THA_CXR_AGE_0","06THA_CXR_AGE_1",
             "07BAN_CXR_AGE_0","07BAN_CXR_AGE_1")
dir_list1 = substr(dir_list,3,15)
dir_list2 = substr(dir_list,1,5)
json.prep = list()
for (j in seq_along(dir_list)) {
  DIR_NPLCM = paste0("C:\\Users\\WFu\\Dropbox (PERCH)\\PQM EXPERIMENT DATASETS\\ARCHIVE\\PQM_RESULTS_20141122\\",dir_list2[j],"\\",dir_list[j])
  
  model_options  <- dget(paste(DIR_NPLCM,"model_options.txt",sep="/"))
  res_nplcm <- read.coda(paste(DIR_NPLCM,"coda1.txt",sep="/"),
                         paste(DIR_NPLCM,"codaIndex.txt",sep="/"),quiet=TRUE)
  bugs.dat <- dget(paste(DIR_NPLCM,"data.txt",sep="/"))
  Nd = bugs.dat$Nd
  # prepare results for individual diagnosis:
  d1_nplcm  = nrow(res_nplcm)
  d2_nplcm  = Nd
  Icat_nplcm = array(NA,c(d1_nplcm,d2_nplcm))
  for (i in 1:d2_nplcm){
    SubVarName = paste("Icat","[",i,"]",sep="")
    Icat_nplcm[,i] = res_nplcm[,SubVarName]
  }
  rev(strsplit(DIR_NPLCM,"[\\]")[[1]])[1]
  
  #
  pathogen_list = c(model_options$pathogen_list,model_options$pathogen_SSonly_list)
  # Prepare individual diagnosis table
  path.prop.iter = apply(Icat_nplcm, 1, function(x) prop.table(table(x)))
  freqs.list <- mapply(data.frame,Words=seq_along(path.prop.iter),path.prop.iter,
                       SIMPLIFY=FALSE,MoreArgs=list(stringsAsFactors=FALSE))
  freqs.df <- do.call(rbind,freqs.list)
  res <- reshape(freqs.df,timevar="Words",idvar="x",direction="wide")
  x.levels = (as.numeric(levels(res$x)))
  row.names(res)=sapply(x.levels,function(x) pathogen_list[x])
  res.sort=res[order(as.numeric(levels(res$x))),]
  res.ggplots = data.frame(t(data.matrix(res.sort)[,-1]))
  res.ggplots[is.na(res.ggplots)] <- 0
  res.ggplots <-round(res.ggplots,4)
  # merge with pathogen_list and make sure every pathogen get a column
  if (ncol(res.ggplots)<length(pathogen_list)){
    path.df = as.data.frame(t(array(0,length(pathogen_list[[i]]))))
    colnames(path.df)=pathogen_list[[i]]
    res.ggplots = rbind.fill(path.df,res.ggplots)[-1,]
  }
  json.prep[[j]] <- as.array(colMeans(res.ggplots))
  row.names(json.prep[[j]])=NULL
  
}


# a function to match each model's result to the desired order:
DIR_pathogen_displayorder_lookup <- "C:\\PQ_MODEL\\pathogen_displayorder_lookup.csv"
pathogen_displayorder_lookup <- read.csv(DIR_pathogen_displayorder_lookup)
f <- pathogen_displayorder_lookup$Pathogen
display_order <- as.character(levels(f))[f]
lookup <- function(disp_order, union_nm){
  ord_union <- rep(NA,length(union_nm))
  incre <- 0
  for (j in seq_along(disp_order)){
    if (disp_order[j]%in% union_nm){
      incre <- incre + 1
      ord_union[incre] <- which(union_nm==disp_order[j])
    }
  }
  list(ord_union,union_nm[ord_union])
}

#   disp_order <- c("B","E","D","C","F","A")
#   union_nm   <- c("A","B","C","D","E")
#   nm_list <-list(c("C","E"),
#                  c("D","B"),
#                  c("C","A","E"))
#   lookup(disp_order,union_nm,nm_list)
order <- lookup(display_order,pathogen_list)[[1]]
newlist = lookup(display_order,pathogen_list)[[2]]
order_new = 33-lookup(pathogen_list,newlist)[[1]]

###
n=length(dir_list)
json.prep[[n+1]] = pathogen_list
json.prep[[n+2]] = pathogen_list
json.prep[[n+3]] = order_new
json.prep[[n+4]] = dir_list1
dir_list1[n+1]= "pathogen"
dir_list1[n+2]= "abbrev"
dir_list1[n+3]= "rank"
dir_list1[[n+4]] = "rawlist"
names(json.prep)= dir_list1
request.body <- toJSON(json.prep)
sink("C:\\Users\\WFu\\Google Drive\\PERCH\\2_PQ_MODEL\\PQM_Project\\EtioComp\\perchdata.json")
cat(request.body)
sink()




