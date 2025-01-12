export interface AnalystEstimate {
    type: 'Buy' | 'Hold' | 'Sell'
    percentage: number
    color: string
  }
  
  export interface KeyEvent {
    icon: 'trending' | 'news'
    title: string
    content: string
    backgroundColor: string
    iconColor: string
  }
  
  