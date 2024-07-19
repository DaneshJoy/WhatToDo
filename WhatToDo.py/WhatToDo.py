import time
import random
import sys
import os
import subprocess
from datetime import datetime
from plyer import notification


os.system('')
print('\033[97;1m °•. Random Work Selection .•°')
print('''\033[96;1m
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣀⣀⡀⠒⠒⠦⣄⡀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⢀⣤⣶⡾⠿⠿⠿⠿⣿⣿⣶⣦⣄⠙⠷⣤⡀⠀⠀⠀⠀
⠀⠀⠀⣠⡾⠛⠉⠀⠀⠀⠀⠀⠀⠀⠈⠙⠻⣿⣷⣄⠘⢿⡄⠀⠀⠀
⠀⢀⡾⠋⠀⠀⠀⠀⠀⠀⠀⠀⠐⠂⠠⢄⡀⠈⢿⣿⣧⠈⢿⡄⠀⠀
⢀⠏⠀⠀⠀⢀⠄⣀⣴⣾⠿⠛⠛⠛⠷⣦⡙⢦⠀⢻⣿⡆⠘⡇⠀⠀
⠀⠀⠀⠀⡐⢁⣴⡿⠋⢀⠠⣠⠤⠒⠲⡜⣧⢸⠄⢸⣿⡇⠀⡇⠀⠀
⠀⠀⠀⡼⠀⣾⡿⠁⣠⢃⡞⢁⢔⣆⠔⣰⠏⡼⠀⣸⣿⠃⢸⠃⠀⠀
⠀⠀⢰⡇⢸⣿⡇⠀⡇⢸⡇⣇⣀⣠⠔⠫⠊⠀⣰⣿⠏⡠⠃⠀⠀⢀
⠀⠀⢸⡇⠸⣿⣷⠀⢳⡈⢿⣦⣀⣀⣀⣠⣴⣾⠟⠁⠀⠀⠀⠀⢀⡎
⠀⠀⠘⣷⠀⢻⣿⣧⠀⠙⠢⠌⢉⣛⠛⠋⠉⠀⠀⠀⠀⠀⠀⣠⠎⠀
⠀⠀⠀⠹⣧⡀⠻⣿⣷⣄⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣠⡾⠃⠀⠀
⠀⠀⠀⠀⠈⠻⣤⡈⠻⢿⣿⣷⣦⣤⣤⣤⣤⣤⣴⡾⠛⠉⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠈⠙⠶⢤⣈⣉⠛⠛⠛⠛⠋⠉⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠉⠉⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀''')


w = ['|', '/', '—', '\\', '|', '—']
works = ['Sarbazi', 'BrainXAI', 'Klassima', 'SurgiSight', 'VisioImpulse']*10

print('\033[93;1m')
for i in range(random.randint(20,40)):
    print('\t'+w[i%len(w)], end='\r')
    time.sleep(0.1)
    sys.stdout.flush()

init = '\t╰────► '
print('\033[96;1m', end='')
for c in init:
    print(c, end='')
    time.sleep(0.11)
    sys.stdout.flush()
    
print('\033[92;1m', end='')
result = works[random.randint(0,len(works)-1)]
for c in result:
    print(c, end='')
    time.sleep(0.11)
    sys.stdout.flush()

print('\033[96m ✅ ')
print('\033[0m')

# subprocess.Popen(r'D:\Tools\MyStopWatch\C#\MyStopWatch\bin\Release\net7.0-windows\MyStopWatch.exe')

with open('log.txt', 'a') as f:
    f.write(datetime.now().strftime("%c") + ', ' + result + '\n')

notification.notify(title=f">>{result}<<", message=f"Start working on '{result}' project",
                    app_name="MyWorks", timeout=7,
                    ticker="Work selected")

time.sleep(3)