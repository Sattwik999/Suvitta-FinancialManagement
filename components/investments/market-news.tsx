import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, ExternalLink } from "lucide-react"

const newsItems = [
  {
    id: 1,
    title: "Fed Signals Potential Rate Cut in September",
    source: "Financial Times",
    time: "2 hours ago",
    snippet:
      "Federal Reserve officials have signaled a potential interest rate cut in September, citing improving inflation data.",
    url: "#",
  },
  {
    id: 2,
    title: "Tech Stocks Rally on Strong Earnings Reports",
    source: "Wall Street Journal",
    time: "5 hours ago",
    snippet: "Major tech companies exceeded earnings expectations, driving a rally in the technology sector.",
    url: "#",
  },
  {
    id: 3,
    title: "Oil Prices Drop Amid Global Supply Concerns",
    source: "Bloomberg",
    time: "8 hours ago",
    snippet:
      "Crude oil prices fell by 3% as concerns about global supply disruptions eased following diplomatic progress.",
    url: "#",
  },
  {
    id: 4,
    title: "Retail Sales Beat Expectations in June",
    source: "CNBC",
    time: "1 day ago",
    snippet:
      "U.S. retail sales rose 0.6% in June, exceeding economists' expectations of 0.4%, signaling strong consumer spending.",
    url: "#",
  },
  {
    id: 5,
    title: "New IPO Surges 45% on First Trading Day",
    source: "Reuters",
    time: "1 day ago",
    snippet:
      "The highly anticipated tech IPO saw its shares surge 45% above the offering price on its first day of trading.",
    url: "#",
  },
]

export function MarketNews() {
  return (
    <div className="space-y-4">
      {newsItems.map((item) => (
        <Card key={item.id} className="overflow-hidden">
          <CardContent className="p-4">
            <h3 className="font-medium line-clamp-2 mb-1">{item.title}</h3>
            <div className="flex items-center text-xs text-muted-foreground mb-2">
              <span>{item.source}</span>
              <span className="mx-1">•</span>
              <span>{item.time}</span>
            </div>
            <p className="text-sm text-muted-foreground line-clamp-2 mb-2">{item.snippet}</p>
            <a
              href={item.url}
              className="text-xs text-primary flex items-center hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Read more <ExternalLink className="ml-1 h-3 w-3" />
            </a>
          </CardContent>
        </Card>
      ))}
      <Button variant="outline" className="w-full">
        View All News <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </div>
  )
}
