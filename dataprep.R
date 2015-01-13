x = runif(16,0,1)
x.sort = rev(sort(x))
y = runif(17,0,1)
y.sort = rev(sort(y))
eti = paste0(round(c(x.sort,y.sort)/sum(x,y),3),collapse=",")
eti
pathogen = c("RSV","RHINO","HMPV_A_B","ADENO","CMV","PARA_3","PV_EV","FLU_A","PARA_1","PARA1","PARA_4","FLU_B","HBOV","COR","PARA_2","FLU_C","PNEU_NOVT13","PNEU_VT13","MCAT","HINF","SAUR","SASP","M_PNEU","BOPE","C_PNEU","ENTRB","NFGNR","OTHSTR","HAEMO","NMEN","PCP","FUNGI","TB")
