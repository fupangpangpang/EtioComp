
# This is the user-interface definition of a Shiny web application.
# You can find out more about building applications with Shiny here:
# 
# http://www.rstudio.com/shiny/
#

library(shiny)

shinyUI(fluidPage(
  
  # Application title
  headerPanel("Old Faithful Geyser Data"),
  
  # Sidebar with a slider input for number of bins
  fluidRow(
    column(4,
    sidebarPanel(  
      sliderInput("bins",
                  "Number of bins:",
                  min = 0,
                  max = 100,
                  value = 50)
    )
    ),
    
    # Show a plot of the generated distribution
    column(8,
    mainPanel(
      plotOutput("distPlot")
    )
    )
    
    )

)
)
