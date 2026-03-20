---
title: "Visualization"
duration: "1-2 hours"
video: "https://www.youtube.com/embed/hSPmj7mK6ng"
---
# Visualization

Learn how to visualize data with Plotly.

## Learn
Watch the video above to learn about Plotly.

## Code Example
```python
import plotly.express as px
data_canada = px.data.gapminder().query("country == 'Canada'")
fig = px.bar(data_canada, x='year', y='pop')
fig.show()
```

## Quiz
> [!QUIZ] When is a heatmap useful?
> Heatmaps are useful for visualizing the intensity or frequency of values across two dimensions.
