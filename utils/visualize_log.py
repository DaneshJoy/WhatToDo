#!/home/saeed/anaconda3/bin/python
"""
This script reads a log CSV file containing date, task, and app information.
It processes the data by converting the Date column to datetime, setting the Date column as the index,
and grouping the data by Task and App to count occurrences.
It then generates a stacked bar chart to visualize the occurrences of each task by app.

Dependencies:
- pandas as pd
- matplotlib.pyplot as plt

Input:
- CSV file with columns: Date, Task, App

Output:
- Stacked bar chart showing the occurrences of each task by app

Instructions:
- Ensure the 'log.csv' file is in the parent directory
- Run the script to visualize the data
"""

import pandas as pd
import matplotlib.pyplot as plt


# Read the CSV file
LOG_FILE = '../log.csv'
log_df = pd.read_csv(LOG_FILE)

# Convert the Date column to datetime
log_df['Date'] = pd.to_datetime(log_df['Date'])

# Set the Date column as the index
log_df.set_index('Date', inplace=True)

# Group by Task and App, then count occurrences
task_app_counts = log_df.groupby(['Task', 'App']).size().unstack(fill_value=0)

# Plot the data
task_app_counts.plot(kind='bar', stacked=True, figsize=(
    10, 6), color=['#95D2B3', '#55AD9B'])
plt.xlabel('Task')
plt.ylabel('Number of Occurrences')
plt.title('Occurrences of Each Task by App')
plt.legend(title='App')
plt.xticks(rotation=45)
plt.tight_layout()
plt.show()
